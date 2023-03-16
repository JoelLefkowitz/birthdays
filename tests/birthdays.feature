Feature: Find whose birthdays are today from a register of people

Scenario: Filtering a list of people to find whose birthdays are today
    Given I have a register of people
    When I filter the register to find whose birthdays are today
    Then I should get a numbered list of each person's full name

Scenario: Filtering a list of people when nobody has a birthday today
    Given I have a an empty register
    When I filter the register to find whose birthdays are today
    Then I should get a message saying nobody has a birthday today
