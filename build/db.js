"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sequalise = require("sequelize");
var db = new Sequalise('çonduitDatabase', 'conduitadmin', 'Ankita', {
    dialect: 'sqlite',
    storage: __dirname + '/conduit.db'
});
db.sync()
    .then(function () {
    console.log("Database Synchronised");
})
    .catch(function (err) {
    console.log("Error setting up Database");
    console.error(err);
});
module.exports = db;
//# sourceMappingURL=db.js.map