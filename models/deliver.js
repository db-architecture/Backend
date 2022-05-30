const Sequelize = require('sequelize');

module.exports = class Deliver extends Sequelize.Model {
    static init(sequelize) {
        // 속성 부분
      return super.init({
        deliver_id : {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        weight:{
          type:Sequelize.FLOAT,
          allowNull:false,
        },
        b_phone:{
          type:Sequelize.STRING(12),
          allowNull:false,
        },
        b_address:{
          type:Sequelize.STRING(60),
          allowNull:false,
        },
        b_name:{
          type:Sequelize.STRING(40),
          allowNull:false,
        },
        s_phone:{
          type:Sequelize.STRING(12),
          allowNull:false,
        },
        s_address:{
          type:Sequelize.STRING(60),
          allowNull:false,
        },
        s_name:{
          type:Sequelize.STRING(40),
          allowNull:false,
        },
        commision:{
          type:Sequelize.INTEGER,
          allowNull:false,
        },
        deliver_price:{
          type:Sequelize.INTEGER,
          allowNull:false,
        },
    }, {
        sequelize,
        timestamps:true,
        tableName: 'deliver',
        paranoid : true, // 삭제일 (복구용)
        charset: 'utf8',
        collate: 'utf8_general_ci', // 삭제일 (복구용)
      });
    }
  
    static associate(db) {
      db.Deliver.belongsTo(db.Branch);
    }
  };