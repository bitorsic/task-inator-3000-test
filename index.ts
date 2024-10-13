import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import register from './tests/register';
import login from './tests/login';
import tasks from './tests/tasks';

const startBackend = async (driver: WebDriver) => {
	// Navigate to Backend URL
	await driver.get('https://task-inator-3000-backend.onrender.com');

	// Wait until the backend is spun up
	await driver.wait(until.elementTextContains(
		driver.findElement(By.css('body')), "Cannot GET /"
	));

	console.log("Backend is spun up\n");
}

(async () => {
	// Initialize the Chrome WebDriver
	let driver = await new Builder().forBrowser('chrome').build();

	try {
		console.log("Spinning up backend...")
		await startBackend(driver);

		// Navigate to Frontend URL
		await driver.get('https://task-inator-3000.onrender.com');

		// Navigating to the register page
		const registerButton = await driver.findElement(By.css('a[href="/register"]'));
		await registerButton.click();

		console.log("Test Case 1: register with an email already in use");
		await register.existingEmail(driver);

		console.log("Test Case 2: register with new email");
		await register.newEmail(driver);

		console.log("Test Case 3: login with an incorrect email");
		await login.incorrectEmail(driver);

		console.log("Test Case 4: login with an incorrect password");
		await login.incorrectPassword(driver);

		console.log("Test Case 5: login with the correct credentials");
		await login.correctCredentials(driver);

		console.log("Test Case 6: add task with empty content");
		await tasks.emptyContent(driver);

		console.log("Test Case 7: add task with valid content");
		await tasks.validContent(driver);

		console.log("Test Case 8: delete task");
		await tasks.deleteTask(driver);

		// Sleep for 5 seconds
		await driver.sleep(5000);
	} catch (e) {
		console.error(e);
	} finally {
		// Close the browser
		await driver.quit();
	}
})();
