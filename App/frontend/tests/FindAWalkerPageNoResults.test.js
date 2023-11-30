const { Builder, By } = require('selenium-webdriver');

describe('Filter Dog Walkers - Unsuccessful Test', () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Filter Dog Walkers - No Results', async () => {
        // Navigate to the Find a Walker page
        await driver.get('http://localhost:3000/find-a-walker');

        // Apply filters that lead to no results
        // Example: applying a very stringent filter
        // const stringentFilter = await driver.findElement(By.name('stringentFilter'));
        // await stringentFilter.click();

        // Check for no results message
        const noResultsMessage = await driver.findElement(By.xpath("//*[contains(text(), 'No walkers available.')]"));
        expect(await noResultsMessage.isDisplayed()).toBe(true);
    });
});
