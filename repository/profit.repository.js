const model = require("../models")
const Sequelize = require('sequelize')

const Profit = ()=>{

}

Profit.findByCode_and_Date = (start,end,code,bi,sumcode,results) =>{
    if (sumcode == 0){

        if (code == null){
            model.Profit.findAll({
                raw:true,
                where:{
                    time:{
                        [Sequelize.Op.gte]:start,
                        [Sequelize.Op.lte]:end
                    },
                    branch_id:bi,
                },
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

    }
    else{
        model.Profit.findAll({
            raw:true,
            where:{
                time:{
                    [Sequelize.Op.gte]:start,
                    [Sequelize.Op.lte]:end
                },
                branch_id:bi,
            },
            attributes:[[Sequelize.fn('sum', Sequelize.col('day_profit')), 'sumProfit']],
        }).then(result=>{
            results(null,result)
        }).catch(err=>{
            results(err,null)
            console.log(err)
        })
    }
}

Profit.update_profit = async(data_arr,results) =>{

    try{
        let i;
        for (i=0; i<data_arr.length; i++){

            result = await model.Profit.create({
                time:data_arr[i].date,
                day_profit:data_arr[i].profit,
                profitcode:data_arr[i].profitcode,
                branch_id:data_arr[i].branch_id,
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