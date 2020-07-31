let datetime = require('../utils/datetime');

class AssetEntry {
    constructor () {
        this.entry = {};
        return this.entry.value = 0;
    }
    load(entryJson){
        this.entry = entryJson;
    }
    getID(){
        return this.entry.id;
    }
    getTimestamp(){
        return this.entry.ts;
    }
    getRate(){
        return this.debt.rate;
    }

    updateEntry(){
        // to be implemented.
    }

    getBalance(){
        return this.entry.value;
    }

}
module.exports = AssetEntry
