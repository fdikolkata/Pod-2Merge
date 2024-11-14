Feature: Verify Table contents

@Webtable
Scenario: Verify web table contents
Given the user navigates to the DemoQA page
Then user verifies category card contains correct options with working links
Then user clicks on the "<categoryCard>"
Then user validate the author "<columnValue>" of title "<rowValue>"
Examples:
| categoryCard            | columnValue |  rowValue                           |
| Book Store Application  | Addy Osmani |  Learning JavaScript Design Patterns|