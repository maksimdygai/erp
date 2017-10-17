// returns array of objects with key-value pairs picked by key name from initial array

export default (arr, key) => {
	let
		results = [];

	_.forEach(arr, O => results.push({[key]: O[key]}));

	return results;
};