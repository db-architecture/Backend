const Sequelize = require('sequelize');

module.exports = class Profit extends Sequelize.Model {
    static init(sequelize) {
        // 속성 부분
      return super.init({
        profit_id : {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        time:{
          type: Sequelize.DATE,
          allowNull:false,
        },
        day_profit:{
          type: Sequelize.INTEGER,
          allowNull:false,
        },
    }, {
        sequelize,
        timestamps:true,
        tableName: 'profit',
        paranoid : true, // 삭제일 (복구용)
        charset: 'utf8',
        collate: 'utf8_general_ci', // 삭제일 (복구용)
      });
    }
  
    static associate(db) {
      db.Profit.belongsTo(db.Branch);
      db.Profit.belongsTo(db.ProfitCode);
    }
  };