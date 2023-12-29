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
        try {
            await driver.get('http://localhost:3000/login');

            // Click the "Register" tab
            const registerTab = await driver.findElement(By.xpath('//button[contains(text(), "Register")]'));
            await registerTab.click();

            // Wait for the registration form to be active
            await driver.wait(until.elementLocated(By.xpath('//label[contains(text(), "Email")]/following-sibling::div//input')), 10000);

            // Debug: Check if the email field is visible
            const isEmailVisible = await driver.findElement(By.xpath('//label[contains(text(), "Email")]/following-sibling::div//input')).isDisplayed();
            console.log('Is Email field visible:', isEmailVisible);

            // Fill in the registration form
            const emailInput = await driver.findElement(By.xpath('//label[contains(text(), "Email")]/following-sibling::div//input'));
            await emailInput.sendKeys('newuser@example.com');

            const passwordInput = await driver.findElement(By.xpath('//label[contains(text(), "Password")]/following-sibling::div//input'));
            await passwordInput.sendKeys('password123');

            const confirmPasswordInput = await driver.findElement(By.xpath('//label[contains(text(), "Confirm Password")]/following-sibling::div//input'));
            await confirmPasswordInput.sendKeys('password123');

            // Full Name field
            await driver.wait(until.elementLocated(By.xpath('//label[contains(text(), "Full Name")]/following-sibling::div//input')), 10000);
            const fullNameInput = await driver.findElement(By.xpath('//label[contains(text(), "Full Name")]/following-sibling::div//input'));
            await fullNameInput.sendKeys('John Doe');

            // Debug: Check if the username field is visible before interacting
            // Replace with the actual XPath for the username field
            const isUsernameVisible = await driver.findElement(By.xpath('//label[contains(text(), "Username")]/following-sibling::div//input')).isDisplayed();
            console.log('Is Username field visible:', isUsernameVisible);

            // Username field
            // Replace with the actual XPath for the username field
            const usernameInput = await driver.findElement(By.xpath('//label[contains(text(), "Username")]/following-sibling::div//input'));
            await usernameInput.sendKeys('newusername');

            // Locate the registration button
            const registerButton = await driver.findElement(By.xpath('//button[contains(text(), "Register")]'));

            // Wait until the button is clickable
            await driver.wait(until.elementIsEnabled(registerButton), 10000);

            // Click the button using JavaScript
            await driver.executeScript("arguments[0].click();", registerButton);
 

            // Navigate to the login page
            await driver.get('http://localhost:3000/login');

            // Fill in the login form
            // Email field
            const emailInputForLogin = await driver.findElement(By.xpath('//input[@name="email" or @id=":r1:"]'));
            await emailInputForLogin.sendKeys('newuser@example.com');

            // Password field
            const passwordInputForLogin = await driver.findElement(By.xpath('//input[@name="password" or @id=":r3:"]'));
            await passwordInputForLogin.sendKeys('password123');

            // Click the login button
            // Assuming the button can be identified by the text "Login"
            const loginButton = await driver.findElement(By.xpath('//button[contains(text(), "Login")]'));
            await loginButton.click();

            // Verify successful navigation or login
            // Add checks or assertions as necessary

            console.log('Login process completed successfully.');

            // Wait for the dashboard page to load by checking for the welcome message
            const welcomeMessage = await driver.wait(until.elementLocated(By.xpath('//h4[contains(text(), "Welcome, John Doe")]')), 10000);
            assert(welcomeMessage, 'Welcome message not found on dashboard');

            console.log('Successfully navigated to the dashboard and verified welcome message.');

        } catch (error) {
            console.error('Test failed', error);
            throw error;
        }
    }, 30000); // Adjusting Jest timeout for the test
});
