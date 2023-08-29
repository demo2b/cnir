
/**
 * @author Jonas.Fournel
 * @fileOverview
 */

const frJSON = require("../i18n/fr.json");

module.exports = function (i18n) {
    return {
        times: function(n, block){
            let accum = '';
            for(let i = 1; i <= n; ++i)
                accum += block.fn(i);
            return accum;
        },
        i18n: function(keyName){
            return frJSON[keyName]
        }
    }
}
