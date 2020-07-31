let DebtsSingleton = require('./debts/debts');
let AssetsSingleton = require('./assets/assets');

class NetworthSingleton {
    constructor() {
        if (!NetworthSingleton.instance) {
            NetworthSingleton.instance = this
        }
        return NetworthSingleton.instance;
    }

    load(assets, debts) {
        this.assets = assets;
        this.debts = debts;
    }
    getCurrentNetworth(){
        return this.assets.getTotal() - this.debts.getTotal()
    }
    getCurrentAssetsTotal(){
        return this.assets.getTotal();
    }
    getCurrentDebtsTotal(){
        return this.debts.getTotal();
    }
    getAllUpdateDates() {
        let updateDates = new Set();

        this.assets.getAllUpdateDates().forEach(function(dt){
            updateDates.add(dt);
        });
        this.debts.getAllUpdateDates().forEach(function(dt){
            updateDates.add(dt);
        })
        /*updateDates = updateDates.concat(this.assets.getAllUpdateDates());
        updateDates = updateDates.concat(this.debts.getAllUpdateDates());

        return [...updateDates];

        let updateDates = new Set([ this.assets.getAllUpdateDates(), this.debts.getAllUpdateDates() ]);*/
        return [...updateDates];
    }

    getOverview() {
        let previous = [];
        let self = this;
        this.getAllUpdateDates().forEach(function (updateDt) {
                let assetT = self.assets.getTotalOnDate(updateDt);
                let debtT = self.debts.getTotalOnDate(updateDt);
                previous.push(
                    {
                        date: updateDt,
                        networth: assetT - debtT,
                        assets: assetT,
                        debts: debtT
                    }
                )
            }
        )
        return {
            current: {
                networth: this.getCurrentNetworth(),
                assets: this.assets.getTotal(),
                debts: this.debts.getTotal(),
            },
            previous: previous
        };
    }

    getNetworthGrowth() {
        return '1/1/2020';
    }

}

module.exports = NetworthSingleton
