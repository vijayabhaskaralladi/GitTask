Feature: Add/Remove products

  Scenario Outline: Verify Login
    Given Login to Saucelab with "<UserName>" and "<Password>"
    Then Verify Add and Remove Products to Cart
    And  Add  Products to Cart and checkout
    Then Checkout for "<FirstName>" and "<LastName>" and "<Zipcode>"
    And Logout SauceLab

    Examples:
      | UserName                | Password     | FirstName  | LastName  | Zipcode  |
      | standard_user           | secret_sauce | vijay      | bhaskar   | 516360   |
      | performance_glitch_user | secret_sauce | vijay      | bhaskar   | 516360   |

