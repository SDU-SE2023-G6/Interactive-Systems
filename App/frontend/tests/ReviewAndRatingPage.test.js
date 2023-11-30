const { Builder, By, Key } = require('selenium-webdriver');

describe('Review the Walker Test', () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Review the Walker - Successful', async () => {
        // Navigate to the Review and Rating page
        await driver.get('http://localhost:3000/review-and-rating');

        // Select a rating
        const stars = await driver.findElements(By.className('MuiRating-label'));
        await stars[4].click(); // Selecting 5 stars

        // Enter review text
        const reviewInput = await driver.findElement(By.name('reviewText'));
        await reviewInput.sendKeys('Great walk service!');

        // Submit the review
        const submitButton = await driver.findElement(By.css('button[type="submit"]'));
        await submitButton.click();

        // Verify successful submission [This part depends on the actual implementation, e.g., a success message]
        // Example:
        // await driver.wait(until.elementLocated(By.className('success-message')), 5000);
        // const successMessage = await driver.findElement(By.className('success-message')).getText();
        // expect(successMessage).toBe('Review submitted successfully');
    });
});
