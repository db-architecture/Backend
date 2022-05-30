const Sequelize = require('sequelize');

module.exports = class Branch extends Sequelize.Model {
    static init(sequelize) {
        // 속성 부분
      return super.init({
        branch_id : {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        branch_name:{
          allowNull:false,
        },
        branch_address:{
          type:Sequelize.STRING(60),
          allowNull:false,
        },
        business_num:{
          allowNull:false,
        },
        owner:{
          allowNull:false,
        },
        owner_num:{
          allowNull:false,
        },
        month_fee:{
          allowNull:true,
        },
    }, {
        sequelize,
        timestamps:true,
        tableName: 'branch',
        paranoid : true, // 삭제일 (복구용)
        charset: 'utf8',
        collate: 'utf8_general_ci', // 삭제일 (복구용)
      });
    }
  
    // static associate(db) {
    //   db.Branch.belongsTo(db.RegionCode);
    //   db.Buy.belongsTo(db.Stock);
    //   db.Buy.belongsTo(db.BuyCode);
    // }
  };