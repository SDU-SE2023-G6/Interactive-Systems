const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('User Registration and Login Test', () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('should register a new user', async () => {
        try {
            await driver.get('http://localhost:3000/login');

            // Click the "Register" tab
            const registerTab = await driver.findElement(By.xpath('//button[contains(text(), "Register")]'));
            await registerTab.click();

            // Wait for a moment to ensure the registration form is displayed
            await driver.sleep(3000); // Adjust this delay as necessary

            // Fill in the registration form
            // Email field
            const emailInput = await driver.findElement(By.xpath('//label[contains(text(), "Email")]/following-sibling::div//input'));
            await emailInput.sendKeys('newuser@example.com');

            // Password and other fields...

            // Click the registration button
            const registerButton = await driver.findElement(By.xpath('//button[contains(text(), "Register")][@type="button"]'));
            await registerButton.click();

            // Add any additional steps for post-registration actions or checks

            console.log('Registration form submitted successfully.');

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

     } catch (error) {
         console.error('Test failed', error);
         throw error;
     }
 }, 30000); // Adjusting Jest timeout for the test
});