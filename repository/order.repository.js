const model = require("../models");
const { Op } = require("sequelize");

const Order = function(order) {
    this.itemId = order.itemId;
    this.itemName = order.itemName
    this.branchNum = order.branchNum
    this.regionNum = order.regionNum
    this.itemEA = order.itemEA
    this.itemCost = order.itemCost
}

Order.createOrder = (order, results) => {
    if(order.auto){
        model.Order.create({
            order_num: order.itemEA,
            order_cost: order.itemCost,
            item_id: order.itemId,
            item_name: order.itemName,
            branchNum: order.branchNum,
            regionNum: order.regionNum, 
        })
        .then(result => {
            console.log("order create", result);
            return results(null, null);
        })
        .catch(err => {
            console.log("createOrder err", err);
            return results(err,null);
        });
    } else {
        model.Order.create({
            order_num: order.itemEA,
            order_cost: order.itemCost,
            item_id: order.itemId,
            item_name: order.itemName,
            branchNum: order.branchNum,
            regionNum: order.regionNum, 
        })
        .then(result => {
            console.log("order create", result);
            return results(null, null);
        })
        .catch(err => {
            console.log("createOrder err", err);
            return results(err,null);
        });
    }
    
}

Order.findAllOrder = (branch, results) => {
    model.Order.findAll({
        raw: true,
        where: {
            branchNum: branch.branchNum,
            regionNum: branch.regionNum
        },
        //attributes:['']
    })
    .then(result => {
        console.log("find All Orders");
        return results(null, result);
    })
    .catch(err => {
        console.log("find All Orders err", err);
        return results(err, null);
    });

}

Order.deleteOrder = (orderId, results) => {
    model.Order.destroy({
        where: {order_id: orderId},
    })
    .then(result => {
        console.log("delete Order");
        return results(null, result)
    })
    .catch(err => {
        console.lod("delete Order err", err);
        return results(err, null);
    });
}

Order.findAllNeccesaryOrder = (branch, results) => {
    model.Stock.findAll({
        raw: true,
        where: {
            stock_Num: {
                [Op.lte]: 5,
            },
        },
        //attributes:['']
    })
    .then(result => {
        console.log("find All Neccesary Orders");
        return results(null, result);
    })
    .catch(err => {
        console.log("find All Neccesary Orders err", err);
        return results(err, null);
    });
}