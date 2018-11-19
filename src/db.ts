import * as Sequalize from 'sequelize';

const db = new Sequalize('çonduitDatabase', 'conduitadmin', 'Ankita', {
    dialect: 'sqlite',
    storage: __dirname + '/conduit.db',
    // operatorsAliases: Sequalize.Op, // use Sequelize.Op
});


db.sync()
    .then(() => {
        console.log("Database Synchronised");
    })
    .catch((err) => {
        console.log("Error setting up Database");
        console.error(err);
    });

module.exports = db;

