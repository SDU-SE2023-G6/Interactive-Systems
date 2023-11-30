const { Builder, By } = require('selenium-webdriver');

describe('Review Client Reviews Test', () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Review Client Reviews - Successful', async () => {
        // Navigate to the Profile Management page
        await driver.get('http://localhost:3000/profile-management');

        // Find and check the first review card
        const firstReviewCard = await driver.findElement(By.css('div[role="review-card"]:first-child'));
        const rating = await firstReviewCard.findElement(By.className('MuiRating-root')).getAttribute('data-value');
        const reviewText = await firstReviewCard.findElement(By.tagName('p')).getText();

        // Verify the review details (assuming a 5-star rating from Emily)
        expect(rating).toBe('5');
        expect(reviewText).toContain('Great walk service!');

        // [Additional checks can be added based on the actual implementation]
    });
});
