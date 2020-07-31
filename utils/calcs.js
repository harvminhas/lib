;(function(root){

	var lib = {};

	lib.version = '0.1';
	lib.getFloat2Places = function(num){		
		var ret_num = getFloat(num);		
		return getFloat(((ret_num * 100/100).toFixed(2))) ;		
	}

	getFloat = function(num) {
		var retnum = parseFloat(num);
		if(isNaN(retnum))
			return 0;
		return retnum;                        
	}
	lib.getNumber = function(nubString){
		return parseInt(nubString, 10);
	}

	lib.convertToMonthly = function(nbr, yrlOccurances){

		if(yrlOccurances == 1) {//yearly
			return Math.ceil((nbr * 1)/12);
		}else if(yrlOccurances == 2) {//every 6 months
			return Math.ceil((nbr * 2)/12);
		}else if(yrlOccurances == 52) {//weekly
			return Math.ceil((nbr * 52)/12);
		}else if(yrlOccurances == 26) {//biweekly
			return Math.ceil((nbr * 26)/12);
		}else if(yrlOccurances == 24) {//semimonthly
			return nbr * 2;
		}else if(yrlOccurances == 4) {//semimonthly
			return Math.ceil((nbr * 4)/12);
		}else if(yrlOccurances == 12) {//monthly
			return nbr;
		}else if(yrlOccurances == 365) {//monthly
			return Math.ceil((nbr * 365)/12);
		}
	}
	lib.getAUniqueNumber = function(){
		return Date.now(); //use date as a unique number
	}
	lib.getAUniqueKeyString = function(){
		return "UK" + Date.now(); //use date as a unique number
	}
	lib.getPercent = function(lastVal, currentVal){
		if(lastVal == 0 ||lastVal === undefined || currentVal === undefined){
			if(currentVal <= 0){
				return 0;
			}else{
				return 100;
			}
		}

		return (((parseFloat(currentVal) - parseFloat(lastVal))/  parseFloat(lastVal)) * 100).toFixed(3);
	}
    
	lib.getPercentOf = function(val1, val2){
		if(val1 == 0 ||val1 === undefined || val2 === undefined)
			return 0;
		return (((parseFloat(val1))/  parseFloat(val2)) * 100).toFixed(3);
	}
	
	lib.getMissingMonths = function(startDate, endDate)
	{
		var start = startDate.split('-');
		var end = endDate.split('-');
		var startYear = parseInt(start[0]);
		var endYear = parseInt(end[0]);
		var dates = [];
		for (var i = startYear; i <= endYear; i++)
		{
			var endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
			var startMon = i === startYear ? parseInt(start[1]) - 1 : 0;
			for (var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1)
			{
				var month = j + 1;
				//var displayMonth = month < 10 ? '0' + month : month;
				var displayMonth = month;
				dates.push([i, displayMonth, '01'].join('-'));
			}
		}
		return dates;
	}

	
	lib.compare_to_sort_finprofile = function(a, b) {
		if (a.firstOfMonthDt > b.firstOfMonthDt) return -1;
		if (a.firstOfMonthDt < b.firstOfMonthDt) return 1;
		return 0;
	}
	lib.compareCreditByTerms = function(a, b)
	{
		if (a.termsInMonths > b.termsInMonths) return -1;
		if (a.termsInMonths < b.termsInMonths) return 1;
		return 0;
	}
	/*
	*	Export this object globally
	*/
	
	if(typeof exports !== 'undefined'){
		if(typeof module !== 'undefined' && module.exports){
			exports = module.exports = lib;
		}
		exports.finance = lib;
	}
	else if(typeof define === 'function' && define.amd){
		define([], function(){
			return lib;
		});
	}
	else{
		root.finance = lib;
	}
	
})(this);
