import * as Sequalize from "sequelize";

/*********************************************************************************/
/***************************Setup Sequelize - sqlite3*****************************/
/*********************************************************************************/
const db = new Sequalize("çonduitDatabase", "conduitadmin", "Ankita", {
  dialect: "sqlite",
  storage: __dirname + "/conduit.db"
});

/*********************************************************************************/
/****************************************Sync DB**********************************/
/*********************************************************************************/
db.sync()
  .then(() => {
    console.log("Database Synchronised");
  })
  .catch(err => {
    console.log("Error setting up Database");
    console.error(err);
  });

module.exports = db;
