export default (arr, value, key) => {
	let
		checkedValue;

	if(_.isNull(value) || _.isUndefined(value)) {
		checkedValue = {};
	} else {
		checkedValue = value;
	}

	if(key) {
		return (_.find(arr, {'id': checkedValue.id}) || {})[key] || '—';
	} else {
		return (_.find(arr, {'id': checkedValue.id}) || {});
	}
};