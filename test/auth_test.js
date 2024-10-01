import { Builder, Browser, By } from 'selenium-webdriver'
import { ServiceBuilder } from 'selenium-webdriver/firefox.js'

import { assert, expect } from 'chai'


describe("Madison island", function () {

    let driver
    // playground app does not load fast enough, so timeout is necessary evil. 
    this.timeout(20000)
    beforeEach(async function () {
        driver = new Builder()
            .forBrowser(Browser.FIREFOX)
            .setFirefoxService(new ServiceBuilder("/snap/bin/geckodriver"))
            .build()


    })

    afterEach(async function () {
        await driver.quit()
    })


    describe("Creating a new user", function (){

        it('Required fields should display an error if left empty', async function () {
            await driver.get('http://demo-store.seleniumacademy.com/customer/account/create/')
            const registerButton = await driver.findElement(By.xpath('/html/body/div/div[2]/div[2]/div/div/div[2]/form/div[2]/button'))
            await registerButton.click()
            const elements = await driver.findElements(By.className('validation-advice'))
            const visible = elements.filter((e)=> e.isDisplayed())
            // 5 required fields: first name, last name, email, password, confirm password
            assert.isTrue(visible.length == 5, `Expected: 5, Actual: ${visible.lenght}`) 
        })

        it('Required field should not display an error if filled, but other are empty', async function () {
            await driver.get('http://demo-store.seleniumacademy.com/customer/account/create/')
            const registerButton = await driver.findElement(By.xpath('/html/body/div/div[2]/div[2]/div/div/div[2]/form/div[2]/button'))
            
            const inputElement = await driver.findElement(By.id('firstname')).sendKeys("John Doe")
            await registerButton.click()

            const elements = await driver.findElements(By.className('validation-advice'))
            const visible = await elements.filter((e)=> e.isDisplayed())

            // 5 required fields, 1 is filled, 4 are left.
            assert.isTrue(visible.length == 4, `Expected: 4, Actual: ${visible.lenght}`) 
        })

        it('After logging in user should be redirected to My account page', async function () {
            await driver.get('http://demo-store.seleniumacademy.com/customer/account/login/')
            const logInButton = await driver.findElement(By.id('send2'))
            
            await driver.findElement(By.id('email')).sendKeys("jd@email.com")
            await driver.findElement(By.id('pass')).sendKeys("password")

            await logInButton.click()
            const element = await driver.findElement(By.xpath('/html/body/div/div[2]/div[2]/div/div[2]/div[2]/div/div[1]'))

            assert.equal(await element.getText(), 'MY DASHBOARD') 
        })
        
    })
})