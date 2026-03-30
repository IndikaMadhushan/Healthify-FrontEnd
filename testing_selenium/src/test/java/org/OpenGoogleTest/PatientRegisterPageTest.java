package org.OpenGoogleTest;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.time.Duration;

public class PatientRegisterPageTest {
    WebDriver driver;

    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://healthify.dev/patient-register-1");
    }

    @Test
    public void testFillRegistrationForm() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        try {

            wait.until(ExpectedConditions.urlContains("patient-register-1"));
            System.out.println("Reached the patient registration page.");


            WebElement firstName = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("input[placeholder='Enter your first name']")));
            WebElement secondName = driver.findElement(By.cssSelector("input[placeholder='Enter your second name']"));
            WebElement lastName = driver.findElement(By.cssSelector("input[placeholder='Enter your last name']"));


            WebElement dob = driver.findElement(By.cssSelector("input[type='date']"));

            WebElement genderMale = driver.findElement(By.cssSelector("input[value='Male']"));


            WebElement nic = driver.findElement(By.cssSelector("input[placeholder='e.g., 123456789V or 123456789012']"));
            WebElement email = driver.findElement(By.cssSelector("input[placeholder='your.email@example.com']"));
            WebElement contactNum = driver.findElement(By.cssSelector("input[placeholder='+94 XX XXX XXXX (optional)']"));


            WebElement nextButton = driver.findElement(By.xpath("//button[text()='Next']"));


            System.out.println("Filling out the registration form...");

            firstName.sendKeys("John");
            secondName.sendKeys("Edward");
            lastName.sendKeys("Doe");


            dob.sendKeys("1990-01-15");

            genderMale.click();

            nic.sendKeys("123456789V");
            email.sendKeys("test_patient@example.com");
            contactNum.sendKeys("0712345678");

            System.out.println("Clicking Next...");
            nextButton.click();

            Thread.sleep(3000);

        } catch (Exception e) {
            System.out.println("Form filling failed! Error: " + e.getMessage());
        }
    }

//    @AfterMethod
//    public void tearDown() {
//        if (driver != null) {
//            driver.quit();
//        }
//    }
}