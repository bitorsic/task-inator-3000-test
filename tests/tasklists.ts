import { By, until, WebDriver } from "selenium-webdriver";
import constants from "../constants";

const deleteTaskList = async (driver: WebDriver) => {
	try {
		// Firstly, get the initial tasklist to check for its disappearance
		const heading = await driver.wait(
			until.elementLocated(By.xpath(`//h5[contains(.,"${constants.firstName}'s Tasks")]`)),
			10000 // Wait up to 10 seconds
		);

		// Wait for the 'Delete Tasklist' button and click it
		const deleteButton = await driver.wait(
			until.elementLocated(By.xpath("//button[.//span[text()='Delete Tasklist']]")),
			10000 // Wait up to 10 seconds
		);
		await deleteButton.click();

		// Wait until the tasklist is removed
		const isAbsent = await driver.wait(until.stalenessOf(heading), 10000); // Wait up to 10 seconds

		if (isAbsent) console.log(`${constants.passText} (Tasklist deleted successfully)\n`);
		else console.log(`${constants.failText} (Tasklist could not be deleted)\n`);
	} catch (e) {
		console.log(`${constants.failText} (error: ${e})\n`);
	}
}

const emptyTitle = async (driver: WebDriver) => {
	try {
		// Wait for the 'Add tasklist' button and click it
		const addTaskListButton = await driver.wait(
			until.elementLocated(By.xpath("//button[.//span[text()='Add TaskList']]")),
			10000 // Wait up to 10 seconds
		);
		await addTaskListButton.click();

		// wait for alert, and assert the text in it
		await driver.wait(until.alertIsPresent());

		const alert = await driver.switchTo().alert();
		const alertText = await alert.getText();

		// assertion
		let text: string;

		if (alertText === "title cannot be empty") text = constants.passText;
		else text = constants.failText;

		console.log(`${text} (Alert opened with text: ${alertText})\n`)

		await alert.accept();
	} catch (e) {
		console.log(`${constants.failText} (error: ${e})\n`);
	}
}

const validTitle = async (driver: WebDriver) => {
	try {
		// Wait for the input element, by getting it by placeholder
		const inputField = await driver.wait(
			until.elementLocated(By.xpath("//input[@placeholder='Add New List']")),
			10000 // Wait up to 10 seconds
		);

		inputField.sendKeys(constants.taskListTitle);

		// Wait for the 'Add tasklist' button and click it
		const addTaskListButton = await driver.wait(
			until.elementLocated(By.xpath("//button[.//span[text()='Add TaskList']]")),
			10000 // Wait up to 10 seconds
		);
		await addTaskListButton.click();

		// Locate the <h5> element with tasklist title 
		const heading = await driver.wait(
			until.elementLocated(By.xpath(`//h5[contains(.,'${constants.taskListTitle}')]`)),
			10000 // Wait up to 10 seconds
		);

		console.log(`${constants.passText} (Tasklist added successfully)\n`)
	} catch (e) {
		console.log(`${constants.failText} (error: ${e})\n`);
	}
}

export default { deleteTaskList, emptyTitle, validTitle }