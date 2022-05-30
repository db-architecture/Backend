const Sequelize = require('sequelize');

module.exports = class Cost extends Sequelize.Model {
    static init(sequelize) {
        // 속성 부분
      return super.init({
        cost_id : {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        cost_size:{
          type: Sequelize.INTEGER,
          allowNull:false,
        },
        time:{
          type: Sequelize.DATE,
          allowNull:false,
        },
    }, {
        sequelize,
        timestamps:true,
        tableName: 'cost',
        paranoid : true, // 삭제일 (복구용)
        charset: 'utf8',
        collate: 'utf8_general_ci', // 삭제일 (복구용)
      });
    }
  
    static associate(db) {
      db.Cost.belongsTo(db.Branch);
      db.Cost.belongsTo(db.CostCode);
    }
  };