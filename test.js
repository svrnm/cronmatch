const assert = require('assert');
var cronmatch = require('./index.js')

/*var expr = "* * * * * * 2018"
var date = new Date()

console.log(cronmatch.match(expr, date))*/

// Check if missing argument returns function
assert.ok(typeof cronmatch.match('* * * * *') === 'function')

// Check if "* * * * *" matches always
assert.ok(cronmatch.match('* * * * *', Date.now()))

var date1 = new Date(2018, 6, 25, 15, 20, 25)

console.log(date1)

// Check long and short notations
assert.ok(cronmatch.match('25 20 15 25 7 3 2018', date1))
assert.ok(!cronmatch.match('25 20 15 25 7 2 2018', date1))
// short
assert.ok(cronmatch.match('20 15 25 7 *', date1))
assert.ok(!cronmatch.match('20 14 25 7 *', date1))

// Check *
assert.ok(cronmatch.match('25 20 15 25 7 3 *', date1))
assert.ok(cronmatch.match('25 20 15 25 7 * 2018', date1))
assert.ok(cronmatch.match('25 20 15 25 * 3 2018', date1))
assert.ok(cronmatch.match('25 20 15 * 7 3 2018', date1))
assert.ok(cronmatch.match('25 20 * 25 7 3 2018', date1))
assert.ok(cronmatch.match('25 * 15 25 7 3 2018', date1))
assert.ok(cronmatch.match('* 20 15 25 7 3 2018', date1))

// Check ,
var date2 = new Date(2017, 5, 24, 14, 19, 24)
assert.ok(cronmatch.match('24,25 19,20 14,15 24,25 6,7 3,6 2017,2018', date1))
assert.ok(cronmatch.match('24,25 19,20 14,15 24,25 6,7 6,3 2017,2018', date2))
assert.ok(!cronmatch.match('25,26 20,21 14,15 24,25 6,7 6,3 2017,2018', date2))

// Check -
var date3 = new Date(2016, 4, 23, 13, 18, 23)
assert.ok(cronmatch.match('23-25 18-20 13-15 23-25 5-7 1-3,6 2016-2018', date1))
assert.ok(cronmatch.match('23-25 18-20 13-15 23-25 5-7 1-3,6 2016-2018', date2))
assert.ok(cronmatch.match('23-25 18-20 13-15 23-25 5-7 1-3,6 2016-2018', date3))
assert.ok(!cronmatch.match('24-25 18-20 13-15 23-25 5-7 1-3,6 2016-2018', date3))

// Check /
assert.ok(cronmatch.match('*/5 */2 */5 */5 5/2 1/2 2000/9', date1))
assert.ok(cronmatch.match('21/2 20/1 15/5 3/11 5/2 1/2 *', date1))

// Check with array
assert.ok(!cronmatch.match('21 * * * *', date1))
assert.ok(cronmatch.match('20 * * * *', date1))
assert.ok(cronmatch.match(['20 * * * *','21 * * * *'], date1))
