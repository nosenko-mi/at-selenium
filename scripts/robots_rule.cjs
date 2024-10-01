const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const { ServiceBuilder } = require('selenium-webdriver/firefox');

async function example() {
    // let driver = await new Builder().forBrowser(Browser.FIREFOX).build()
    let driver = new Builder()
        .forBrowser(Browser.FIREFOX)
        .setFirefoxService(new ServiceBuilder("/snap/bin/geckodriver"))
        .build()
    console.log('Driver is ready')
    try {
        await driver.get('http://suninjuly.github.io/math.html')
        console.log('Got web page')

        const inputElement = await driver.findElement(By.id('input_value'))
        const x = await inputElement.getText()

        console.log('Found input_value')
        const y = Math.log(Math.abs(12 * Math.sin(x)))

        answer_field = await driver.findElement(By.id('answer'))
        answer_field.sendKeys(y)
        console.log('Sent keys to answerut_value')

        robot_checkbox = await driver.findElement(By.id('robotCheckbox'))
        console.log('Fund robotCheckbox')
        robot_checkbox.click()
        console.log('Clicked robotCheckbox')

        robots_rule_button = await driver.findElement(By.id('robotsRule'))
        console.log('Found robotsRule')
        robots_rule_button.click()
        console.log('Clicked robotsRule')

        answer_field.submit()
        console.log('Submitted form')

    } catch (error) {
        console.error(error)
    } finally {
        // do not quit driver if you want to see next page
        // await driver.quit()
        // console.log('Quit driver')
    }
}

example()