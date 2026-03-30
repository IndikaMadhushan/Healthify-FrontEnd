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

public class LogoutTest {
    WebDriver driver;

    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();

        driver.get("https://healthify.dev/login");
    }

    @Test
    public void testLogout() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        try {
            //  LOG IN FIRST
            System.out.println("Logging in...");
            WebElement emailField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("input[placeholder='Email address']")));
            WebElement passwordField = driver.findElement(By.cssSelector("input[placeholder='Password']"));
            WebElement loginBtn = driver.findElement(By.xpath("//button[text()='Login']"));

            emailField.sendKeys("thathsaraabhi232@gmail.com");
            passwordField.sendKeys("Abhi03cs@"); // Don't forget to put your real password here!
            loginBtn.click();

            wait.until(ExpectedConditions.urlContains("patient"));
            System.out.println("Successfully logged in. Navigating to reports...");
            driver.navigate().to("https://healthify.dev/patient/medical-reports");


            // THE LOGOUT TEST
            System.out.println("Starting Logout sequence...");

            // Profile Dropdown
            WebElement profileDropdownBtn = wait.until(ExpectedConditions.elementToBeClickable(
                    By.xpath("//nav//div[contains(@class, 'relative')]/button")
            ));
            profileDropdownBtn.click();
            System.out.println("Opened profile dropdown.");

            // Click  Logout button in the dropdown
            WebElement logoutBtn = wait.until(ExpectedConditions.elementToBeClickable(
                    By.xpath("//button[contains(., 'Logout')]")
            ));
            logoutBtn.click();
            System.out.println("Clicked Logout from dropdown. Waiting for confirmation popup...");


            // Confirmation Popup

            // Wait for the specific Log Out button in the modal to appear
            WebElement confirmLogoutBtn = wait.until(ExpectedConditions.elementToBeClickable(
                    By.xpath("//button[text()='Log Out']")
            ));

            confirmLogoutBtn.click();
            System.out.println("Clicked 'Log Out' on the confirmation popup.");
            
            // Verify the Logout
            wait.until(ExpectedConditions.urlContains("login"));
            System.out.println("Successfully logged out! Current URL: " + driver.getCurrentUrl());

            Thread.sleep(3000); // Pause to watch it happen

        } catch (Exception e) {
            System.out.println("Logout test failed! Error: " + e.getMessage());
        }
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}