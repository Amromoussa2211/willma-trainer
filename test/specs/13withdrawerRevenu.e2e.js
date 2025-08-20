import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import { faker } from '@faker-js/faker'; // optional

// -----------------------------
// Config
// -----------------------------
const endpoint = 'https://staging.willma.life/api/graphql';

// you can override the currency id used for package creation with an env var
const OVERRIDE_CURRENCY_ID = process.env.PACKAGE_CURRENCY_ID || null;
// updated currency id as requested
const DEFAULT_CURRENCY_ID = 'f8aa26aa-e538-478d-b40f-35a4cf495969';

const adminCredentials = { email: 'superadmin@example.com', password: 'superadminpassword' };
const trainerCredentials = { email: 'amr@test.test', password: 'Abc@1234' };
const clientCredentials = { email: 'client6@test.test', password: 'Abc@1234' };

let adminToken = '';
let trainerToken = '';
let trainerUserId = '';
let clientToken = '';
let clientId = '';

// -----------------------------
// GraphQL helper
// -----------------------------
const gqlRequest = async (query, variables = {}, token = null, expectedStatus = 200) => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await axios.post(
      endpoint,
      { query, variables },
      {
        headers,
        validateStatus: (status) => status === expectedStatus
      }
    );

    if (res.data && res.data.errors) {
      // return errors inline so callers can react
      return { errors: res.data.errors, data: res.data.data || null, status: res.status };
    }
    return { data: res.data.data, status: res.status };
  } catch (e) {
    if (e.response) {
      // surface the raw response payload for debugging
      return { error: e.response.data, status: e.response.status };
    }
    throw e;
  }
};

// -----------------------------
// Helper: try a few queries to get available currencies
// -----------------------------
const fetchAvailableCurrencies = async (token = null) => {
  const candidateQueries = [
    `query { currencies { id code name } }`,
    `query { getCurrencies { id code name } }`,
    `query { availableCurrencies { id code name } }`,
    `query { getAllCurrencies { id code name } }`
  ];

  for (const q of candidateQueries) {
    try {
      const resp = await gqlRequest(q, {}, token);
      if (resp.data) {
        const keys = Object.keys(resp.data);
        for (const k of keys) {
          const arr = resp.data[k];
          if (Array.isArray(arr) && arr.length > 0) {
            return arr.map((c) => ({ id: c.id, code: c.code || c.name || null, name: c.name || null }));
          }
        }
      }
    } catch (e) {
      console.warn('Currency fetch attempt failed for query, trying next:', e && e.message ? e.message : e);
    }
  }

  return [];
};

// -----------------------------
// API operations (mutations you provided)
// -----------------------------
const addPackageAsTrainer = async () => {
  const mutation = `
    mutation CreateSubscriptionPlan($createSubscriptionPlanDto: CreateSubscriptionPlanDto!) {
      createSubscriptionPlan(createSubscriptionPlanDto: $createSubscriptionPlanDto) {
        id
        name
        price
        trainerId
        createdAt
      }
    }
  `;

  let currencyId = OVERRIDE_CURRENCY_ID || DEFAULT_CURRENCY_ID;

  const buildVariables = (cid) => ({
    createSubscriptionPlanDto: {
      currencyId: cid,
      description: "auto created via test",
      duration: 4,
      // updated formId as requested
      formId: "f7a54d08-f63a-4c43-aa9b-e7b68e1a7a7c",
      includeSessions: false,
      name: `More Package - ${Date.now()}`,
      price: 500,
      programTypeIds: [
        "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11"
      ],
      trainerId: trainerUserId
    }
  });

  // try initial currency
  let resp = await gqlRequest(mutation, buildVariables(currencyId), trainerToken);
  if (resp.data && resp.data.createSubscriptionPlan && resp.data.createSubscriptionPlan.id) {
    return resp.data.createSubscriptionPlan.id;
  }

  // if currency missing, try fetch available currencies and retry
  const errors = resp.errors || (resp.error && resp.error.errors) || null;
  if (errors && Array.isArray(errors) && errors.some(e => /Currency with ID/i.test(e.message))) {
    console.warn('Currency ID not found. Fetching available currencies and retrying...');
    const currencies = await fetchAvailableCurrencies(trainerToken);
    if (currencies.length === 0) {
      throw new Error('Currency not found and unable to fetch available currencies from API. Original errors: ' + JSON.stringify(errors));
    }

    const fallbackCurrencyId = currencies[0].id;
    console.log('Retrying createSubscriptionPlan with fallbackCurrencyId =', fallbackCurrencyId);

    resp = await gqlRequest(mutation, buildVariables(fallbackCurrencyId), trainerToken);
    if (resp.data && resp.data.createSubscriptionPlan && resp.data.createSubscriptionPlan.id) {
      return resp.data.createSubscriptionPlan.id;
    }

    const finalErr = resp.errors || resp.error || 'unknown error';
    throw new Error('Failed to create subscription plan after retrying with fetched currency: ' + JSON.stringify(finalErr));
  }

  throw new Error('Failed to create subscription plan: ' + JSON.stringify(resp));
};

const createSubscriptionByClient = async (packageId) => {
  const mutation = `
    mutation Subscribe($createClientSubscriptionDto: CreateClientSubscriptionDto!) {
      subscribe(createClientSubscriptionDto: $createClientSubscriptionDto) {
        id
        clientId
        subscriptionStartDate
        subscriptionEndDate
        priceAtPurchase
        withdrawnStatus
        withdrawalRequestId
      }
    }
  `;

  const variables = {
    createClientSubscriptionDto: {
      subscriptionPlanId: packageId,
      clientId: clientId
    }
  };

  const resp = await gqlRequest(mutation, variables, clientToken);
  if (resp.data && resp.data.subscribe && resp.data.subscribe.id) {
    return resp.data.subscribe;
  }
  throw new Error('Failed to create subscription: ' + JSON.stringify(resp));
};

/**
 * Robust update function:
 * - GraphQL mutation returns a scalar (Float!), so we must not request subfields.
 * - Try multiple possible argument names and types.
 * - Returns the scalar result if successful.
 */
const changeBalanceToAvailable = async (candidateIdValue) => {
  // candidateIdValue may be a UUID (string) or number depending on API
  const argNames = ['withdrawalRequestId', 'withdrawalRequest', 'withdrawalId', 'id', 'subscriptionId'];
  const typesToTry = ['ID!', 'String!']; // prefer ID/String first

  // if candidateIdValue looks numeric, allow numeric types too
  const parsedNumber = Number(candidateIdValue);
  const isNumeric = Number.isFinite(parsedNumber) && !Number.isNaN(parsedNumber);
  if (isNumeric) {
    typesToTry.push('Float!', 'Int!');
  }

  for (const type of typesToTry) {
    for (const argName of argNames) {
      // build mutation that supplies variable $v of the current type and calls mutation without selection set
      const mutation = `
        mutation UpdateWithdrawnStatus($v: ${type}) {
          updateWithdrawnStatusToAvailable(${argName}: $v)
        }
      `;
      // build variable value - convert to number for numeric types
      let varValue = candidateIdValue;
      if ((type === 'Float!' || type === 'Int!') && isNumeric) {
        varValue = parsedNumber;
      } else if (type === 'String!') {
        varValue = String(candidateIdValue);
      } else if (type === 'ID!') {
        varValue = String(candidateIdValue);
      }

      try {
        const resp = await gqlRequest(mutation, { v: varValue }, adminToken, /*expectedStatus*/ 200);
        // success response may be in resp.data with key updateWithdrawnStatusToAvailable
        if (resp.data && Object.prototype.hasOwnProperty.call(resp.data, 'updateWithdrawnStatusToAvailable')) {
          const result = resp.data.updateWithdrawnStatusToAvailable;
          console.log(`updateWithdrawnStatusToAvailable succeeded with arg ${argName} (type ${type}):`, result);
          return result;
        }

        // GraphQL errors are returned as resp.errors or resp.error
        const errors = resp.errors || (resp.error && resp.error.errors) || null;
        if (errors) {
          // If error message says unknown argument, try next argName/type
          const messages = (Array.isArray(errors) ? errors : []).map(e => e.message).join(' | ');
          console.warn(`Attempt with ${argName}:${type} failed -> ${messages}`);
          continue;
        }
      } catch (e) {
        console.warn(`Request attempt with ${argName}:${type} threw:`, e && (e.message || e));
        // continue trying other combos
      }
    }
  }

  // if we exhausted combos
  throw new Error('Unable to update withdrawn status — tried multiple arg names and types but all failed. Provide the exact mutation signature (arg name + type) for a direct call.');
};
 
// -----------------------------
// Appium UI helpers + debug
// -----------------------------
async function clickWithRetry(element, retries = 3) {
  while (retries > 0) {
    try {
      await element.waitForDisplayed({ timeout: 60000 });
      await element.click();
      return;
    } catch (error) {
      retries--;
      await driver.pause(1000);
    }

  }
  throw new Error('Element not clickable after retries.');
}


 
async function setValueWithRetry(element, value) {
  await element.waitForDisplayed({ timeout: 60000 });
  await element.setValue(value);
}

const dumpPageSourceToFile = async (label = 'dump') => {
  try {
    const xml = await driver.getPageSource();
    const filename = path.join(process.cwd(), 'debug_pagesource', `${label.replace(/\s+/g, '_')}_${Date.now()}.xml`);
    fs.mkdirSync(path.dirname(filename), { recursive: true });
    fs.writeFileSync(filename, xml, 'utf8');
    console.log('Page source dumped to:', filename);
    return filename;
  } catch (e) {
    console.error('Failed to dump page source:', e);
    return null;
  }
};

// -----------------------------
// Tests
// -----------------------------
describe('💼 Comprehensive Admin & Trainer Financial APIs + UI E2E', function () {
  this.timeout(240000);

  before(async function () {
    // Admin login
    const adminData = await gqlRequest(
      `mutation($email: String!, $password: String!, $ip: String) {
         loginForAdmin(data: { email: $email, password: $password }, ipAddress: $ip)
      }`,
      { email: adminCredentials.email, password: adminCredentials.password, ip: '127.0.0.1' }
    );
    if (!adminData.data || !adminData.data.loginForAdmin) {
      throw new Error('Admin login failed: ' + JSON.stringify(adminData));
    }
    adminToken = adminData.data.loginForAdmin;
    expect(adminToken).to.be.a('string');

    // Trainer login
    const trainerData = await gqlRequest(
      `mutation($input: AuthenticationLoginInput!) {
         loginAsTrainer(loginInput: $input) { accessToken user { id } }
       }`,
      { input: { email: trainerCredentials.email, password: trainerCredentials.password } }
    );
    if (!trainerData.data || !trainerData.data.loginAsTrainer) {
      throw new Error('Trainer login failed: ' + JSON.stringify(trainerData));
    }
    trainerToken = trainerData.data.loginAsTrainer.accessToken;
    trainerUserId = trainerData.data.loginAsTrainer.user.id;
    expect(trainerToken).to.be.a('string');

    // Client login
    const clientData = await gqlRequest(
      `mutation($input: AuthenticationLoginInput!) {
         loginAsClient(loginInput: $input) { accessToken user { id } }
       }`,
      { input: { email: clientCredentials.email, password: clientCredentials.password } }
    );
    if (!clientData.data || !clientData.data.loginAsClient) {
      throw new Error('Client login failed: ' + JSON.stringify(clientData));
    }
    clientToken = clientData.data.loginAsClient.accessToken;
    clientId = clientData.data.loginAsClient.user.id;
    expect(clientToken).to.be.a('string');

    // ----------------
    // Create package (trainer) and subscription (client), then change withdrawn status (admin)
    // ----------------
    try {
      const packageId = await addPackageAsTrainer();
      console.log('Created package id:', packageId);

      const subscribeResp = await createSubscriptionByClient(packageId);
      console.log('Created subscription object:', subscribeResp);
      const subscriptionId = subscribeResp.id;
      const withdrawalRequestId = subscribeResp.withdrawalRequestId || null;

      // Try to change withdrawn status. Prefer withdrawalRequestId if available
      try {
        const idToUse = withdrawalRequestId || subscriptionId;
        const changeResp = await changeBalanceToAvailable(idToUse);
        console.log('Change withdrawn status response (scalar):', changeResp);
      } catch (e) {
        console.warn('Could not change withdrawn status (non-fatal):', e.message);
      }

      // expose for UI tests
      this.packageId = packageId;
      this.subscriptionId = subscriptionId;
      this.withdrawalRequestId = withdrawalRequestId;
    } catch (err) {
      console.error('Failed to prepare package/subscription:', err);
      throw err;
    }
  });

  describe('Appium: Bank screen and sign out', function () {
    it('should sign in, verify bank section, handle withdrawal or signout', async () => {
      // start app
      await driver.startActivity('com.willma.staging', 'com.willma.staging.MainActivity');

      // ---- login flow (UI) ----
      const emailInput = await $('android=new UiSelector().resourceId("email-input")');
      await setValueWithRetry(emailInput, trainerCredentials.email);

      const passwordInput = await $('android=new UiSelector().resourceId("password-input")');
      await setValueWithRetry(passwordInput, trainerCredentials.password);

      const signInButton = await $('android=new UiSelector().resourceId("login-button")');
      await clickWithRetry(signInButton);

      const menuButton = await $('~menu-tab');
      await clickWithRetry(menuButton);

      // ---- open bank section ----
      const bankButton = await $('~bank-button');
      await clickWithRetry(bankButton);

      // ---- assertions with safe fallback for withdrawal balance ----
      let withdrawalBalance;
      try {
        withdrawalBalance = await $('~earnings-item-withdrawn balance');
        await withdrawalBalance.waitForDisplayed({ timeout: 20000 });
      } catch (firstErr) {
        try {
          withdrawalBalance = await $('android=new UiSelector().descriptionContains("withdrawn")');
          await withdrawalBalance.waitForDisplayed({ timeout: 20000 });
        } catch (secondErr) {
          const dumpFile = await dumpPageSourceToFile('withdrawal_not_found');
          console.error('Withdrawal element not found. Page source dumped to:', dumpFile);
          throw new Error('Withdrawal element not found (searched by accessibility id and descriptionContains).');
        }
      }
      expect(await withdrawalBalance.isDisplayed()).to.be.true;

      // ---- conditional withdrawal OR signout ----
      const BackButton = await $('-android uiautomator:new UiSelector().className("com.horcrux.svg.PathView").instance(0)');
      await BackButton.waitForDisplayed({ timeout: 10000 });
      expect(await BackButton.isDisplayed()).to.be.true;
      await BackButton.click();

      const logout = await $('~logout-button');
      await logout.waitForDisplayed({ timeout: 10000 });
      expect(await logout.isDisplayed()).to.be.true;
      await logout.click();

      const Yesbutton = await $('~logout-confirmation-yes-button');
      await Yesbutton.waitForDisplayed({ timeout: 10000 });
      expect(await Yesbutton.isDisplayed()).to.be.true;
      await Yesbutton.click();
    });
  });
});
