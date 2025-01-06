# Android Test Automation Framework

## Overview
This project is a **Test Automation Framework** for Android applications, built using **WebdriverIO** and **Appium**. It supports both local and CI/CD testing workflows, integrates with **Allure Reporting**, and is designed to make automated testing of Android apps efficient and maintainable.

---

## Features
- **WebdriverIO Framework**: Provides a robust and scalable test framework.
- **Appium Integration**: For automating Android application testing.
- **Allure Reporting**: Generates detailed and visually appealing test reports.
- **Environment Configuration**: Easily configurable for local and CI environments.
- **Custom Scripts**: Simplified commands to run tests and generate reports.

---

## Prerequisites
Ensure the following dependencies are installed on your machine:

1. **Node.js** (v14 or higher)
   - Install from [Node.js official website](https://nodejs.org/)

2. **Appium**
   - Install globally:
     ```bash
     npm install -g appium
     ```

3. **Java Development Kit (JDK)**
   - Install JDK 8 or higher from [Oracle JDK](https://www.oracle.com/java/technologies/javase-downloads.html).
   - Add `JAVA_HOME` to your system environment variables.

4. **Android SDK**
   - Install via Android Studio or standalone tools.
   - Ensure `ANDROID_HOME` is set in your environment variables.

5. **Allure Commandline**
   - Install globally:
     ```bash
     npm install -g allure-commandline
     ```

6. **Appium Inspector** (Optional)
   - For visual element inspection.
   - Download from [Appium Inspector GitHub](https://github.com/appium/appium-inspector).

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Amromoussa2211/client.git
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## Project Structure
- **`wdio.conf.js`**: Main WebdriverIO configuration file.
- **`wdio.local.conf.js`**: Configuration for local testing.
- **`wdio.ci.conf.js`**: Configuration for CI testing.
- **Test Scripts**: Located in the `test` directory. New specs should be added under the `test` folder.
- **APK Files**: Place the APK to test under the `app` directory.
- **Environment Variables**: Update the `.env` file with details such as `deviceName` and `platformVersion`.
- **Allure Results**: Generated in the `allure-results` directory.
- **Reports**: Saved in the `allure-report` directory.

---

## Scripts
The following scripts are available in `package.json`:

### Run Tests
- **Local Tests**:
  ```bash
  npm run test:local
  ```
- **CI Tests**:
  ```bash
  npm run test:ci
  ```

### Generate Allure Report
```bash
npm run generate-report
```

### Open Allure Report
```bash
npm run open-report
```

### Start Appium Server
```bash
npm run start:appium
```

---

## Running Tests

1. Start the Appium server:
   ```bash
   npm run start:appium
   ```

2. Run the local tests:
   ```bash
   npm run test:local
   ```

3. View the Allure report:
   ```bash
   npm run open-report
   ```

---

## Contribution
Feel free to fork this repository and submit pull requests. Ensure that your changes are well-documented and tested.

---

## License
This project is licensed under the ISC License.

---

For any questions or issues, feel free to contact the repository maintainer ...

