// returns array of objects from dataArr that contain ids of objects in compArr

export default (compArr, dataArr, isText) => {
	let
		equals = [];

	_.forEach(compArr, I => equals.push(_.find(dataArr, D => I.id ? D.id === I.id : D.id === I)));

	return isText ? _.map(equals, 'value').join(', ') : equals;
};