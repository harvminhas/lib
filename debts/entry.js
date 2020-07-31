let datetime = require('../utils/datetime');

class DebtEntry {
    constructor () {
        this.entry = {};
        this.entry.value = 0;

    }
    load(entryJson){
        this.entry = entryJson;
    }
    getID(){
        return this.entry.id;
    }
    getPayoffDate(){
        return this.entry.payoffDt;
    }
    getPayoffDateMonthYear(){
        return datetime.getMonthYear(this.entry.payoffDt);
    }
    getTimestamp(){
        return this.entry.ts;
    }
    getRate(){
        return this.entry.rate;
    }
    getMinimumPayment(){
        return this.entry.minPymt;
    }
    updateEntry(){
        // to be implemented.
    }

    getBalance(){
        return this.entry.value;
    }

    getPayOffDate(){
        //use minimum payment.
        //use interest rate.7
    }
}
module.exports = DebtEntry
