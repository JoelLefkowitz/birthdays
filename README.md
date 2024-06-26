# Birthdays

Find whose birthdays are today from a register of people.

![Review](https://img.shields.io/github/actions/workflow/status/JoelLefkowitz/birthdays/review.yml)
![Version](https://img.shields.io/npm/v/birthdays)
![Downloads](https://img.shields.io/npm/dw/birthdays)
![Size](https://img.shields.io/bundlephobia/min/birthdays)
![Quality](https://img.shields.io/codacy/grade/11eae18873824e92a21de96b0a5c4831)
![Coverage](https://img.shields.io/codacy/coverage/11eae18873824e92a21de96b0a5c4831)

## Installing

```bash
npm install birthdays
```

## Documentation

Documentation and more detailed examples are hosted on [Github Pages](https://joellefkowitz.github.io/birthdays).

## Usage

Build the package:

```bash
yarn build
```

Call the entrypoint with a path to the register of people:

```bash
node ./dist/main.js <path>
```

```bash
main.js <path>

Find whose birthdays are today from a register of people.

Positionals:
  path  Path to the register                                            [string]

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
```

## Discussion

### Assumptions

#### Middle names

If we were to assume the rows in register are always three entries long it would make validation and parsing easier. However, in a large group there are often people with matching first and last names.

Let's allow the dataset to include a variable length of middle names:

```ts
[
  ["Doe", "John", "1982/10/08"],
  ["Wayne", "Harvey", "Steve", "Bruce", "1965/01/30"],
  ...
];
```

#### Dataset size

If the dataset were massive we would need to read it as a stream and filter it on the fly. This is not necessary in this exercise where the dataset is small enough to be kept in a file and loaded into memory as a whole. This also means the running time is far less than one day. If it ran for longer than a day there would be an issue of skipping birthdays when running the program successively.

Another edge case is the scenario of starting the program just before midnight. For consistency we should filter each person's birthday based on the same day. To ensure the program uses the same day for everyone we take the date at the start of the program as 'today'.

### Strategy

#### Validation

We want to validate the register's data before filtering it. We can validate:

- The file exists
- The register is an array
- Each row is an array of strings
- Each date has the format `yyyy/MM/dd`

It is preferable to keep the validation logic for the `Person` class away from its constructor. This keeps the class focussed on behaviours and decouples it from other object types.

#### Naming

- `Birthdate` - The day, month and year when a person was born
- `Birthday` - The day and month of a birthday in a given year

#### Libraries

To take a balanced approach to the leveraging libraries this repository uses:

- `luxon` to simplify date parsing
- `yargs` to write a cli parser
- `superstruct` for validation

We don't want to reinvent the wheel, but also don't wan't a bloated set of dependencies.

### Assignment

Given a JSON file with a list of people and their dates of birth, write a program to print out the people whose birthday is today.

If a person was born on Feb 29th, then their birthday during a non-leap year should be considered to be Feb 28th.

Input sample file:

```json
[
  ["Doe", "John", "1982/10/08"],
  ["Wayne", "Bruce", "1965/01/30"],
  ["Gaga", "Lady", "1986/03/28"],
  ["Curry", "Mark", "1988/02/29"]
]
```

You can use whichever programming language you like. The assignment should take 60 to 90 min. If it’s taking longer, consider whether you’re complicating things.

If you make any assumptions, trade-offs or de-prioritise features for timeliness, please document these decisions.

Your submission must have:

- Instructions to run the code

- Tests to check if your code is correct, robust and complete

- Edge cases handled and tested

- Iterative development, backed by commit history

- Modular, cohesive code with sensible separation of concerns

Bonus points for following Test-Driven Development.

Please do not overcomplicate the code. You don’t need a web framework, database or message queues for this submission. Keep it simple!

## Tooling

### Dependencies

To install dependencies:

```bash
yarn install
```

### Tests

To run tests:

```bash
yarn test
```

### Documentation

To generate the documentation locally:

```bash
yarn docs
```

### Linters

To run linters:

```bash
yarn lint
```

### Formatters

To run formatters:

```bash
yarn format
```

## Contributing

Please read this repository's [Code of Conduct](CODE_OF_CONDUCT.md) which outlines our collaboration standards and the [Changelog](CHANGELOG.md) for details on breaking changes that have been made.

This repository adheres to semantic versioning standards. For more information on semantic versioning visit [SemVer](https://semver.org).

Bump2version is used to version and tag changes. For example:

```bash
bump2version patch
```

### Contributors

- [Joel Lefkowitz](https://github.com/joellefkowitz) - Initial work

## Remarks

Lots of love to the open source community!

<div align='center'>
    <img width=200 height=200 src='https://media.giphy.com/media/osAcIGTSyeovPq6Xph/giphy.gif' alt='Be kind to your mind' />
    <img width=200 height=200 src='https://media.giphy.com/media/KEAAbQ5clGWJwuJuZB/giphy.gif' alt='Love each other' />
    <img width=200 height=200 src='https://media.giphy.com/media/WRWykrFkxJA6JJuTvc/giphy.gif' alt="It's ok to have a bad day" />
</div>
