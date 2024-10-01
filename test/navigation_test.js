import { Builder, Browser, By } from 'selenium-webdriver'
import { ServiceBuilder } from 'selenium-webdriver/firefox.js'

import { assert, expect } from 'chai'


describe("Madison island", function () {

    let driver
    // playground app does not load fast enough, so timeout is necessary evil. 
    this.timeout(20000)

    describe('Navigation', function () {
        beforeEach(async function () {
            driver = new Builder()
                .forBrowser(Browser.FIREFOX)
                .setFirefoxService(new ServiceBuilder("/snap/bin/geckodriver"))
                .build()

            await driver.get('http://demo-store.seleniumacademy.com/')
        })
    
        afterEach(async function () {
            await driver.quit()
        })

        it('Navigating from Main to Women page should redirect user to /women ', async function () {
            const navElement = await driver.findElement(By.xpath('/html/body/div/div[2]/header/div/div[3]/nav/ol/li[1]/a'))
            await navElement.click()
            const textElement = await driver.findElement(By.xpath('/html/body/div/div[2]/div[2]/div/div[2]/div[2]'))
            
            assert.equal(await textElement.getText(), 'WOMEN')
        })

        it('Navigating from Main to Men page should redirect user to /men ', async function () {
            const navElement = await driver.findElement(By.xpath('/html/body/div/div[2]/header/div/div[3]/nav/ol/li[2]/a'))
            await navElement.click()
            const textElement = await driver.findElement(By.xpath('/html/body/div/div[2]/div[2]/div/div[2]/div[2]'))
            
            assert.equal(await textElement.getText(), 'MEN')
        })

        it('Navigating from Main to Accessories page should redirect user to /accessories ', async function () {
            const navElement = await driver.findElement(By.xpath('/html/body/div/div[2]/header/div/div[3]/nav/ol/li[3]/a'))
            await navElement.click()
            const textElement = await driver.findElement(By.xpath('/html/body/div/div[2]/div[2]/div/div[2]/div[2]'))
            
            assert.equal(await textElement.getText(), 'ACCESSORIES')
        })


        it('Navigating from Main to Home and Decore page should redirect user to /home-decore ', async function () {
            const navElement = await driver.findElement(By.xpath('/html/body/div/div[2]/header/div/div[3]/nav/ol/li[4]/a'))
            await navElement.click()
            const textElement = await driver.findElement(By.xpath('/html/body/div/div[2]/div[2]/div/div[2]/div[2]'))
            
            assert.equal(await textElement.getText(), 'HOME & DECOR')
        })

        it('Navigating from Main to Sale page should redirect user to /sale ', async function () {
            const navElement = await driver.findElement(By.xpath('/html/body/div/div[2]/header/div/div[3]/nav/ol/li[5]/a'))
            await navElement.click()
            const textElement = await driver.findElement(By.xpath('/html/body/div/div[2]/div[2]/div/div[2]/div[1]/div[2]'))
            
            assert.equal(await textElement.getText(), 'SALE')
        })

        it('Navigating from Main to VIP page should redirect user to /vip ', async function () {
            const navElement = await driver.findElement(By.xpath('/html/body/div/div[2]/header/div/div[3]/nav/ol/li[6]/a'))
            await navElement.click()
            const textElement = await driver.findElement(By.xpath('/html/body/div/div[2]/div[2]/div/div[2]/div[2]/div[2]'))
            
            assert.equal(await textElement.getText(), 'VIP')
        })

        it('Clicking on Logo should redirect user to / ', async function () {
            await driver.get('http://demo-store.seleniumacademy.com/about-magento-demo-store/')
            const navElement = await driver.findElement(By.className('logo'))
            await navElement.click()
            const element = await driver.findElement(By.className('slideshow'))
            
            assert.isTrue(element != null)
        })
    })


})