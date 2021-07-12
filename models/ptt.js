const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ptt', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "序號"
    },
    uni_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    title: {
      type: DataTypes.CHAR(150),
      allowNull: false,
      defaultValue: "",
      comment: "標題"
    },
    link: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "連結"
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "",
      comment: "總類"
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "發布時間"
    },
    update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "更新時間"
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
