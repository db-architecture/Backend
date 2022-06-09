const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        // 속성 부분
      return super.init({
        user_id : {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        user_name:{
            type: Sequelize.STRING,
            allowNull:false,
          },
        user_pw:{
          type: Sequelize.STRING,
          allowNull:false,
        },
        type:{
          type: Sequelize.INTEGER,
          allowNull:false,
          defaultValue: 1
        },
    }, {
        sequelize,
        timestamps:true,
        tableName: 'user',
        paranoid : true, // 삭제일 (복구용)
        charset: 'utf8',
        collate: 'utf8_general_ci', // 삭제일 (복구용)
      });
    }

    static associate(db) {
      db.User.belongsTo(db.Branch,{foreignKey:'branch_id'});
      db.User.belongsTo(db.Employee,{foreignKey:'employee_id'});
    }
  };