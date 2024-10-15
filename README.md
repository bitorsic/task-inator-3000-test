
# Task-Inator 3000 Selenium Testing

This project contains automated end-to-end tests for the **Task-Inator 3000** app using **Selenium WebDriver** with **TypeScript**. The tests simulate various user interactions such as registration, login, task management, and tasklist management, ensuring that key functionalities of the web app work as expected.

## Prerequisites

Ensure that the following are installed on your system:

1. **Node.js** (>= v12)
2. **Google Chrome** (for Chrome WebDriver)
3. **npm** or **yarn** (for installing dependencies)

You will also need the **`tsx`** package to run TypeScript directly in Node.js.

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/task-inator-3000-tests.git
cd task-inator-3000-tests
```

### 2. Install Dependencies
Run the following command to install all required packages, including Selenium WebDriver, TypeScript, and `tsx`:

```bash
npm install
```

### 3. Configure WebDriver
This project uses **Google Chrome** as the browser for running tests. The WebDriver binaries are downloaded and managed automatically by Selenium.

Ensure you have **Google Chrome** installed.

### 4. Running Tests

Use **`tsx`** to run the test cases directly from the `index.ts` file.

Run the following command:

```bash
npx tsx index.ts
```

### Project Structure

```bash
.
├── tests/
│   ├── register.ts      # Handles test cases related to user registration
│   ├── login.ts         # Handles test cases related to login
│   ├── tasks.ts         # Handles test cases for task management
│   ├── tasklists.ts     # Handles test cases for tasklist management
├── index.ts             # Main test script that executes all test cases
└── README.md            # This file
```
