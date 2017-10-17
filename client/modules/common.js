module.exports = {
	numberFormat: function(str){
		var num = parseFloat(str);
		return num.toFixed(2);
	},
	dateFormat: function(date){
		var arDate = date.split('-');
		return arDate[2] + '.' + arDate[1] + '.' + arDate[0];
	},
	getTypeCaption: function(type){
		switch(type){
			case 'doc_platpor':
				return 'ПП';
			default: 
				return '';
		}
	}
}