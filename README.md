# cronmatch

cronmatch checks if a date/time is matched by a cron expression.

## Usage

The `match` method accepts two parameters:

* a cron expression
* a date (or something that can be converted to a date)

```javascript
const cronmatch = require('cronmatch')

// If the minute of the current time is divisible by 5, do something
if (cronmatch.match('*/5 * * * *', Date.now())) {
  ...
}

// Execute the following code only on a wednesday or on the 29 of February
if (cronmatch.match(['* * * * * 3 *','* * * 29 2 * *'], Date.now())) {
  ...
}
```

## Contribute

If you'd like to contribute to this project, check out our
[contribution guidelines](./CONTRIBUTING.md).

## Support

If you have any questions or concerns, get in touch with us by
[raising an issue](https://github.com/svrnm/cron-match/issues).