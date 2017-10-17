export default (arr1, arr2, comparator) => {
	let
		unique = [];

	unique = _.concat(unique, arr1);
	
	_.forEach(arr2, I => {
		if(!_.find(arr1, O => O[comparator] === I[comparator]))
			unique.push(I)
	});

	return unique;
};