import { Builder, By, Key, until, WebDriver } from 'selenium-webdriver';
import { existingEmail } from './tests/register';

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

		console.log("Navigating to register page...")
		const registerButton = await driver.findElement(By.css('a[href="/register"]'));
		await registerButton.click();

		console.log("Trying to register with an email already in use...")
		await existingEmail(driver);

		// Sleep for 5 seconds
		await driver.sleep(5000);
	} catch (e) {
		console.error(e);
	} finally {
		// Close the browser
		await driver.quit();
	}
})();
