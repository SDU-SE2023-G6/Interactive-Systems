const { Builder, By } = require('selenium-webdriver');

describe('Decline Walk Request Test', () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Decline Walk Request - Unsuccessful', async () => {
        // Navigate to the My Walks page
        await driver.get('http://localhost:3000/my-walks');

        // Assuming there is a button or link to decline a walk request
        // Example: Click on the first 'Decline Walk' button
        const declineButton = await driver.findElement(By.xpath("//button[contains(text(), 'Decline Walk')]"));
        await declineButton.click();

        // Verify the walk request has been declined [This depends on the actual implementation]
        // Example:
        // const declineMessage = await driver.findElement(By.className('decline-message')).getText();
        // expect(declineMessage).toContain('Walk declined successfully');
    });
});
