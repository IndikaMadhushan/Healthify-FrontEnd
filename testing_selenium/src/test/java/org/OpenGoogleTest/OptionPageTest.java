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

public class OptionPageTest {
    WebDriver driver;

    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();

        driver.get("https://healthify.dev/option");
    }

    @Test
    public void testRoleSelection() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        try {
            // Wait for the URL to load
            wait.until(ExpectedConditions.urlContains("option"));
            System.out.println("Reached the option page.");

            // Locate the "Doctor Account" card by its heading text
            WebElement doctorCard = wait.until(ExpectedConditions.elementToBeClickable(
                    By.xpath("//h3[text()='Doctor Account']")
            ));


            WebElement patientCard = driver.findElement(
                    By.xpath("//h3[text()='Patient Account']")
            );

            System.out.println("Verified both Doctor and Patient options are visible.");


            System.out.println("Clicking on 'Patient Account'...");
            patientCard.click();


            Thread.sleep(3000);


            System.out.println("Successfully clicked! Now on URL: " + driver.getCurrentUrl());

        } catch (Exception e) {
            System.out.println("Failed to find or click the options. Error: " + e.getMessage());
        }
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
