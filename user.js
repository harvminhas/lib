class User {
    constructor(userJson) {
        this.user = userJson;
    }
    getUserID(){
        return this.user.id;
    }
    getInitialAssetEntryDate(){
        if(! this.user.assetsEntryTs){
          return null;
        }
        return this.user.assetsEntryTs;
    }
    getInitialLiabsEntryDate(){
        if(! this.user.liabsEntryTs){
            return null;
        }
        return this.user.liabsEntryTs;
    }
}
module.exports = User
