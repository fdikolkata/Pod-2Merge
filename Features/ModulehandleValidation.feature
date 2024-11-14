@ModalContent
Feature: Verify Modal contents

Scenario: Verify Modal Dialogs contents
Given the user navigates to the DemoQA page
Then user verifies category card contains correct options with working links
Then user clicks on the "<categoryCard>"
When Click on button "<buttonName>"
Then User navigates to small module page and verify small module page content "<smallModalContent>"
Then User navigates to large module page and verify large module page content "<largeModelContent>"

Examples:
| categoryCard            | buttonName    | smallModalContent                               |largeModelContent|
| Alerts, Frame & Windows | Modal Dialogs | This is a small modal. It has very less content |Lorem Ipsum is simply dummy text of the printing and typesetting industry|