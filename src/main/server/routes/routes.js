/**
 * @author Jonas.Fournel
 * @fileOverview
 * @param app
 * @param mySQLPool
 */

const teamJsonData = require("../views/datas/our-team.json");
const activitiesJsonData = require("../views/datas/activities.json");

module.exports = function (app, mySQLPool) {

    //-------------------- VIEWS MAPPING --------------------
    app.get(['/', '/acceuil'], (request, response) => { response.render('home', { pageTitle: "Acceuil" }); });
    app.get(['/contact'], (request, response) => { response.render('contact', { pageTitle: "Contact" }); });
    app.get(['/notre-equipe'], (request, response) => { response.render('our-team', { pageTitle: "Notre Équipe", data: teamJsonData }); });
    app.get(['/reservations'], (request, response) => { response.render('reservations', { pageTitle: "Réservations" }); });
    app.get(['/nos-activites'], async (request, response) => {
        const jsonResponse = { ...activitiesJsonData };
        jsonResponse.activities = await getMySQLQueryResult(`SELECT * FROM \`equipments\` ORDER BY \`display_order\``);

        jsonResponse.activities.forEach((activity) => {
            const sqlData = activitiesJsonData.activities.find((element) => element.id === activity.id);
            if(sqlData) {
                for (const [key, value] of Object.entries(sqlData)) {
                    if(key !== 'id') activity[key] = value;
                }
            }
        })
        response.render('activities', {pageTitle: "Nos Activités", data: jsonResponse});
    });
    //-------------------------------------------------------


    //-------------------- WS MAPPING -----------------------
    app.use('/back-end/equipments/:id', async (request, response) => {
        const jsonResponse = await getMySQLQueryResult(`SELECT * FROM \`equipments\` WHERE id=${request.params.id}`);
        response.json(jsonResponse);
    });
    app.use('/back-end/equipments', async (request, response) => {
        const jsonResponse = await getMySQLQueryResult(`SELECT * FROM \`equipments\` ORDER BY \`display_order\``);
        response.json(jsonResponse);
    });
    //-------------------------------------------------------

    /**
     * @param {string} query an SQL Query representation
     * @returns {string} String result of query non-parsed
     */
    async function getMySQLQueryResult(query) {
        console.log(`Executing Query : ${query}`);
        return new Promise((resolve, reject) => {
            mySQLPool.query(query, function (error, results) {
                if (error) reject(error);
                return resolve(results);
            });
        })
    }

    /**
     * @param a
     * @param b
     * @returns {*}
     */
    function mergeObjects(a, b) {
        for (let key in b) {
            if (key in a) {
                a[key] = typeof a[key] === 'object' && typeof b[key] === 'object' ? mergeObjects(a[key], b[key]) : b[key];
            }
        }
        return a;
    }
}
