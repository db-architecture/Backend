const Profit_repo = require("../repository/profit.repository.js");

exports.list = (req, res) => {
    // Validate request
    if (!req.body) {
     res.status(400).send({
       message: "Content can not be empty!"
     });
   };

  let sd=req.query.startdate;
  let ed=req.query.enddate;
  let pc=req.query.profitcode;
  let bi=req.query.branch_id;

  Profit_repo.findByCode_and_Date(sd,ed,pc,bi,(err,data) => {
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

    let data_arr = req.body;

    Profit_repo.update_profit(data_arr,(err,data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred"
            });
            else res.send(data);
        });
}