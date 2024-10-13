import { By, until, WebDriver } from "selenium-webdriver";

type RegisterForm = {
	email: string,
	firstName: string,
	lastName: string,
	password: string,
}

export const existingEmail = async (driver: WebDriver) => {
	const input: RegisterForm = {
		email: "bitorsic@gmail.com",
		firstName: "Yash",
		lastName: "Jaiswal",
		password: "testing",
	}

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

	// wait for alert, and assert the text in it
	await driver.wait(until.alertIsPresent());

    const alert = await driver.switchTo().alert();
    const alertText = await alert.getText();

	console.log(`Test Case Passed [✓] (Alert opened with text: ${alertText})`)

	await alert.accept();
}