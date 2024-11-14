@TabContent
Feature: Verify Tabs contents

Scenario: Verify Tabs contents
Given the user navigates to the DemoQA page
Then user verifies category card contains correct options with working links
Then user clicks on the "<categoryCard>"
When Click on button "<buttonName>"
Then Validate the content "<tabContent>" of tab "<tabName>"

Examples:
| categoryCard | buttonName  |tabName|tabContent                                                               |
| Widgets      | Tabs        |What   |Lorem Ipsum is simply dummy text of the printing and typesetting industry|