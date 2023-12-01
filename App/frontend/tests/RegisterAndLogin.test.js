const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

describe('User Registration and Login Test', () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('should register and login successfully', async () => {
        await driver.get('http://localhost:3000/login');

        // Wait for the email input field to be present
        await driver.wait(until.elementLocated(By.css('input[name="email"]')), 10000);

        // Now interact with the email input field
        const emailInput = await driver.findElement(By.css('input[name="email"]'));
        await emailInput.sendKeys('newuser@example.com');

        // Fill out the registration form
        await driver.findElement(By.name('email')).sendKeys('newuser@example.com');
        await driver.findElement(By.name('password')).sendKeys('password123');
        await driver.findElement(By.name('confirmPassword')).sendKeys('password123');
        await driver.findElement(By.name('fullName')).sendKeys('New User');
        await driver.findElement(By.name('username')).sendKeys('newuser');

        // Submit the registration form
        const registerButton = await driver.findElement(By.css('button[type="button"]'));
        await registerButton.click();

        // Wait for login page to load
        await driver.wait(until.elementLocated(By.xpath('//button[contains(text(), "Login")]')), 10000);

        // Fill out the login form
        await driver.findElement(By.name('email')).sendKeys('newuser@example.com');
        await driver.findElement(By.name('password')).sendKeys('password123', Key.ENTER);

        // Wait for navigation to the dashboard
        await driver.wait(until.urlContains('/dashboard'), 10000);

        // Verify successful navigation to the dashboard
        const url = await driver.getCurrentUrl();
        assert(url.includes('/dashboard'));
    });
});
