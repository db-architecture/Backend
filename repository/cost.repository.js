const model = require("../models")
const Sequelize = require('sequelize')

const Cost = ()=>{}

Cost.findByCode_and_Date = (start,end,code,bi,results)=>{
    model.Cost.findAll({
        raw:true,
        where:{
            time:{
                [Sequelize.Op.gte]:start,
                [Sequelize.Op.lte]:end
            },
            costcode:{
                [Sequelize.Op.in]:code,
            },
            branch_id:bi,
        },
        attributes:['time','cost_size'],
    }).then(result=>{
        results(null,result)
    }).catch(err=>{
        results(err,null)
        console.log(err)
    })
}

Cost.refund = async (bi,date,buyid,results)=>{
    const buy = await model.Buy.findByPk(buyid)
    const p = buy.price

    model.Cost.create({
        time:date,
        costcode:6,
        branch_id: bi,
        cost_size: p,
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

Cost.disposalCost = () =>{
    model.Cost.create({
        time:date,
        costcode:7,
        branch_id: bi,
        cost_size: p,
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

Cost.salary = () =>{
    model.Cost.create({
        time:date,
        costcode:2,
        branch_id: bi,
        cost_size: p,
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