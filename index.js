function expand(value, type, date) {

	const highestValue = {
		Seconds: 59,
		Minutes: 59,
		Hours: 23,
		Date: 31,
		Month: 12,
		Day: 6,
		FullYear: 2070
	}

	if(value.includes(',')) {
		return value.split(',').reduce(function(carry, item) {
			return carry.concat(expand(item, type))
		}, [])
	}

	if(value.includes('-')) {

		const [start, end] = value.split('-')

		var result = []

		for(var i = parseInt(start); i <= end; i++) {
			result.push(i)
		}

		return result
	}

	if(value.includes('/')) {
		var [start, step] = value.split('/')

		if(start === '*') {
			start = '0'
			if(type === 'FullYear') {
				start = 1970
			}
		}

		var result = []

		for(var i = parseInt(start); i <= highestValue[type]; i+=parseInt(step)) {
			result.push(i)
		}

		return result;
	}

	return [parseInt(value)]
}

function match(expression, date) {

	if(typeof date === 'undefined') {
		return function(date) {
			return match(expression, date)
		}
	}

	if(!(date instanceof Date)) {
		return match(expression, new Date(date))
	}


	if(Array.isArray(expression)) {
		return expression.reduce(function(carry, item) {
			return carry || match(item, date)
		}, []);
	}

	var expr = expression.split(' ')

	// Fill up to at least 5 entries
	while(expr.length < 5) {
		expr.push('*')
	}

	// 5 fields assumes "classical" cron, starting with Minutes
	if(expr.length === 5) {
		// Add year
		expr.push('*')
		// Add seconds
		expr.unshift('*')
	}

	// 6 fields assumes cron with seconds, so year is appended
	if(expr.length === 6) {
		expr.push('*')
	}




	const fields = ['Seconds', 'Minutes', 'Hours', 'Date', 'Month', 'Day', 'FullYear']

	return expr.reduce(function(carry, check, index) {
		if(check === '*') {
			return carry && true
		}
		const current = date['get' + fields[index]]() + (fields[index] === 'Month' ? 1 : 0)
		check = expand(check, fields[index], date)

		console.log(check, current)

		return carry && check.includes(current)
	}, true)
}

exports.match = match
