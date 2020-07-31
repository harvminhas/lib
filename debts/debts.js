let Debt = require('./debt');
let DebtConstant = require('./constants');
let DebtHelper = require('./helper');
class DebtsSingleton {
    constructor () {
        if (!DebtsSingleton.instance) {
            DebtsSingleton.instance = this
        }
        return DebtsSingleton.instance;
    }

    load(data){
        this.debts = [];
        let self = this;
        data.forEach(function(debt){
            let debtObj = new Debt();
            debtObj.load(debt);
            self.debts.push(debtObj);
        })
    }
    loadEntries(entries){
        if(!entries){
            return;
        }
        let self = this;
        entries.forEach(function(entry){
            let obj = self.debts.find(obj => obj.getID() === entry.liabid);
            if(obj){
                obj.assignEntry(entry);
            }
        })
    }
    addDebt(){
        // To be implemented
    }
    getDebts(){
        return this.debts;
    }

    getNonMortgagePayOffDate(){

    }
    getMortgagePayOffDate(){

    }
    // All Date functions
    getInitialEntryDate(){
        return '1/1/2020';
    }

    getAllUpdateDates(){
        let helper = new DebtHelper();
        return helper.getAllUpdateDates(this.debts);
    }

    getTotal(){
        let helper = new DebtHelper();
        return helper.getTotal(this.debts);
    }
    getTotalOnDate(date){
        let helper = new DebtHelper();
        return helper.getTotalOnDate(date, this.debts);
    }

    getTotalOnDayOne(){
        let helper = new DebtHelper();
        return helper.getTotalOnDayOne(this.debts);
    }
    getCreditCardsPayoff(){
        let retObj = {};
        let helper = new DebtHelper();
        return helper.getPayoffsForType(this.debts, DebtConstant.DEBT_CREDIT_CARDS_TYPE);

    }
    getMortgagesPayoff(){
        let retObj = {};
        let helper = new DebtHelper();
        return helper.getPayoffsForType(this.debts, DebtConstant.DEBT_MORTGAGES_TYPE);

    }
    getJson(){
        return this.debts;
    }



}
module.exports = DebtsSingleton
