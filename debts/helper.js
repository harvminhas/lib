let Debt = require('./debt');
let DebtConstant = require('./constants');
let datetime = require('../utils/datetime');
class DebtsHelperSingleton {
    constructor () {
        if (!DebtsHelperSingleton.instance) {
            DebtsHelperSingleton.instance = this
        }
        return DebtsHelperSingleton.instance;
    }
    getDebts(debts, type){
        if(type === DebtConstant.DEBT_ALL){
            return debts;
        }else{
            let retObjs  = [];
            debts.forEach(function(debt){
                if(debt.getType() === type){
                    retObjs.push(debt);
                }
            });
            return retObjs;
        }
    }
    getAllUpdateDatesForType(debts, type){
        let allUpdateDates = [];
        let debtsToMatch = this.getDebts(debts, type);
        debtsToMatch.forEach(function(debt){
            allUpdateDates = allUpdateDates.concat(debt.getAllUpdateDates());
        })
        return allUpdateDates;
    }
    getAllUpdateDates(debts){
        return this.getAllUpdateDatesForType(debts, DebtConstant.DEBT_ALL);
    }

    getTotalForType(debts, type){
        let total = 0;
        let debtsToMatch = this.getDebts(debts, type);
        debtsToMatch.forEach(function(debt){
            total += debt.getCurrentValue();
        })
        return total;
    }
    getTotal(debts){
        return this.getTotalForType(debts, DebtConstant.DEBT_ALL);
    }

    getTotalOnDateForType(date, debts, type){
        let total = 0;
        let debtsToMatch = this.getDebts(debts, type);
        debtsToMatch.forEach(function(debt){
            total += debt.getValueOnDate(date);
        })
        return total;
    }
    getTotalOnDate(date, debts){
        return this.getTotalOnDateForType(date, debts, DebtConstant.DEBT_ALL);
    }

    getTotalOnDayOneForType(debts, type){
        let total = 0;
        let debtsToMatch = this.getDebts(debts, type);
        debtsToMatch.forEach(function(debt){
            total += debt.getValueOnDayOne();
        })
        return total;
    }
    getTotalOnDayOne(debts){
        return this.getTotalOnDayOneForType(debts, DebtConstant.DEBT_ALL);
    }

    getPayoffsForType(debts, type){
        let retObj = {};

        let debtsToMatch = this.getDebts(debts, type);
        console.log("DebtHelper:getPayoffsForType " + type + " / " + console.log(JSON.stringify(debtsToMatch)))
        debtsToMatch.sort(datetime.isDebtPayOffAfter);

        retObj.type = debtsToMatch[0].getType();
        retObj.payoffDt = debtsToMatch[0].getLatestEntry().getPayoffDateMonthYear();
        return retObj;
        //sort by payoff date and return the latest date.

    }
    getPayoffDate(debts){
            return this.getPayoffsForType(debts, DebtConstant.DEBT_ALL);
    }



    /****Calculations **/


}
module.exports = DebtsHelperSingleton


