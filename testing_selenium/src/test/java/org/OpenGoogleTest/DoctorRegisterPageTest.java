package org.OpenGoogleTest;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select; // <-- NEW IMPORT FOR DROPDOWNS
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.time.Duration;

public class DoctorRegisterPageTest
{
    WebDriver driver;

    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://healthify.dev/doctor-register-1");
    }

    @Test
    public void testDoctorRegistrationForm() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        try {
            wait.until(ExpectedConditions.urlContains("doctor-register-1"));
            System.out.println("Reached the doctor registration page.");


            WebElement firstName = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("input[placeholder='Enter your first name']")));
            WebElement secondName = driver.findElement(By.cssSelector("input[placeholder='Enter your second name']"));
            WebElement lastName = driver.findElement(By.cssSelector("input[placeholder='Enter your last name']"));

            WebElement email = driver.findElement(By.cssSelector("input[placeholder='your.email@example.com']"));
            WebElement nic = driver.findElement(By.cssSelector("input[placeholder='Enter your NIC']"));
            WebElement hospital = driver.findElement(By.cssSelector("input[placeholder='Your hospital or clinic']"));
            WebElement slmc = driver.findElement(By.cssSelector("input[placeholder='SLMC registration number']"));


            WebElement dob = driver.findElement(By.cssSelector("input[type='date']"));
            WebElement genderFemale = driver.findElement(By.cssSelector("input[value='Female']")); // Let's test Female this time

            WebElement dropdownElement = driver.findElement(By.tagName("select"));
            Select specializationDropdown = new Select(dropdownElement);


            WebElement nextButton = driver.findElement(By.xpath("//button[text()='Next']"));


            System.out.println("Filling out the doctor registration form...");

            firstName.sendKeys("Jane");
            secondName.sendKeys("Marie");
            lastName.sendKeys("Smith");

            genderFemale.click();

            email.sendKeys("dr.smith@example.com");
            nic.sendKeys("987654321V");
            dob.sendKeys("1990-01-15");


            //specializationDropdown.selectByVisibleText("Cardiology");
            specializationDropdown.selectByValue("Cardiology");

            System.out.println("Selected Cardiology from dropdown.");

            hospital.sendKeys("General Hospital Colombo");
            slmc.sendKeys("SLMC-45678");



            // Pause
            Thread.sleep(3000);
            System.out.println("Clicking Next...");
            nextButton.click();

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
