let datetime = require('../utils/datetime');
let DebtEntry = require('./entry');

class Debt {
    constructor () {
        this.debt = {};
        this.debt.entries = [];
        this.latestEntry = new DebtEntry();
    }
    load(debtJson){
        this.debt = debtJson;
        this.latestEntry = new DebtEntry();
        this.latestEntry.load(debtJson.latestEntry);
        this.debt.entries = [];
    }
    getID(){
        return this.debt.id;
    }
    getType(){
        return this.debt.type;
    }
    assignEntry(entryJson){
       // this.debt.entries.push(entryJson);
        let entryObj = new DebtEntry();
        entryObj.load(entryJson);
        this.debt.entries.push(entryObj);
    }

    getLatestEntry(){
        return this.latestEntry;
    }

    getCurrentValue(){
        return this.latestEntry.getBalance();
    }
    getEntryOnDate(date){
        return datetime.getObjectForDateN(this.debt.entries, date);
    }
    getValueOnDate(date){
        let value = 0;
        let entry = datetime.getObjectForDate(this.debt.entries, date);
        if(entry !== null){ //If null means this asset did not exist on that date.
            value = entry.getBalance();
        }
        return value;
    }

    /**
     * Refactor to add assets that existed on month next to first day account was created. Or a better way to know when
     * the user has finished initial entry of assets.
     * @returns {number}
     */
    getValueOnDayOne(){
        let value = 0;
        if(this.debt.entries.length > 0){
            value = this.debt.entries[0].getBalance();
        }
        return value;
    }

    getEntryOnDate(date){
        return datetime.getObjectForDate(this.debt.entries, date);
    }
    getAllUpdateDates(){
        let updateDates = new Set();
        this.debt.entries.forEach(function(entry){
            let dt = datetime.normalizeDt(entry.getTimestamp());
            updateDates.add(datetime.normalizeDt(entry.getTimestamp()));
        });
        return [...updateDates];

        /*let updateDates = [];
        this.debt.entries.forEach(function(entry){
            let dt = datetime.normalizeDt(entry.getTimestamp());
            if(updateDates.findIndex(dt) < 0){
                updateDates.push(datetime.normalizeDt(entry.getTimestamp()));
            }
        });
        return updateDates;*/
    }

    getPayOffDate(){
        //use minimum payment.
        //use interest rate.7
    }
}
module.exports = Debt
