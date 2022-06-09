const model = require("../models")
const Sequelize = require('sequelize')

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
        let i;
        for (i=0; i<data_arr.length; i++){

            result = await model.Buy.create({
                stock_id: data_arr[i].stock_id,
                buy_num: data_arr[i].buy_num,
                buycode: data_arr[i].buycode,
                age: data_arr[i].age,
                sex: data_arr[i].sex,
                price: data_arr[i].price,
                time: data_arr[i].time,
                branch_id: bi,
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

module.exports = Buy;