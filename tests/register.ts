import { By, Key, until, WebDriver } from "selenium-webdriver";
import constants from "../constants"

type RegisterForm = {
	email: string,
	firstName: string,
	lastName: string,
	password: string,
}

const submitForm = async (input: RegisterForm, driver: WebDriver) => {
	// locate all input fields
	const emailInput = await driver.findElement(By.id('email'));
	const firstNameInput = await driver.findElement(By.id('first_name'));
	const lastNameInput = await driver.findElement(By.id('last_name'));
	const passwordInput = await driver.findElement(By.id('password'));

	// enter text into fields
	await emailInput.sendKeys(input.email);
	await firstNameInput.sendKeys(input.firstName);
	await lastNameInput.sendKeys(input.lastName);
	await passwordInput.sendKeys(input.password);

	// locate register button and click it
	const registerButton = await driver.findElement(By.css('button[type="submit"]'));
	await registerButton.click();
}

const clearForm = async (driver: WebDriver) => {
	// locate all input fields
	const emailInput = await driver.findElement(By.id('email'));
	const firstNameInput = await driver.findElement(By.id('first_name'));
	const lastNameInput = await driver.findElement(By.id('last_name'));
	const passwordInput = await driver.findElement(By.id('password'));

	// clear all input fields
	await emailInput.sendKeys(Key.CONTROL, 'a');
	await emailInput.sendKeys(Key.BACK_SPACE);
	await firstNameInput.sendKeys(Key.CONTROL, 'a');
	await firstNameInput.sendKeys(Key.BACK_SPACE);
	await lastNameInput.sendKeys(Key.CONTROL, 'a');
	await lastNameInput.sendKeys(Key.BACK_SPACE);
	await passwordInput.sendKeys(Key.CONTROL, 'a');
	await passwordInput.sendKeys(Key.BACK_SPACE);
}

const existingEmail = async (driver: WebDriver) => {
	let input: RegisterForm = {
		email: constants.oldEmail,
		firstName: constants.firstName,
		lastName: constants.lastName,
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
	
		if (alertText === "email is already in use") text = constants.passText;
		else text = constants.failText;
	
		console.log(`${text} (Alert opened with text: ${alertText})\n`)
	
		await alert.accept();
		await clearForm(driver);
	} catch (e) {
		console.log(`${constants.failText} (error: ${e})\n`)
	}

}

const newEmail = async (driver: WebDriver) => {
	let input = {
		email: constants.newEmail,
		firstName: constants.firstName,
		lastName: constants.lastName,
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
	
		if (alertText === "Registration Successful") text = constants.passText;
		else text = constants.failText;
	
		console.log(`${text} (Alert opened with text: ${alertText})\n`)
	
		await alert.accept();
	} catch (e) {
		console.log(`${constants.failText} (error: ${e})\n`)
	}

}

export default { existingEmail, newEmail }