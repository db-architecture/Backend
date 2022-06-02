const model = require("../models");
const { Op } = require("sequelize");
const moment = require("moment");

const Order = {}

Order.createOrder = async (order, results) => {
    const cost = await model.Stuff.findOne({
        raw: true,
        where:{
            stuff_id: order.stuff_id,
        },
        attributes:['first_cost']
    })

    const date = moment().format("YYYY-MM-DD");


    model.Order.create({
        order_num: order.order_num,
        order_cost: order.order_num * cost.first_cost,
        stuff_id: order.stuff_id,
        branch_id: order.branch_id,
        time: date,
    })
    .then(result => {
        console.log("order is created");
        return results(null, result);
    })
    .catch(err => {
        console.log("createOrder err", err);
        return results(err,null);
    });
}

Order.createNeccesaryOrder = async (branch_id, results) => {
    const deficientList = await model.Stock.findAll({
        raw: true,
        where: {
            stock_Num: {
                [Op.lte]: 5,
            },
            branch_id: branch_id,
        },
        //attributes:['']
    });

    console.log("create Neccesary Orders");
    for(let i = 0; i < deficientList.length; i++) {
        let stuff_info = await model.Stuff.findOne({
            where:{
                stuff_id: deficientList[i].stuff_id,
            },
            attributes:['first_cost','auto_order_num']
        })

        model.Order.create({
            order_num: stuff_info.auto_order_num,
            order_cost: stuff_info.auto_order_num * stuff_info.first_cost,
            stuff_id: deficientList[i].stuff_id,
            branch_id: deficientList[i].branchId,
        })
        .then(result => {
            console.log("Neccesary order is created", i, result[i]);
            return;
        })
        .catch(err => {
            console.log("createOrder err in createNeccesaryOrder", err);
            return results(err,null);
        });
    }
    return results(null, "success");

}

Order.findAllOrder = (branch_id, results) => {
    model.Order.findAll({
        raw: true,
        where: {
            branch_id: branch_id,
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

Order.deleteOrder = (order_id, results) => {
    model.Order.destroy({
        where: {order_id: order_id},
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

Order.findAllNeccesaryOrder = (branch_id, results) => {
    model.Stock.findAll({
        raw: true,
        where: {
            stock_Num: {
                [Op.lte]: 5,
            },
            branch_id: branch_id,
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

module.exports = Order;