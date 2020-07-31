let datetime = require('../utils/datetime');
let AssetEntry = require('./entry');
class Asset {
    constructor () {
        this.asset = {};
        this.asset.entries = [];
        this.latestEntry = new AssetEntry();
    }
    load(assetJson){
        this.asset = assetJson;
        this.latestEntry = new AssetEntry();
        this.latestEntry.load(assetJson.latestEntry);
        this.asset.entries = [];
    }

    getID(){
        return this.asset.id;
    }
    updateAsset(){
        // to be implemented.
    }
    addNewEntry(entryJson){
        //to be implemented
    }
    updateCurrentEntry(){
    }
    assignEntry(entryJson){
        this.asset.entries.push(entryJson);
    }
    assignEntry(entryJson){
        let entryObj = new AssetEntry();
        entryObj.load(entryJson);
        this.asset.entries.push(entryObj);
    }

    getCurrentEntry(){
        return this.asset.latestEntry;
    }

    getCurrentValue(){
        return this.latestEntry.getBalance();
    }
    getValueOnDate(date){
        let value = 0;
        let entry = datetime.getObjectForDate(this.asset.entries, date);
        if(entry !== null){ //If null means this asset did not exist on that date.
            value = entry.getBalance();
        }
        return value;
    }
    getEntryOnDate(date){
        return datetime.getObjectForDate(this.asset.entries, date);
    }
    /**
     * Refactor to add assets that existed on month next to first day account was created. Or a better way to know when
     * the user has finished initial entry of assets.
     * @returns {number}
     */
    getValueOnDayOne(){
        let value = 0;
        if(this.asset.entries.length > 0){
            value = this.asset.entries[0].getBalance();
        }
        return value;
    }

    getEntryOnDate(date){
        return datetime.getObjectForDate(this.asset.entries, date);
    }
    getAllUpdateDates(){
        let updateDates = new Set();
        this.asset.entries.forEach(function(entry){
            let dt = datetime.normalizeDt(entry.getTimestamp());
            updateDates.add(datetime.normalizeDt(entry.getTimestamp()));
        });
        return [...updateDates];
       /* let updateDates = [];
        this.asset.entries.forEach(function(entry){
            let dt = datetime.normalizeDt(entry.getTimestamp());
            if(updateDates.findIndex(dt) < 0){
                updateDates.push(datetime.normalizeDt(entry.getTimestamp()));
            }
        });
        return updateDates;*/
    }
}
module.exports = Asset
