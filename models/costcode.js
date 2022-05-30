const Sequelize = require('sequelize');

module.exports = class CostCode extends Sequelize.Model {
    static init(sequelize) {
        // 속성 부분
      return super.init({
        costcode : {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        costcode_name:{
            type: Sequelize.STRING(8),
            allowNull: false,
        },
    }, {
        sequelize,
        timestamps:true,
        tableName: 'costcode',
        paranoid : true, // 삭제일 (복구용)
        charset: 'utf8',
        collate: 'utf8_general_ci', // 삭제일 (복구용)
      });
    }
  
    // static associate(db) {
    //   db.Chat.belongsTo(db.RoomList);
    //   db.Chat.belongsTo(db.User);
    // }
  };