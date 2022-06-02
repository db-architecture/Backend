const Sequelize = require('sequelize');

module.exports = class Order extends Sequelize.Model {
    static init(sequelize) {
        // 속성 부분
      return super.init({
        order_id : {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        order_num:{
          type: Sequelize.INTEGER,
          allowNull:false,
        },
        order_cost:{
          type: Sequelize.INTEGER,
          allowNull:false,
        },
        time:{
          type: Sequelize.DATE,
          allowNull:false,
        },
        //stock_id, foreign key reference stock
        //branch_id, foreing key referece branch
    }, {
        sequelize,
        timestamps:true,
        tableName: 'order',
        paranoid : true, // 삭제일 (복구용)
        charset: 'utf8',
        collate: 'utf8_general_ci', // 삭제일 (복구용)
      });
    }
  
    static associate(db) {
      db.Order.belongsTo(db.Stock);
      db.Order.belongsTo(db.Branch);
    }
  };