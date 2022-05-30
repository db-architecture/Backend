const Sequelize = require('sequelize');

module.exports = class UStock extends Sequelize.Model {
    static init(sequelize) {
        // 속성 부분
      return super.init({
        ustock_id : {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        expiry_date:{
          type:Sequelize.DATE,
          allowNull:false,
        },
        disposal_cost:{
          type:Sequelize.INTEGER,
          allowNull:false,
        },
    }, {
        sequelize,
        timestamps:false, //createdAt, UpdatedAt 자동 추가
        tableName: 'ustock',
        paranoid : true, // 삭제일 (복구용)
        charset: 'utf8',
        collate: 'utf8_general_ci', // 삭제일 (복구용)
      });
    }
  
    static associate(db) {
      db.UStock.belongsTo(db.Stock);
    }
  };