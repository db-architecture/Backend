const Cost_repo = require("../repository/cost.repository.js");
const UStock_repo = require("../repository/ustock.repository.js")
const Employee = require("../models/employee")

exports.list = async(req, res) => {
    // Validate request
    if (!req.body) {
     res.status(400).send({
       message: "Content can not be empty!"
     });
   };

  let sd=req.body.startdate;
  let ed=req.body.enddate;
  let pc=req.body.costcode;


  Profit_repo.list(sd,ed,pc,(err,data) => {
    if (err)
        res.status(500).send({
            message:
                err.message || "Some error occurred"
        });
        else res.send(data);
    });
}

exports.refundcost= async(req,res)=>{
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    };

    let bi=req.body.buyid;

    Cost_repo.refundcost(bi,(err,data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred"
            });
            else res.send(data);
        });
}

exports.disposalcost= async(req,res)=>{
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    };

    let usc=req.body.ustockcode;

    UStock_repo.priceget(usc,(err,data)=>{
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred"
            });
            else res.send(data);
        });

    Cost_repo.disposalcost(usc,(err,data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred"
            });
            else res.send(data);
        });
}

exports.salary= async(req,res)=>{
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    };

    let id =req.body.employee_id;

    Employee_repo.salary(id,(err,data1)=>{
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred"
            });
            // 시급
            data1;

    });

    let sum = 0;

    Commute_repo.salary(id,(err,data2)=>{
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred"
            });
            //출퇴근시간, for문으로 sum 쌓음
            data2;   
    });

    res.send(data1.data*sum);
}