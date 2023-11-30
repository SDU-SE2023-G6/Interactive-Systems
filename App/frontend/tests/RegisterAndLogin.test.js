const { Builder, By, Key, until } = require('selenium-webdriver');

jest.setTimeout(300000); // Increase the timeout to 30 seconds

describe('User Registration and Login Test', () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Register and Login - Successful', async () => {
        // Navigate to the Login/Registration page
        await driver.get('http://localhost:3000/login');

        // Wait for the Register tab to be available and then click it
        const registerTab = await driver.wait(until.elementLocated(By.xpath("//span[contains(text(), 'Register')]")), 1000);
        await registerTab.click();

        // Fill out the registration form
        await driver.findElement(By.name('email')).sendKeys('newuser@example.com');
        await driver.findElement(By.name('password')).sendKeys('password123');
        await driver.findElement(By.name('confirmPassword')).sendKeys('password123');
        await driver.findElement(By.name('fullName')).sendKeys('New User');
        await driver.findElement(By.name('username')).sendKeys('newuser');

        // Submit the registration form
        const registerButton = await driver.findElement(By.xpath("//button[contains(text(), 'Register')]"));
        await registerButton.click();

        // Wait for login page to load
        await driver.wait(until.elementLocated(By.xpath("//span[contains(text(), 'Login')]")), 1000);

        // Fill out the login form
        await driver.findElement(By.name('email')).sendKeys('newuser@example.com');
        await driver.findElement(By.name('password')).sendKeys('password123', Key.ENTER);

        // Wait for navigation to the dashboard
        await driver.wait(until.urlContains('/dashboard'), 10000);

        // Verify successful navigation to the dashboard
        const url = await driver.getCurrentUrl();
        expect(url).toContain('/dashboard');
    });
});
