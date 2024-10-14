import { By, until, WebDriver } from "selenium-webdriver";
import constants from "../constants";

const emptyContent = async (driver: WebDriver) => {
	try {
		// Wait for the 'Add task' button and click it
		const addTaskButton = await driver.wait(
			until.elementLocated(By.xpath("//button[.//span[text()='Add Task']]")),
			5000 // Wait up to 5 seconds
		);
		await addTaskButton.click();

		// Wait for the 'Add' button and click it, no content being added
		const addButton = await driver.wait(
			until.elementLocated(By.xpath("//button[text()='Add']")),
			5000 // Wait up to 5 seconds
		);
		await addButton.click();

		// wait for alert, and assert the text in it
		await driver.wait(until.alertIsPresent());

		const alert = await driver.switchTo().alert();
		const alertText = await alert.getText();

		// assertion
		let text: string;

		if (alertText === "content cannot be empty") text = constants.passText;
		else text = constants.failText;

		console.log(`${text} (Alert opened with text: ${alertText})\n`)

		await alert.accept();
	} catch (e) {
		console.log(`${constants.failText} (error: ${e})\n`);
	}
}

const validContent = async (driver: WebDriver) => {
	try {
		// Add Task button would already be clicked, no need to click again

		// Wait for the input element, by getting it by placeholder
		const inputField = await driver.wait(
			until.elementLocated(By.xpath("//input[@placeholder='Add New Task']")),
			5000 // Wait up to 5 seconds
		);

		inputField.sendKeys(constants.taskContent);

		// Wait for the 'Add' button and click it
		const addButton = await driver.wait(
			until.elementLocated(By.xpath("//button[text()='Add']")),
			5000 // Wait up to 5 seconds
		);
		await addButton.click();

		// Locate the <p> element with content 
		const paragraph = await driver.wait(
			until.elementLocated(By.xpath(`//p[contains(.,'${constants.taskContent}')]`)),
			5000 // Wait up to 5 seconds
		);

		console.log(`${constants.passText} (Task added successfully)\n`)
	} catch (e) {
		console.log(`${constants.failText} (error: ${e})\n`);
	}
}

const deleteTask = async (driver: WebDriver) => {
	try {
		// Firstly, get the entered task to check for its disappearance
		const paragraph = await driver.wait(
			until.elementLocated(By.xpath(`//p[contains(.,'${constants.taskContent}')]`)),
			5000 // Wait up to 5 seconds
		);

		// Find and click the delete button
		const deleteButton = await driver.findElement(By.className('ml-4'));
		await deleteButton.click();

		// Wait until the task is removed
		const isAbsent = await driver.wait(until.stalenessOf(paragraph), 5000); // Wait up to 5 seconds

		if (isAbsent) console.log(`${constants.passText} (Task deleted successfully)\n`);
		else console.log(`${constants.failText} (Task could not be deleted)\n`);
	} catch (e) {
		console.log(`${constants.failText} (error: ${e})\n`);
	}
}

export default { emptyContent, validContent, deleteTask }