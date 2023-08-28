/**
 * @author Jonas.Fournel
 * @fileOverview
 */

/**
 * @param app
 * @param mySQLPool
 */
module.exports = function (app, mySQLPool) {

    app.get(['/', '/acceuil'], (request, response) => { response.render('home'); });
    app.get(['/contact'], (request, response) => { response.render('contact'); });
    app.get(['/notre-equipe'], (request, response) => { response.render('our-team'); });
    app.get(['/nos-activites'], (request, response) => { response.render('activities'); });
    app.get(['/reservations'], (request, response) => { response.render('reservations'); });

    app.use('/back-end/equipments/:id', (request, response) => {
        const query = `SELECT * FROM \`equipments\` WHERE id=${request.params.id}`;
        console.log(`Executing Query : ${query}`);
        mySQLPool.query(query, function (error, results, fields) {
            if (error) throw error;
            response.json(results);
        });
    });

    app.use('/back-end/equipments', (request, response, next) => {
        const query = `SELECT * FROM \`equipments\``;
        console.log(`Executing Query : ${query}`);
        mySQLPool.query(query, function (error, results, fields) {
            if (error) throw error;
            response.json(results);
        });
    });
}
