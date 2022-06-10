const model = require("../models")
const Sequelize = require('sequelize')
const {sequelize} = require('../models/connection')

const Buy = ()=>{}

Buy.findByCode_and_Date = (start,end,code,age,sex,bi,sumcode,results)=>{

    let where = {
        time:{
            [Sequelize.Op.gte]:start,
            [Sequelize.Op.lte]:end
        },
        branch_id: bi,
    }

    if (!(code == null)){
        where = Object.assign(where,{buycode: code})
    }

    if (!(age == null)){
        where = Object.assign(where,{age: age})
    }

    if (!(sex == null)){
        where = Object.assign(where,{sex: sex})
    }

    if (sumcode == 0){
        model.Buy.findAll({
            raw: true,
            where: where,
            attributes: ['stock_id','time','buycode','price','buy_num'],
        }).then(result=>{
            results(null,result)
        }).catch(err=>{
            results(err,null)
            console.log(err)
        })
    }
    else{
        model.Buy.findAll({
            raw:true,
            where: where,
            attributes:[[Sequelize.fn('sum', Sequelize.col('price')), 'sumPrice']],
        }).then(result=>{
            results(null,result)
        }).catch(err=>{
            results(err,null)
            console.log(err)
        })
    }

}

Buy.update_buy= async(data_arr,bi,results) =>{

    try{
        let iter;
        for (iter=0; iter<data_arr.length; iter++){

            temp1 = await model.Stock.findAll({
                raw:true,
                where:{
                    stuff_id: data_arr[iter].stuff_id,
                    branch_id: bi,
                    deletedAt: null,
                },
                order:[
                    ['expired_date','ASC'],
                ],
                attributes: ['stock_id','stock_num','expired_date']
            })

            sums = await model.Stock.findOne({
                raw:true,
                where:{
                    stuff_id: data_arr[iter].stuff_id,
                    branch_id: bi,
                    deletedAt: null,
                },
                attributes: [[Sequelize.fn('sum', Sequelize.col('stock_num')), 'sumstock']]
            })

            let sumall = sums.sumstock;

            if (sumall < data_arr[iter].buy_num){
                data_arr[iter].buy_num = sumall;
            }
            else{
                sumall = data_arr[iter].buy_num;
            }

            console.log(data_arr[iter].stuff_id)
            price = await model.Stuff.findOne({
                where:{
                    stuff_id: data_arr[iter].stuff_id
                }
            })

            let p = price.fixed_price;

            let stock_arr = [];
            let i = 0;
            
            if (sumall == 0){
                throw "no stocks!";
            }
            else{
                while(sumall > 0 && i < temp1.length){
                    if (sumall - temp1[i].stock_num < 0){
                        temp1[i].stock_num = sumall;
                        stock_arr.push(temp1[i]);
                        sumall = 0;
                    }
                    else{
                        stock_arr.push(temp1[i]);
                        sumall-=temp1[i].stock_num;
                    }
                    i+=1
                }
            }

            temp = await model.Event.findOne({
                raw:true,
                where:{
                    stuff_id: temp1.stuff_id,
                },
                attributes:['eventcode','disprice'],
            })

            let ec = temp.eventcode;
            let n = data_arr[i].buy_num;

            if (ec == 4){
                p = temp.disprice;
            }

            if (ec == 1){
                n = int(n/2)+(n%2);
                p *= n;
            }
            else if (ec == 2){
                n = int(n/3)+(n%3);
                p *= n;
            }
            else if (ec == 3){
                p = (int(n/4)*temp.disprice)+((n%4)*p);
            }
            else{
                p = (data_arr[i].buy_num*p);
            }

            console.log(p)

            result = await model.Buy.create({
                stuff_id: data_arr[iter].stuff_id,
                buy_num: data_arr[iter].buy_num,
                buycode: data_arr[iter].buycode,
                age: data_arr[iter].age,
                sex: data_arr[iter].sex,
                price: p,
                time: data_arr[iter].time,
                branch_id: bi,
            })

            if (result == null){
                throw "Buy Create incomplete"
            }

            result = await model.Profit.create({
                time:data_arr[iter].time,
                day_profit:p,
                profitcode:1,
                branch_id:bi,
            })

            if (result == null){
                throw "Profit Create incomplete"
            }

            j=0
            while (j<stock_arr.length){
                let n = -(stock_arr[j].stock_num);
                result = await model.Stock.increment({
                    stock_num: n,
                },
                {
                    where:{
                        stock_id: stock_arr[j].stock_id,
                    },
                })

                if (result == null){
                    throw "Stock Update incomplete"
                }

                j+=1;
            }

        }

        results(null,"Create complete");

    }catch(err){
        console.log(err)
        results(err,null)
    }
}

module.exports = Buy;