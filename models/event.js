const Sequelize = require('sequelize');

module.exports = class Event extends Sequelize.Model {
    static init(sequelize) {
        // 속성 부분
      return super.init({
        id : {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        startdate:{
          type:Sequelize.DATE,
          allowNull:false,
          defaultValue:Sequelize.literal('now()'),
        },
        enddate:{
          type:Sequelize.DATE,
          allowNull:false,
        },
        disrate:{
          type:Sequelize.INTEGER,
          allowNull:true,
        },
        disprice:{
          type:Sequelize.INTEGER,
          allowNull:true,
        },
    }, {
        sequelize,
        timestamps:false, //createdAt, UpdatedAt 자동 추가
        tableName: 'event',
        paranoid : true, // 삭제일 (복구용)
        charset: 'utf8',
        collate: 'utf8_general_ci', // 삭제일 (복구용)
      });
    }
  
    static associate(db) {
      db.Event.belongsTo(db.EventCode);
      db.Event.belongsTo(db.Stock);
    }
  };