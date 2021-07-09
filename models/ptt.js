const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ptt', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      defaultValue: "0"
    },
    link: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    update: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ptt',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "update",
        using: "BTREE",
        fields: [
          { name: "update" },
        ]
      },
    ]
  });
};
