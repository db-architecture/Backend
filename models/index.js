const Sequelize = require('sequelize');
const dbConfig = require("../config/config");
const Stock = require('./user');
const Stock_ = require('./roomlist');
const Chat = require('./chat');
const Token = require('./token');
const db = {};

const sequelize = new Sequelize(dbConfig.database,dbConfig.username,dbConfig.password,dbConfig);

db.sequelize = sequelize;
db.User = User;
db.RoomList = RoomList;
db.Chat = Chat;
db.Token = Token;

User.init(sequelize);
RoomList.init(sequelize);
Chat.init(sequelize);
Token.init(sequelize);

User.associate(db);
RoomList.associate(db);
Chat.associate(db);

module.exports = db;