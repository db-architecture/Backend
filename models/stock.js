const Sequelize = require('sequelize');

module.exports = class Stock extends Sequelize.Model {
    static init(sequelize) {
        // 속성 부분
      return super.init({
        stock_id : {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        stock_name:{
          type:Sequelize.DATE,
          allowNull:false,
          defaultValue:Sequelize.literal('now()'),
        },
        stock_num:{
          type:Sequelize.INTEGER,
          allowNull:false,
        },
        stock_date:{
          type:Sequelize.DATE,
          allowNull:false,
        },
        first_cost:{
          type:Sequelize.INTEGER,
          allowNull:false,
        },
        fixed_price:{
          type:Sequelize.INTEGER,
          allowNull:false,
        },
        event_bool:{
          type:Sequelize.STRING(1),
          allowNull:false,
          defaultValue:'N',
        },
        provider:{
          type:Sequelize.STRING(20),
          allowNull:false,
        },
        auto_order_num:{
          type:Sequelize.INTEGER,
          allowNull:false,
          defaultValue:0,
        },
    }, {
        sequelize,
        timestamps:false, //createdAt, UpdatedAt 자동 추가
        tableName: 'stock',
        paranoid : true, // 삭제일 (복구용)
        charset: 'utf8',
        collate: 'utf8_general_ci', // 삭제일 (복구용)
      });
    }
  
    static associate(db) {
      db.stock.hasMany(db.Order, {foreignKey: 'stock_id', targetKey: 'stock_id', onDelete: 'cascade', onUpdate: 'cascade'})
      db.Stock.belongsTo(db.StockCode);
    }
  };