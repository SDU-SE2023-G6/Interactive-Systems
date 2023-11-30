const { Builder, By, until } = require('selenium-webdriver');

describe('Book a Dog Walk Test', () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Book a Dog Walk - Successful', async () => {
        // Navigate to the Find a Walker page
        await driver.get('http://localhost:3000/find-a-walker');

        // Filter by rating
        const ratingFilter = await driver.findElement(By.name('rating'));
        await ratingFilter.sendKeys('4'); // Assuming a rating filter exists

        // Select a walker
        const selectWalker = await driver.findElement(By.className('select-walker-button'));
        await selectWalker.click();

        // Fill the Schedule Walk Form
        await driver.findElement(By.name('date')).sendKeys('2023-12-01'); // Set date
        await driver.findElement(By.name('duration')).sendKeys('30'); // Set duration
        await driver.findElement(By.name('dogName')).sendKeys('Bella'); // Set dog name

        // Submit the form
        await driver.findElement(By.tagName('button')).click();

        // Wait for the Walk Confirmation Page
        await driver.wait(until.urlContains('/walk-confirmation'), 5000);

        // Verify successful booking
        const successMessage = await driver.findElement(By.tagName('h4')).getText();
        expect(successMessage).toBe('Walk Successfully Booked!');
    });
});

describe('Filter Dog Walkers Test', () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Filter Dog Walkers - Successful', async () => {
        // Navigate to the Find a Walker page
        await driver.get('http://localhost:3000/find-a-walker');

        // Apply filters [Assuming there are filter elements, e.g., for large dog experience]
        // Example:
        // const largeDogFilter = await driver.findElement(By.name('largeDogExperience'));
        // await largeDogFilter.click();

        // Select a highly-rated walker
        // Assuming the walkers are sorted or can be sorted by rating
        // Example:
        // const topRatedWalker = await driver.findElement(By.css('button[aria-label="select-top-rated-walker"]'));
        // await topRatedWalker.click();

        // Verify walker selection [This depends on the actual implementation]
        // Example:
        // const walkerName = await driver.findElement(By.className('walker-name')).getText();
        // expect(walkerName).toContain('Expected Walker Name');
    });
});