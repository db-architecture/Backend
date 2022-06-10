const model = require("../models")
const Sequelize = require('sequelize')
const {sequelize} = require('../models/connection')

const Cost = ()=>{}

Cost.findByCode_and_Date = (start,end,code,bi,sumcode,results)=>{
    let where = {
        time:{
            [Sequelize.Op.gte]:start,
            [Sequelize.Op.lte]:end
        },
        branch_id:bi,
    }

    if (!(code==null)){
        where = Object.assign(where,{costcode: code})
    }

    if (sumcode == 0){
        model.Cost.findAll({
            raw:true,
            where: where,
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
            where: where,
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
            let c = data_arr[i].costcode;
            let cost = data_arr[i].cost_size;

            if (c == 6){
                temp = await model.Buy.findOne({
                    raw:true,
                    where:{
                        buy_id: data_arr[i].buy_id,
                        branch_id: bi,
                    }
                })

                if (temp == null){
                    throw "buyid is not exist or that buyid does not exist in your branch"
                }

                cost = temp.price;
                stockid = temp.stock_id;
                num = temp.buy_num;

                stat = await model.Stock.increment({
                    stock_num: num,
                },{
                    where: {
                        stock_id: stockid,
                    },
                });
            }
            else if (c == 7){
                temp = await model.Stock.findAll({
                    raw:true,
                    where:{
                        stock_id: data_arr[i].stock_id,
                        branch_id: bi,
                    }
                })

                if (temp == null){
                    throw "stockid is not exist or that stockid does not exist in your branch"
                }

                fc = await model.Stuff.findByPk(temp.stuff_id);
                cost = (fc.first_cost)*(temp.stock_num);
                temp = await model.Stock.update({
                    stock_num: 0,
                },{
                    where:{
                        stock_id: data_arr[i].stock_id,
                    }
                })
            }

            result = await model.Cost.create({
                costcode:c,
                cost_size:cost,
                time:data_arr[i].time,
                branch_id: bi
            })


            if (result == null){
                throw "Cost Create incomplete"
            }
        }
    }catch(err){
        results(err,null)
        console.log(err)
    }

    results(null,"Create complete")
}

module.exports = Cost;