const model = require("../models")
const Sequelize = require('sequelize')

const Cost = ()=>{}

Cost.findByCode_and_Date = (start,end,code,bi,sumcode,results)=>{
    if (sumcode == 0){

        if (code == null){
            model.Cost.findAll({
                raw:true,
                where:{
                    time:{
                        [Sequelize.Op.gte]:start,
                        [Sequelize.Op.lte]:end
                    },
                    branch_id:bi,
                },
                attributes:['time','cost_size','costcode'],
            }).then(result=>{
                results(null,result)
            }).catch(err=>{
                results(err,null)
                console.log(err)
            })
        }
        else{
            model.Cost.findAll({
                raw:true,
                where:{
                    time:{
                        [Sequelize.Op.gte]:start,
                        [Sequelize.Op.lte]:end
                    },
                    costcode:code,
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

    }
    else{
        model.Cost.findAll({
            raw:true,
            where:{
                time:{
                    [Sequelize.Op.gte]:start,
                    [Sequelize.Op.lte]:end
                },
                branch_id:bi,
            },
            attributes:[[Sequelize.fn('sum', Sequelize.col('cost_size')), 'sumCost']],
        }).then(result=>{
            results(null,result)
        }).catch(err=>{
            results(err,null)
            console.log(err)
        })
    }
}

Cost.update_cost= async(data_arr,bi,results) =>{

    try{
        let i;
        for (i=0; i<data_arr.length; i++){

            result = await model.Cost.create({
                costcode:data_arr[i].costcode,
                cost_size:data_arr[i].cost_size,
                time:data_arr[i].time,
                branch_id: bi
            })


            if (result == null){
                throw new {msg:"Cost Create incomplete"}
            }

        }
    }catch(err){
        results(err,null)
        console.log(err)
    }

    results(null,{msg:"Create complete"})
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

module.exports = Cost;