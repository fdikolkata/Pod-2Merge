@selectorHub
Feature: Login functionality

    Scenario: User successfully navigates to the automation exercise page
        Given the user navigates to the DemoQA page
        Then the user validates they are on the page

  #   Scenario: User performs Broken Links To Validate the Action by Clicking Valid Link
  #       And user clicks on the "Elements" Tab
  #       Then user clicks on the "Broken Links - Images" Tab
  #       And user first click on valid link and validate the response that user redirect to the link "https://demoqa.com/"

  #   Scenario: User performs Broken Links To Validate the Action by Clicking Invalid Link
  #       And user clicks on the "Elements" Tab
  #       Then user clicks on the "Broken Links - Images" Tab
  #       And user first click on Inavlid link and validate the response that user redirect to the link "http://the-internet.herokuapp.com/status_codes/500"
  #       Then the user navigates to the DemoQA page

  # Scenario: User performs download and upload items in Element
  #   Given user clicks on the "Elements" Tab
  #   Then user clicks on the "Upload and Download" Tab
  #   And user clicks on the Download button to folder "Imgfile"
  #   And user wants to upload file "sampleFile.jpeg" from folder "Imgfile"


  Scenario: User interacts with browser windows
    Given user clicks on the "Alerts, Frame & Windows" Tab
    Then user clicks on the "Browser Windows" Tab
    And user clicks on the "New Tab" and verifies the text opened in the new Tab "This is a sample page"
    Then user clicks on the "New Window Message" and verifies the text contain in the new Window "Knowledge increases"



@ForDemo
Scenario: Verify
Given user navigates to DemoQA and verify data extraction from json and excel
Then user verifies different types of Alerts


