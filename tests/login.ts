import { By, Key, until, WebDriver } from "selenium-webdriver";
import constants from "../constants";

type LoginForm = {
	email: string,
	password: string,
}

const submitForm = async (input: LoginForm, driver: WebDriver) => {
	// locate all input fields
	const emailInput = await driver.findElement(By.id('email'));
	const passwordInput = await driver.findElement(By.id('password'));

	// enter text into fields
	await emailInput.sendKeys(input.email);
	await passwordInput.sendKeys(input.password);

	// locate register button and click it
	const loginButton = await driver.findElement(By.css('button[type="submit"]'));
	await loginButton.click();
}

const clearForm = async (driver: WebDriver) => {
	// locate all input fields
	const emailInput = await driver.findElement(By.id('email'));
	const passwordInput = await driver.findElement(By.id('password'));

	// clear all input fields
	await emailInput.sendKeys(Key.CONTROL, 'a');
	await emailInput.sendKeys(Key.BACK_SPACE);
	await passwordInput.sendKeys(Key.CONTROL, 'a');
	await passwordInput.sendKeys(Key.BACK_SPACE);
}

const incorrectEmail = async (driver: WebDriver) => {
	let input: LoginForm = {
		email: "abcd@gmail.com",
		password: constants.password,
	}

	try {
		await submitForm(input, driver);

		// wait for alert, and assert the text in it
		await driver.wait(until.alertIsPresent());

		const alert = await driver.switchTo().alert();
		const alertText = await alert.getText();

		// assertion
		let text: string;

		if (alertText === "invalid credentials") text = constants.passText;
		else text = constants.failText;

		console.log(`${text} (Alert opened with text: ${alertText})\n`)

		await alert.accept();
		await clearForm(driver);
	} catch (e) {
		console.log(`${constants.failText} (error: ${e})\n`)
	}
}

const incorrectPassword = async (driver: WebDriver) => {
	let input: LoginForm = {
		email: constants.newEmail,
		password: "incorrectpass",
	}

	try {
		await submitForm(input, driver);

		// wait for alert, and assert the text in it
		await driver.wait(until.alertIsPresent());

		const alert = await driver.switchTo().alert();
		const alertText = await alert.getText();

		// assertion
		let text: string;

		if (alertText === "invalid credentials") text = constants.passText;
		else text = constants.failText;

		console.log(`${text} (Alert opened with text: ${alertText})\n`)

		await alert.accept();
		await clearForm(driver);
	} catch (e) {
		console.log(`${constants.failText} (error: ${e})\n`)
	}
}

const correctCredentials = async (driver: WebDriver) => {
	let input: LoginForm = {
		email: constants.newEmail,
		password: constants.password,
	}

	try {
		await submitForm(input, driver);

		// Locate the <p> element in navbar 
		const paragraph = await driver.wait(
			until.elementLocated(By.xpath(`//p[contains(.,'Hi, ${constants.firstName}')]`)),
			10000 // Wait up to 10 seconds
		);


		console.log(`${constants.passText} ("Hi, ${constants.firstName}" visible in navbar)\n`);
	} catch (e) {
		console.log(`${constants.failText} (error: ${e})\n`);
	}
}

const logout = async (driver: WebDriver) => {
	try {
		// Wait for the 'Log out' button and click it
		const logoutButton = await driver.wait(
			until.elementLocated(By.xpath("//button[text()='Log out']")),
			10000 // Wait up to 10 seconds
		);
		await logoutButton.click();

		// Wait for the 'Log in' button
		const loginButton = await driver.wait(
			until.elementLocated(By.xpath("//button[text()='Log in']")),
			10000 // Wait up to 10 seconds
		);

		console.log(`${constants.passText} (Logged out successfully)`)

	} catch (e) {
		console.log(`${constants.failText} (error: ${e})\n`);
	}
}

export default { incorrectEmail, incorrectPassword, correctCredentials, logout }