const order = require("../repository/order.repository.js");

exports.applyOrder = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "req.body can not be empty!"
        });
    }

    order.createOrder({
        order_num: req.body.order_num,
        stock_id: req.body.stock_id,
        branch_id: order.branch_id,
    }, (err, result) => {
        if(err) {
            res.status(400).send({
                message: "applyOrder err"
            });
        } else {
            res.send({
                order_id: result.order_id
            });
        }
    });
}

exports.getList = (req, res) => {
    if (!req.params) {
        res.status(400).send({
          message: "req.params can not be empty!"
        });
    } else {
        order.findAllOrder({
            branch_id: req.params.branchId,
        }, (err, results) => {
            if (err) {
                res.status(400).send({
                    message: "getList err"
                });
            } else {
                res.send(results);
            }
        })
    }
}

exports.deleteOrder = (req, res) => {
    //order.deleteOrder
    if (!req.params) {
        res.status(400).send({
          message: "req.params can not be empty!"
        });
    } else {
        order.deleteOrder(req.params.orderId, (err, results) => {
            if(err) {
                res.status(400).send({
                    message: "deleteOrder err"
                });
            } else {
                res.send({
                    message: "order was successfully deleted"
                });
            }
        })
    }
}

exports.getNeccesaryList = (req, res) => {
    //order.findAllNeccesaryOrder

}

exports.applyNeccesaryOrder = (req, res) => {
    //order.createNeccesaryOrder
    
}