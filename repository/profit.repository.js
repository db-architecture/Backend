const model = require("../models")
const Sequelize = require('sequelize')
const {sequelize} = require('../models/connection')

const Profit = ()=>{

}

Profit.findByCode_and_Date = (start,end,code,bi,sumcode,results) =>{

    let where = {
        time:{
            [Sequelize.Op.gte]: start,
            [Sequelize.Op.lte]: end,
        },
        branch_id:bi,
    }

    if (!(code == null)){
        where = Object.assign(where,{profitcode: code})
    }

    if (sumcode == 0){
        model.Profit.findAll({
            raw:true,
            where:where,
            attributes:['time','day_profit','profitcode'],
        }).then(result=>{
            results(null,result)
        }).catch(err=>{
            results(err,null)
            console.log(err)
        })
    }
    else{
        model.Profit.findAll({
            raw:true,
            where:where,
            attributes:[[Sequelize.fn('sum', Sequelize.col('day_profit')), 'sumProfit']],
        }).then(result=>{
            results(null,result)
        }).catch(err=>{
            results(err,null)
            console.log(err)
        })
    }
}

Profit.update_profit = async(data_arr,bi,results) =>{

    try{
        let i;
        for (i=0; i<data_arr.length; i++){

            result = await model.Profit.create({
                time:data_arr[i].date,
                day_profit:data_arr[i].profit,
                profitcode:data_arr[i].profitcode,
                branch_id:bi,
            })

            if (result == null){
                throw new {msg:"Create incomplete"}
            }

        }
    }catch(err){
        results(err,null)
        console.log(err)
    }

    results(null,{msg:"Create complete"})
}

module.exports = Profit;