var moment = require('./moment');

;(function (root) {

    var lib = {};

    lib.version = '0.1';


/*    lib.getObjectForDate = function(jsonArray, date){
        const inputDt = moment(date, 'YYYY-MM-DD');
        //Gives a value on the date provided.
        let prevEntry = null //keep copy if needed to return;
        jsonArray.forEach(function(entry){
            let entryTs = moment(entry.ts, 'YYYY-MM-DD');
            if(entryTs.isAfter(inputDt)){
                return prevEntry;
            }else {
                prevEntry = entry;
            }
        })
        return prevEntry; //if nothing found than return null
    }*/

    lib.getObjectForDate = function(jsonArray, date){
        const inputDt = moment(date, 'YYYY-MM-DD');
        //Gives a value on the date provided.
        let prevEntry = null //keep copy if needed to return;
        jsonArray.forEach(function(entry){

            let entryTs = moment(entry.getTimestamp(), 'YYYY-MM-DD');
            if(entryTs.isAfter(inputDt)){
                return prevEntry;
            }else {
                prevEntry = entry;
            }
        })
        console.log("datetimeJS:getObjectForDate entry for date: " + date  + " is " + JSON.stringify(prevEntry));
        return prevEntry; //if nothing found than return null
    }


    /****************Previouse ************/

    lib.getCurrentDateStr = function () {
        var date = new Date();
        var syear = date.getFullYear() + "";
        var smonth = date.getMonth() + 1;
        return syear + "-" + smonth + "-01";
    }
    lib.getCurrentTS = function () {
        return moment().format();

    }
    lib.getMonth = function(dateStr){
        return moment(dateStr).format('M');
    }
    lib.getPaymentDatesForMonth = function (startDate, forMonth, forYear, freq) {
        var datesForMonth = [];
        const startDateMoment = moment(startDate, 'YYYY-MM-DD');

        var startofmthdt = moment(forYear + '-' + forMonth + '-' + '01', 'YYYY-MM-DD');
        var endofmthdt = moment(forYear + '-' + forMonth + '-' + '01', 'YYYY-MM-DD').add(1, "months");

        if (startDateMoment.isSame(startofmthdt, "month")) {
            var monthDenormalized = parseInt(startDateMoment.month()) + 1;
            var dtStr = startDateMoment.year() + "-" + monthDenormalized + "-" + startDateMoment.date();
            datesForMonth.push(dtStr);
        }

        getNextDate(startDateMoment, freq);

        do {
            if (startDateMoment.isSame(startofmthdt, "month")) {
                var monthDenormalized = parseInt(startDateMoment.month()) + 1;
                datesForMonth.push(startDateMoment.year() + "-" + monthDenormalized + "-" + startDateMoment.date());
            }
            getNextDate(startDateMoment, freq);
        } while (startDateMoment.isBefore(endofmthdt));
        return datesForMonth;

    }
    lib.replacePaymentDatesForMonth = function (exisingDts, startDate, forMonth, forYear, freq) {
        forMonth++;

        var datesForMonth = [];
        const startDateMoment = moment(startDate, 'YYYY-MM-DD');

        //clear furture dates including today.
        const todayDt = moment();
        while (todayDt.isSame(startDateMoment, "month")) {
            var monthDenormalized = parseInt(todayDt.month()) + 1;
            var dtStr = todayDt.year() + "-" + monthDenormalized + "-" + todayDt.date();
            var index = exisingDts.indexOf(dtStr);
            if (index !== -1) exisingDts.splice(index, 1);
            todayDt.add(1, "days")
        }

        var startofmthdt = moment(forYear + '-' + forMonth + '-' + '01', 'YYYY-MM-DD');
        var endofmthdt = moment(forYear + '-' + forMonth + '-' + '01', 'YYYY-MM-DD').add(1, "months");

        if (startDateMoment.isSame(startofmthdt, "month")) {
            var monthDenormalized = parseInt(startDateMoment.month()) + 1;
            var dtStr = startDateMoment.year() + "-" + monthDenormalized + "-" + startDateMoment.date();
            exisingDts.push(dtStr);
        }

        getNextDate(startDateMoment, freq);

        do {
            if (startDateMoment.isSame(startofmthdt, "month")) {
                var monthDenormalized = parseInt(startDateMoment.month()) + 1;
                exisingDts.push(startDateMoment.year() + "-" + monthDenormalized + "-" + startDateMoment.date());
            }
            getNextDate(startDateMoment, freq);
        } while (startDateMoment.isBefore(endofmthdt));
        return exisingDts;

    }
    lib.stopPaymentsFromToday = function (exisingDts, startDate) {

        var datesForMonth = [];
        const startDateMoment = moment(startDate, 'YYYY-MM-DD');

        //clear furture dates including today.
        const todayDt = moment();
        for (i = 0; i < exisingDts.length; i++) {
            var existingDt = moment(exisingDts[i].date, 'YYYY-MM-DD');
            if (existingDt.isBefore(todayDt)) {
                // exisingDts.splice(i, 1);
                datesForMonth.push(exisingDts[i]);
            }
        }

        return datesForMonth;

    }

    lib.getDatesFromNextDate = function (nextDate, forMonth, forYear, freq) {
        var datesForMonth = [];

        //const nextDateMoment = moment(nextDate, 'MM/DD/YYYY');
        const nextDateMoment = moment(moment(nextDate).format('YYYY-MM-DD'), 'YYYY-MM-DD');

        //get today's date
        const todayDt = moment();

        var startofmthdt = moment(forYear + '-' + forMonth + '-' + '01', 'YYYY-MM-DD');
        // var endofmthdt = moment(forYear + '-' + forMonth + '-' + '01', 'YYYY-MM-DD').add(1, "months");

        if (nextDateMoment.isSame(startofmthdt, "month")) {
            var monthDenormalized = parseInt(nextDateMoment.month()) + 1;
            var dtStr = nextDateMoment.year() + "-" + monthDenormalized + "-" + nextDateMoment.date();
            datesForMonth.push({
                'date': dtStr
                //,'pymt': expAmt
            });
        }

        getPreviousDate(nextDateMoment, freq);

        do {
            if (nextDateMoment.isSame(startofmthdt, "month")) {
                var monthDenormalized = parseInt(nextDateMoment.month()) + 1;
                datesForMonth.push({
                    'date': nextDateMoment.year() + "-" + monthDenormalized + "-" + nextDateMoment.date()
                    //,'pymt': expAmt
                });
            }
            getPreviousDate(nextDateMoment, freq);
        } while (nextDateMoment.isAfter(startofmthdt) || nextDateMoment.isSame(startofmthdt, "date"));
        return datesForMonth;

    }

    lib.replacePaymentDatesAndAmtForMonth = function (exisingDts, expAmt, startDate, forMonth, forYear, freq) {
        //forMonth++;

        var datesForMonth = [];
        const startDateMoment = moment(startDate, 'YYYY-MM-DD');

        //clear furture dates including today.
        const todayDt = moment();
        for (i = 0; i < exisingDts.length; i++) {
            var existingDt = moment(exisingDts[i].date, 'YYYY-MM-DD');
            if (existingDt.isBefore(todayDt)) {
                datesForMonth.push(exisingDts[i]);
            }
        }
        var startofmthdt = moment(forYear + '-' + forMonth + '-' + '01', 'YYYY-MM-DD');
        var endofmthdt = moment(forYear + '-' + forMonth + '-' + '01', 'YYYY-MM-DD').add(1, "months");

        if (startDateMoment.isSame(startofmthdt, "month")) {
            var monthDenormalized = parseInt(startDateMoment.month()) + 1;
            var dtStr = startDateMoment.year() + "-" + monthDenormalized + "-" + startDateMoment.date();
            datesForMonth.push({
                'date': dtStr
                //, 'pymt': expAmt
            });
        }

        getNextDate(startDateMoment, freq);

        do {
            if (startDateMoment.isSame(startofmthdt, "month")) {
                var monthDenormalized = parseInt(startDateMoment.month()) + 1;
                //exisingDts.push(startDateMoment.year() + "-" + monthDenormalized + "-" + startDateMoment.date());
                datesForMonth.push({
                    'date': startDateMoment.year() + "-" + monthDenormalized + "-" + startDateMoment.date()
                    //,'pymt': expAmt
                });
            }
            getNextDate(startDateMoment, freq);
        } while (startDateMoment.isBefore(endofmthdt));
        return datesForMonth;

    }
    lib.getPymtDatesForMonth = function (startDate, forMonth, forYear, freq) {
        //forMonth++;

        var datesForMonth = [];
        const startDateMoment = moment(startDate);

        //clear furture dates including today.
        /*const todayDt = moment();
        for (i = 0; i < exisingDts.length; i++) {
            var existingDt = moment(exisingDts[i].date, 'YYYY-MM-DD');
            if (existingDt.isBefore(todayDt)) {
                datesForMonth.push(exisingDts[i]);
            }
        }*/
        var startofmthdt = moment(forYear + '-' + forMonth + '-' + '01', 'YYYY-MM-DD');
        var endofmthdt = moment(forYear + '-' + forMonth + '-' + '01', 'YYYY-MM-DD').add(1, "months");

        if (startDateMoment.isSame(startofmthdt, "month")) {
            var monthDenormalized = parseInt(startDateMoment.month()) + 1;
            var dtStr = startDateMoment.year() + "-" + monthDenormalized + "-" + startDateMoment.date();
            datesForMonth.push(dtStr);
        }

        getNextDate(startDateMoment, freq);

        do {
            if (startDateMoment.isSame(startofmthdt, "month")) {
                var monthDenormalized = parseInt(startDateMoment.month()) + 1;
                //exisingDts.push(startDateMoment.year() + "-" + monthDenormalized + "-" + startDateMoment.date());
                datesForMonth.push(startDateMoment.year() + "-" + monthDenormalized + "-" + startDateMoment.date()
                    );
            }
            getNextDate(startDateMoment, freq);
        } while (startDateMoment.isBefore(endofmthdt));
        return datesForMonth;

    }
    lib.nextDate = function (startDate, forMonth, forYear, freq) {
        var nextDt = null;
        const startDateMoment = moment(startDate, 'YYYY-MM-DD');

        var todayDt = moment();
        do {
            if (startDateMoment.isAfter(todayDt, "date")) {
                nextDt = startDateMoment.format('YYYY-MM-DD');
            }
            getNextDate(startDateMoment, freq);
        } while (nextDt == null);
        return nextDt;

    }
    lib.normalizeDt = function (dateStr) {
        //dateStr is mm/dd/yyyy
        return moment(dateStr).format('YYYY-MM-DD')
    }

    lib.getMissingMonths = function (startDate, endDate) {
        var start = startDate.split('-');
        var end = endDate.split('-');
        var startYear = parseInt(start[0]);
        var endYear = parseInt(end[0]);
        var dates = [];
        for (var i = startYear; i <= endYear; i++) {
            var endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
            var startMon = i === startYear ? parseInt(start[1]) - 1 : 0;
            for (var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
                var month = j + 1;
                //var displayMonth = month < 10 ? '0' + month : month;
                var displayMonth = month;
                dates.push([i, displayMonth, '01'].join('-'));
            }
        }
        return dates;
    }
    lib.getNextDate = function (currDate, freq) {
        return getNextDate(currDate, freq)
    }
    lib.getNextDateStr = function (currDateStr, freq) {
        var currDateMoment = moment(currDateStr);
        getNextDate(currDateMoment, freq);
        return currDateMoment.format("YYYY-MM-DD");
    }

    function getNextDate(currDate, freq) {
        if (freq == 1) { //yearly
            currDate.add(1, "years");
        } else if (freq == 12) { //monthly
            currDate.add(1, "months");
        }
        if (freq == 26) { //biweekly
            currDate.add(14, "days");
        }
        if (freq == 52) { //weekly
            currDate.add(7, "days");
        }
        if (freq == 365) { //daily
            currDate.add(1, "days");
        }
        if (freq == 4) { //quarterly
            currDate.add(3, "months");
        }
        if (freq == 2) { //twice a year
            currDate.add(6, "months");
        }
    }

    function getPreviousDate(currDate, freq) {
        if (freq == 1) { //yearly
            currDate.subtract(1, "years");
        } else if (freq == 12) { //monthly
            currDate.subtract(1, "months");
        }
        if (freq == 26) { //biweekly
            currDate.subtract(14, "days");
        }
        if (freq == 52) { //weekly
            currDate.subtract(7, "days");
        }
        if (freq == 365) { //daily
            currDate.subtract(1, "days");
        }
        if (freq == 4) { //quarterly
            currDate.subtract(3, "months");
        }
        if (freq == 2) { //twice a year
            currDate.subtract(6, "months");
        }
    }

    lib.getCurrentMonth = function () {
        return moment().month() + 1;
    }
    lib.getCurrentYear = function () {
        return moment().year();
    }
    lib.getTimestamp = function () {
        return new Date().getTime();
    }
    lib.formatMonth = function (month) {
        return month < 10 ? '0' + month : '' + month;
    }

   lib.setDefaultXnsStartDt = function(firstEndDt){
       return moment(firstEndDt).subtract(1, "year");
   }
    lib.addADay = function(firstEndDt){
        return moment(firstEndDt).subtract(1, "date");
    }
    //compare objects
    lib.compareDate = function (a, b) { //compare objects by date e.g a.date
        const aDt = moment(a, "");
        const bDt = moment(b, "");
        if (aDt.isSame(bDt)) {
            return 0;
        } else if (aDt.isBefore(bDt)) {
            return -1;
        } else {
            return 1;
        }
        return aDt.isBefore(bDt);

    }
    lib.compareDateReverse = function (a, b) { //compare objects by date e.g a.date
        const aDt = moment(a, "");
        const bDt = moment(b, "");
        if (aDt.isSame(bDt)) {
            return 0;
        } else if (aDt.isBefore(bDt)) {
            return 1;
        } else {
            return -1;
        }
        //return aDt.isAfter(bDt);

    }
    lib.isBetween = function(checkDt, startDt, endDt){
        return moment(checkDt).isBetween(moment(startDt), moment(endDt));
    }
    lib.isBeforeToday = function (date) {
        return moment(date).isBefore(moment());
        /*return moment(date, "YYYY-MM-DD").isBefore(moment());*/
    }
    lib.isAfter = function( compareToDt, dt){
        return moment(dt).isAfter(compareToDt);
    }
    lib.isToday = function (date) {
        if (moment(date, "YYYY-MM-DD").isSame(moment(), 'day')) {
            return 0
        } else if (moment(date, "YYYY-MM-DD").isBefore(moment())) {
            return -1
        } else {
            return 1;
        }
    }
    lib.isThisMonth  = function(date, month){
       return moment(date).format('M') == month;
    }
    lib.getNextPaymentDate = function (pymtFreq) {
        var retObj = {};

        var today = moment(); //now or change to any date
        retObj.startDt = today.format("YYYY-MM-DD"); //default for daily
        retObj.endDt = today.format("YYYY-MM-DD");//default for daily
        //starting date is first of the year.
        //if pymtfreq is 52 or 26 then next pymt date will be next Sunday or one after that.

        if(pymtFreq == 12){
            retObj.startDt = today.format("YYYY") + "-" +today.format("MM") + "-1";
            retObj.endDt = today.endOf('month').format("YYYY-MM-DD");
        }
        else if (pymtFreq == 52 || pymtFreq == 26) {
            //get date for next Sunday.
            var weekDayToFind = moment().day('Sunday').weekday(); //change to searched day name
            while (today.weekday() !== weekDayToFind) {
                today.add(1, 'day');

            }
            retObj.endDt = today.format("YYYY-MM-DD");
            retObj.startDt = today.subtract(6, 'day').format("YYYY-MM-DD");
            if (pymtFreq == 26) {
                today.add(1, "week");
                retObj.endDt = today.format("YYYY-MM-DD");
                retObj.startDt = today.subtract(7, 'day').format("YYYY-MM-DD");
            }
        } else if (pymtFreq == 1) { //Every year
            retObj.endDt = today.format("YYYY") + "-12-31";
            retObj.startDt = today.format("YYYY") + "-1-1";
        } else if (pymtFreq == 2) { //Every 6 months
            var halfyear = moment(today.format("YYYY") + "-6-30");
            if (today.isBefore(halfyear)) {
                retObj.startDt = halfyear.format("YYYY") + "-1-1";
                retObj.endDt = halfyear.format("YYYY") + "-6-30";
            } else {
                retObj.startDt = today.format("YYYY") + "-7-1";
                retObj.endDt = today.format("YYYY") + "-12-31";
            }
            // return today.format("YYYY") + "-12-31";
        } else if (pymtFreq == 4) { //Evert qyarter
            var quarter = moment(today.format("YYYY") + "-3-31");
            if (today.isBefore(quarter)) {
                retObj.startDt = today.format("YYYY") + "-1-1";
                retObj.endDt = today.format("YYYY") + "-3-31";
            } else {
                quarter = moment(today.format("YYYY") + "-6-30");
                if (today.isBefore(quarter)) {

                    retObj.startDt = today.format("YYYY") + "-4-1";
                    retObj.endDt = today.format("YYYY") + "-6-30";
                } else {
                    quarter = moment(today.format("YYYY") + "-9-30");
                    if (today.isBefore(quarter)) {

                        retObj.startDt = today.format("YYYY") + "-7-1";
                        retObj.endDt = today.format("YYYY") + "-9-30";
                    } else {
                        retObj.startDt = today.format("YYYY") + "-10-1";
                        retObj.endDt = today.format("YYYY") + "-12-31";
                    }
                }

            }
        }

        //add pymtfreq till you get a date after today.
        //return today.format('YYYY-MM-DD');
        return retObj;
    }
    lib.isTodayPartOfPeriod = function(periodEndDt, periodStartDt ){
        var inRange = false;
        var periodEndDtMoment = moment(periodEndDt);
        var periodStartDtMoment = moment(periodStartDt);
        var checkDateMoment = moment();
        if(periodStartDt === undefined){
            //retDtRange.start  Dt =  periodEndDtMoment.subtract(1, "year");
            //retDtRange.endDt = periodEndDt;
            if(checkDateMoment.isBefore(periodEndDtMoment)){
                return true
            }
        }else {
            if(checkDateMoment.isBefore(periodEndDtMoment) && checkDateMoment.isAfter(periodStartDtMoment)){
                return true
            }
        }
        return false;
    }
    lib.isPartOfPeriod = function(checkDate, periodEndDt, periodStartDt ){
        var inRange = false;
        var periodEndDtMoment = moment(periodEndDt);
        var periodStartDtMoment = moment(periodStartDt);
        var checkDateMoment = moment(checkDate);
        if(periodStartDt === undefined){
            //retDtRange.start  Dt =  periodEndDtMoment.subtract(1, "year");
            //retDtRange.endDt = periodEndDt;
            if(checkDateMoment.isBefore(periodEndDtMoment)){
                return true
            }
        }else {
            if(checkDateMoment.isBefore(periodEndDtMoment) && checkDateMoment.isAfter(periodStartDtMoment)){
                return true
            }
        }
        return false;
    }

    lib.isDebtPayOffAfter = function( debt1, debt2){
        return moment(debt2.getLatestEntry().getPayoffDate()).isAfter(debt1.getLatestEntry().getPayoffDate());
    }

    lib.getMonthYear = function(dateStr){
        var check = moment(dateStr);

        var month = check.format('MM');
        var year  = check.format('YYYY');

        return month + "/" + year;
    }
    /*
    *	Export this object globally
    */

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = lib;
        }
        exports.finance = lib;
    } else if (typeof define === 'function' && define.amd) {
        define([], function () {
            return lib;
        });
    } else {
        root.finance = lib;
    }

})(this);
