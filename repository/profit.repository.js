const model = require("../models")
const Sequelize = require('sequelize')

const Profit = ()=>{

}

Profit.findByCode_and_Date = (start,end,code,bi,results) =>{
    model.Profit.findAll({
        raw:true,
        where:{
            time:{
                [Sequelize.Op.gte]:start,
                [Sequelize.Op.lte]:end
            },
            profitcode:code,
            branch_id:bi,
        },
        attributes:['time','day_profit'],
    }).then(result=>{
        results(null,result)
    }).catch(err=>{
        results(err,null)
        console.log(err)
    })
}

Profit.update_profit = (date,price,code,bi,results) =>{
    model.Profit.create({
        time:date,
        day_profit:price,
        profitcode:code,
        branch_id:bi,
    }).then(result=>{
        if (result == null){
            throw new {msg:"Create incomplete"}
        }
        results(null,{msg:"Create complete"})
    }).catch(err=>{
        results(err,null)
        console.log(err)
    })
}

module.exports = Profit;