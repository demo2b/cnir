/**
 * @author Jonas.Fournel
 * @fileOverview
 */
module.exports = {
    times: function(n, block){
        let accum = '';
        for(let i = 1; i <= n; ++i)
            accum += block.fn(i);
        return accum;
    }
}
