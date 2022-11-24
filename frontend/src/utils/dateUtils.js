export function intToDate(n) 
{
	const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	return week[n];
}

export function arrayToDates(arr) {
	const dateArray = [];

	arr.forEach(date => dateArray.push(intToDate(date)));

	return dateArray;
}