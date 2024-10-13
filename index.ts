import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import register from './tests/register';
import login from './tests/login';

const startBackend = async (driver: WebDriver) => {
	// Navigate to Backend URL
	await driver.get('https://task-inator-3000-backend.onrender.com');

	// Wait until the backend is spun up
	await driver.wait(until.elementTextContains(
		driver.findElement(By.css('body')), "Cannot GET /"
	));

	console.log("Backend is spun up");
}

(async () => {
	// Initialize the Chrome WebDriver
	let driver = await new Builder().forBrowser('chrome').build();

	try {
		console.log("Spinning up backend...")
		await startBackend(driver);

		// Navigate to Frontend URL
		await driver.get('https://task-inator-3000.onrender.com');

		// console.log("Navigating to register page...\n")
		// const registerButton = await driver.findElement(By.css('a[href="/register"]'));
		// await registerButton.click();

		// console.log("Test Case 1: register with an email already in use")
		// await register.existingEmail(driver);

		// console.log("Test Case 2: register with new email")
		// await register.newEmail(driver);

		// console.log("Navigating to login page if not already on it...\n")
		// const loginButton = await driver.findElement(By.css('a[href="/login"]'));
		// await loginButton.click();

		// console.log("Test Case 3: login with an incorrect email")
		// await login.incorrectEmail(driver);

		// console.log("Test Case 4: login with an incorrect password")
		// await login.incorrectPassword(driver);

		console.log("Test Case 5: login with the correct credentials")
		await login.correctCredentials(driver);

		console.log("Test Case 6: delete tasklist")

		// Sleep for 5 seconds
		await driver.sleep(5000);
	} catch (e) {
		console.error(e);
	} finally {
		// Close the browser
		await driver.quit();
	}
})();
