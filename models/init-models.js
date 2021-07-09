var DataTypes = require("sequelize").DataTypes;
var _ptt = require("./ptt");

function initModels(sequelize) {
  var ptt = _ptt(sequelize, DataTypes);


  return {
    ptt,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
