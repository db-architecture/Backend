const Profit_repo = require("../repository/profit.repository.js");

exports.list = async(req, res) => {
    // Validate request
    if (!req.body) {
     res.status(400).send({
       message: "Content can not be empty!"
     });
   };

  let sd=req.body.startdate;
  let ed=req.body.enddate;
  let pc=req.body.profitcode;


  Profit_repo.list(sd,ed,pc,(err,data) => {
    if (err)
        res.status(500).send({
            message:
                err.message || "Some error occurred"
        });
        else res.send(data);
    });
}

exports.newprofit= async(req,res)=>{
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    };

    let date=req.body.date;
    let price=req.body.price;
    let pc=req.body.profitcode;

    Profit_repo.newprofit(date,price,pc,(err,data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred"
            });
            else res.send(data);
        });
}