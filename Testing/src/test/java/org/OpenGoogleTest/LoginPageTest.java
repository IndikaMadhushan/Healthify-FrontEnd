package org.OpenGoogleTest;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.time.Duration;

public class LoginPageTest {
    WebDriver driver;

    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();

        driver.get("https://healthify.dev/login");
    }

    @Test
    public void testValidLogin() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        try {

            WebElement emailField = wait.until(ExpectedConditions.visibilityOfElementLocated(
                    By.cssSelector("input[placeholder='Email address']")
            ));

            WebElement passwordField = driver.findElement(
                    By.cssSelector("input[placeholder='Password']")
            );


            WebElement loginButton = driver.findElement(
                    By.xpath("//button[text()='Login']")
            );


            System.out.println("Entering email and password...");
            emailField.sendKeys("abhimani12862@usci.ruh.ac.lk");
            passwordField.sendKeys("Abhi232cs");


            loginButton.click();
            System.out.println("Clicked the login button.");


            Thread.sleep(3000);

        } catch (Exception e) {
            System.out.println("Failed to interact with the form. Error: " + e.getMessage());
        }
    }


    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
