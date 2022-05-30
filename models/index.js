const Sequelize = require('sequelize');
const dbConfig = require("../config/config");
const Stock = require('./stock');
const UStock = require('./ustock');
const Buy = require('./buy');
const Branch= require('./branch');
const Deliver = require('./deliver');
const HDeliver= require('./hdeliver');
const Profit = require('./profit');
const Cost = require('./cost');
const Order = require('./order');
const Employee = require('./employee');
const Commute = require('./commute');
const Event = require('./event');
const BuyCode = require('./buycode');
const StockCode = require('./stockcode');
const ProfitCode = require('./profitcode');
const CostCode = require('./costcode');
const RegionCode = require('./regioncode');
const EventCode = require('./eventcode');
const db = {};

// dba, root, admin
const sequelize = new Sequelize(dbConfig.database,dbConfig.username,dbConfig.password,dbConfig);

// db dictionary에 삽입
db.sequelize = sequelize;
db.Stock = Stock;
db.UStock = UStock;
db.Buy = Buy;
db.Branch= Branch;
db.Deliver = Deliver;
db.HDeliver= HDeliver;
db.Profit = Profit;
db.Cost = Cost;
db.Order = Order;
db.Employee = Employee;
db.Commute = Commute;
db.Event = Event;
db.BuyCode = BuyCode;
db.StockCode = StockCode;
db.ProfitCode = ProfitCode;
db.CostCode = CostCode;
db.RegionCode = RegionCode;
db.EventCode = EventCode;

Stock.init(sequelize);
UStock.init(sequelize);
Buy.init(sequelize);
Branch.init(sequelize);
Deliver.init(sequelize);
HDeliver.init(sequelize);
Profit.init(sequelize);
Cost.init(sequelize);
Order.init(sequelize);
Employee.init(sequelize);
Commute.init(sequelize);
Event.init(sequelize); 
BuyCode.init(sequelize); 
StockCode.init(sequelize); 
ProfitCode.init(sequelize); 
CostCode.init(sequelize); 
RegionCode.init(sequelize); 
EventCode.init(sequelize);

Stock.associate(db);
UStock.associate(db);
Buy.associate(db);
Deliver.associate(db);
HDeliver.associate(db);
Profit.associate(db);
Cost.associate(db);
Order.associate(db);
Employee.associate(db);
Commute.associate(db);
Event.associate(db);

module.exports = db;