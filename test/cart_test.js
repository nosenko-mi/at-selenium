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


    describe("Cart functions", function () {
        it('After adding item to a cart user should be redirected to Cart page', async function () {
            await driver.get('http://demo-store.seleniumacademy.com/women/new-arrivals/elizabeth-knit-top-484.html')

            await driver.findElement(By.xpath('/html/body/div[1]/div[2]/div[2]/div/div[2]/div[3]/div[1]/form/div[3]/div[5]/dl/dd[1]/div/ul/li[2]/a/span[1]/img')).click()
            await driver.findElement(By.xpath('/html/body/div[1]/div[2]/div[2]/div/div[2]/div[3]/div[1]/form/div[3]/div[5]/dl/dd[2]/div/ul/li[1]/a/span[1]')).click()
            
            await driver.findElement(By.xpath('/html/body/div[1]/div[2]/div[2]/div/div[2]/div[3]/div[1]/form/div[3]/div[6]/div[2]/div[2]/button')).click()
            const item = await driver.findElement(By.xpath('/html/body/div/div[2]/div[2]/div/div/div[2]/form/table/tbody/tr/td[2]/div'))
            assert.isTrue(await item.getText() == 'SKU: wbk012c-Pink-S')
        })

        it('Changing quantity should update total sum', async function () {
            await driver.get('http://demo-store.seleniumacademy.com/women/new-arrivals/elizabeth-knit-top-484.html')

            await driver.findElement(By.xpath('/html/body/div[1]/div[2]/div[2]/div/div[2]/div[3]/div[1]/form/div[3]/div[5]/dl/dd[1]/div/ul/li[2]/a/span[1]/img')).click()
            await driver.findElement(By.xpath('/html/body/div[1]/div[2]/div[2]/div/div[2]/div[3]/div[1]/form/div[3]/div[5]/dl/dd[2]/div/ul/li[1]/a/span[1]')).click()
            await driver.findElement(By.xpath('/html/body/div[1]/div[2]/div[2]/div/div[2]/div[3]/div[1]/form/div[3]/div[6]/div[2]/div[2]/button')).click()
            await driver.findElement(By.css('.product-cart-actions > input:nth-child(1)')).sendKeys(2)
            await driver.findElement(By.css('button.btn-update:nth-child(2)')).click()

            const totalPriceElement = await driver.findElement(By.css('#shopping-cart-totals-table > tfoot:nth-child(2) > tr:nth-child(1) > td:nth-child(2) > strong:nth-child(1) > span:nth-child(1)'))
            const totalPrice = await totalPriceElement.getText()
            assert.isTrue(totalPrice == "$2,727.90")
        })


        it('Clicking on "Empty cart" should remove all items from cart', async function () {
            await driver.get('http://demo-store.seleniumacademy.com/women/new-arrivals/elizabeth-knit-top-484.html')

            await driver.findElement(By.xpath('/html/body/div[1]/div[2]/div[2]/div/div[2]/div[3]/div[1]/form/div[3]/div[5]/dl/dd[1]/div/ul/li[2]/a/span[1]/img')).click()
            await driver.findElement(By.xpath('/html/body/div[1]/div[2]/div[2]/div/div[2]/div[3]/div[1]/form/div[3]/div[5]/dl/dd[2]/div/ul/li[1]/a/span[1]')).click()
            await driver.findElement(By.xpath('/html/body/div[1]/div[2]/div[2]/div/div[2]/div[3]/div[1]/form/div[3]/div[6]/div[2]/div[2]/button')).click()
            await driver.findElement(By.css('.product-cart-actions > input:nth-child(1)')).sendKeys(2)
            await driver.findElement(By.css('button.btn-update:nth-child(2)')).click()
            await driver.findElement(By.id('empty_cart_button')).click()

            const titleElement = await driver.findElement(By.css('.page-title')).getText()
            console.log(titleElement)
            assert.equal(titleElement, "SHOPPING CART IS EMPTY")
        })


    })
})