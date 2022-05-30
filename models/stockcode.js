const Sequelize = require('sequelize');

module.exports = class StockCode extends Sequelize.Model {
    static init(sequelize) {
        // 속성 부분
      return super.init({
        stockcode : {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        stockcode_name:{
            type: Sequelize.STRING(8),
            allowNull: false,
        },
    }, {
        sequelize,
        timestamps:true,
        tableName: 'stockcode',
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