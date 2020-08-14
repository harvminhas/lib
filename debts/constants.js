;(function (root) {

    var lib = {};

    lib.version = '0.1';

    lib.DEBT_ALL = 'all';
    lib.DEBT_CREDIT_CARDS_TYPE = 'creditcards';
    lib.DEBT_MORTGAGES_TYPE = 'mortgages';


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
