const order = require("../repository/order.repository.js");

exports.applyOrder = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "req.body can not be empty!"
        });
    } else {
        order.createOrder({
            order_num: req.body.order_num,
            stuff_id: req.body.stuff_id,
            branch_id: req.body.branch_id,
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
}

exports.getList = (req, res) => {
    if (!req.params) {
        res.status(400).send({
          message: "req.params can not be empty!"
        });
    } else {
        order.findAllOrder(req.params.branch_id, (err, results) => {
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
        order.deleteOrder(req.params.order_id, (err, results) => {
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
    if (!req.params) {
        res.status(400).send({
          message: "req.params can not be empty!"
        });
    } else {
        order.findAllNeccesaryOrder(req.params.branch_id, (err, results) => {
            if(err) {
                res.status(400).send({
                    message: "getNeccesaryList err"
                });
            } else {
                res.send(results);
            }
        })
    }

}

exports.applyNeccesaryOrder = (req, res) => {
    //order.createNeccesaryOrder
    if (!req.body) {
        res.status(400),send({
            message: "req.body can not be empty!"
        });
    } else {
        order.createNeccesaryOrder(req.body.branch_id, (err, results) => {
            if(err) {
                res.status(400).send({
                    message: "applyNeccesaryOrder err"
                });
            } else {
                res.send(results);
            }
        });
    }
    
}