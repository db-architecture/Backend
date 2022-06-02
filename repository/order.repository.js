const model = require("../models");
const { Op } = require("sequelize");

const Order = function(order) {
    this.order_num = order.order_num;
    this.order_cost = order.order_cost;
    this.stock_id = order.stock_id;
    this.branch_id = order.branch_id;
}

Order.createOrder = (order, results) => {
    //stock getPrice(id)필요
    const cost = model.Stock.findOne({
        where:{
            stock_id: order.stock_id,
        },
        attributes:['fixed_price']
    }).catch(err => {
        console.log("createOrder getPrice err", err);
        return;
    });

    model.Order.create({
        order_num: order.order_num,
        order_cost: order.order_num * cost,
        stock_id: order.stock_id,
        branch_id: order.branchId,
    })
    .then(result => {
        console.log("order is created", result);
        return results(null, result);
    })
    .catch(err => {
        console.log("createOrder err", err);
        return results(err,null);
    });
}

Order.createNeccesaryOrder = (order, results) => {
    model.Order.create({
        order_num: order.order_num,
        order_cost: order.order_cost,
        stock_id: order.stock_id,
        branch_id: order.branchId,
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

Order.findAllOrder = (branch, results) => {
    model.Order.findAll({
        raw: true,
        where: {
            branch_id: branch.branch_id,
        },
        //attributes:['']
    })
    .then(result => {
        console.log("find All Orders");
        return results(null, result);
    })
    .catch(err => {
        console.log("findAllOrders err", err);
        return results(err, null);
    });

}

Order.deleteOrder = (orderId, results) => {
    model.Order.destroy({
        where: {order_id: orderId},
    })
    .then(result => {
        console.log("Order is deleted");
        return results(null, result)
    })
    .catch(err => {
        console.lod("deleteOrder err", err);
        return results(err, null);
    });
}

Order.findAllNeccesaryOrder = (results) => {
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