export default item => {
	if(item && item.first_name && item.last_name) {
		return `${_.get(item, 'first_name')} ${_.get(item, 'last_name')}`;
	} else {
		return '—'
	}
};
