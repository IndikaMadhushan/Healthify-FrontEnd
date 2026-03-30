package org.OpenGoogleTest;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import java.time.Duration;

public class HomePageTest {
    WebDriver driver;

    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://healthify.dev");
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
    }

    @Test(priority = 1)
    public void testHomePage() {
        String title = driver.getTitle();
        System.out.println("Page Title is: " + title);
        Assert.assertTrue(title.contains("Healthify"));

    }

    @Test(priority = 2)
    public void testNavigation() {

        WebElement getStartedBtn = driver.findElement(By.partialLinkText("Get Started"));
        getStartedBtn.click();

        String newUrl = driver.getCurrentUrl();
        System.out.println("Navigated to: " + newUrl);
        Assert.assertNotEquals(newUrl, "https://healthify.dev/", "The URL did not change!");
    }



}