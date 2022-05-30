// const Sequelize = require('sequelize');

// module.exports = class HDeliver extends Sequelize.Model {
//     static init(sequelize) {
//         // 속성 부분
//       return super.init({
//         hdeliver_id : {
//             type: Sequelize.INTEGER,
//             primaryKey: true,
//         },
//         weight:{
//           type:Sequelize.FLOAT,
//           allowNull:false,
//         },
//         b_phone:{
//           type:Sequelize.STRING(12),
//           allowNull:false,
//         },
//         b_name:{
//           type:Sequelize.STRING(40),
//           allowNull:false,
//         },
//         s_phone:{
//           type:Sequelize.STRING(12),
//           allowNull:false,
//         },
//         s_name:{
//           type:Sequelize.STRING(40),
//           allowNull:false,
//         },
//         commision:{
//           type:Sequelize.INTEGER,
//           allowNull:false,
//         },
//         hdeliver_price:{
//           type:Sequelize.INTEGER,
//           allowNull:false,
//         },
//     }, {
//         sequelize,
//         timestamps:true,
//         tableName: 'hdeliver',
//         paranoid : true, // 삭제일 (복구용)
//         charset: 'utf8',
//         collate: 'utf8_general_ci', // 삭제일 (복구용)
//       });
//     }
  
//     static associate(db) {
//       db.HDeliver.belongsTo(db.Branch);
//     }
//   };