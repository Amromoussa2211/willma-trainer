README.md
markdown
Copy code
# Android Test Automation Framework

![WebdriverIO](https://img.shields.io/badge/WebdriverIO-v9.4.5-red)
![Appium](https://img.shields.io/badge/Appium-v2.13.1-blue)
![License](https://img.shields.io/badge/license-ISC-green)

## Overview
`android-test-automation` is a **test automation framework** for Android applications, built using **WebdriverIO** and **Appium**. It enables efficient end-to-end testing of Android apps by leveraging the powerful features of WebdriverIO's robust framework and Appium's device automation capabilities.

This framework provides:
- Easy-to-write, scalable test scripts
- Comprehensive support for Android devices and emulators
- Detailed test execution reports via **Allure**

---

## Prerequisites

Before you begin, ensure your system meets the following requirements:

### 1. **System Requirements**
- Operating System: macOS, Windows, or Linux
- RAM: At least 4GB (8GB recommended)

### 2. **Node.js and npm**
- Install [Node.js](https://nodejs.org/) (version 16.x or later is recommended).
  ```bash
  node -v
  npm -v
3. Java Development Kit (JDK)
Install Java JDK (version 8 or higher).
bash
Copy code
java -version
4. Android SDK
Install the Android SDK and ensure the following tools are configured:
adb (Android Debug Bridge)
Emulator or physical device connected
Add the Android SDK platform-tools to your PATH.
5. Appium
Install Appium globally:
bash
Copy code
npm install -g appium
appium -v
6. Allure Commandline (Optional for Reports)
Install Allure globally for generating reports:
bash
Copy code
npm install -g allure-commandline --save-dev
allure --version
Installation
1. Clone the Repository
Clone this project from your GitHub repository:

bash
Copy code
git clone https://github.com/your-username/android-test-automation.git
cd android-test-automation
2. Install Dependencies
Run the following command to install all required npm packages:

bash
Copy code
npm install
Setup
1. Configure .env File
Create a .env file in the root of the project and add the following configurations:

dotenv
Copy code
# Appium Server Details
APPIUM_HOST=localhost
APPIUM_PORT=4723

# Device Details
DEVICE_NAME=your-device-name
PLATFORM_VERSION=your-platform-version
APP_PATH=path/to/your/app.apk
2. Appium Server
Start the Appium server:

bash
Copy code
npm run start:appium
Usage
1. Run Tests
Default Configuration:
bash
Copy code
npm test
Local Environment:
bash
Copy code
npm run test:local
CI Environment:
bash
Copy code
npm run test:ci
2. Generate and Open Allure Reports
Generate Report:
bash
Copy code
npm run generate-report
Open Report:
bash
Copy code
npm run open-report
Running Tests on Emulator or Device
1. Emulator
Launch an Android Emulator using the Android SDK Manager or command line:
bash
Copy code
emulator -avd <emulator-name>
2. Physical Device
Connect your Android device via USB.
Enable Developer Options and USB Debugging on your device.
Verify the device is connected:
bash
Copy code
adb devices
Project Structure
plaintext
Copy code
android-test-automation/
├── .env                    # Environment variables
├── wdio.conf.js            # WebdriverIO configuration file
├── wdio.local.conf.js      # Local environment configuration
├── wdio.ci.conf.js         # CI environment configuration
├── allure-results/         # Test results folder for Allure
├── allure-report/          # Generated Allure reports
├── tests/                  # Test scripts and cases
├── package.json            # Project metadata and scripts
└── README.md               # Documentation
Troubleshooting
Common Issues
Appium Server Fails to Start
Ensure you’ve installed Appium globally and added it to your PATH.
Device Not Detected
Verify that your Android device is connected and recognized by adb:
bash
Copy code
adb devices
Check your USB cable and device drivers.
Java Not Found
Ensure Java is installed and added to your PATH.
Allure Not Found
Install Allure Commandline globally and verify installation:
bash
Copy code
allure --version
Author
Your Name
Your Email Address

License
This project is licensed under the ISC License.

Contribution
Contributions are welcome! Please submit a pull request or create an issue to suggest changes or report bugs.
