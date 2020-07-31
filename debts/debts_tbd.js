let Debt = require('./debt');
let DebtConstant = require('./constants');
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
      let allUpdateDates = [];
      this.getDebts().forEach(function(debt){
          allUpdateDates = allUpdateDates.concat(debt.getAllUpdateDates());
      });

      return allUpdateDates;
    }
    getTotal(){
        let total = 0;
        this.debts.forEach(function(debt){
            total += debt.getCurrentValue();
        })
        return total;
    }
    getTotalOnDate(date){
        let total = 0;
        this.debts.forEach(function(debt){
            total += debt.getValueOnDate(date);
        })
        return total;
    }

    getTotalOnDayOne(){
        let total = 0;
        this.debts.forEach(function(debt){
            total += debt.getValueOnDayOne();
        })
        return total;
    }

    getJson(){
        return this.debts;
    }

    getDebtsOfType(type){
        let retObjs  = [];
        this.debts.forEach(function(debt){
            if(debt.getType() === type){
                retObjs.push(debt);
            }
        });
        return retObjs;
    }
    /****Calculations **/
    getPayoffDateForType(type){
        let ccDebts = this.getDebtsOfType(DebtConstant.DEBT_CREDIT_CARDS_TYPE);

    }
    getCreditCardsPayoffDate(){

    }

}
module.exports = DebtsSingleton
