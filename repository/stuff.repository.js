const model = require("../models");
const Sequelize = require("sequelize");
const { sequelize } = require("../models");

const Stuff = {}

Stuff.getList = async (sn,id,sc,results) =>{

    let where = {};

    if(!(sn == null)){
        where = Object.assign(where,{stuff_name:sn})
    }
    if(!(id == null)){
        where = Object.assign(where,{stuff_id:id})
    }
    if(!(sc == null)){
        where = Object.assign(where,{stuffcode:sc})
    }

    model.Stuff.findAll({
        raw: true,
        where:where
    }).then(result=>{
        results(null,result)
    }).catch(err=>{
        console.log(err)
        results(err,null)
    })

}

Stuff.addItem = async (data_arr,results)=>{

    try{
        await sequelize.transaction(async t=>{
            let i;
            for (i=0; i<data_arr.length; i++){

                result = await model.Stuff.create({
                    stuff_name:data_arr[i].stuff_name,
                    stuffcode:data_arr[i].stuffcode,
                    first_cost:data_arr[i].first_cost,
                    fixed_price:data_arr[i].fixed_price,
                    provider:data_arr[i].provider,
                    expire_period:data_arr[i].expire_period,
                    auto_order_num:data_arr[i].auto_order_num,
                },{transaction:t})
    
                if (result == null){
                    throw "Create incomplete"
                }
    
            }
        })
    }catch(err){
        results(err,null)
        console.log(err)
    }

    results(null,"Create complete");

}

Stuff.updateItem = async (id,autonum,sc,fp,results)=>{

    updateitems = {}

    if (!(autonum==null)){
        updateitems = Object.assign(updateitems,{auto_order_num:autonum})
    }
    if (!(sc==null)){
        updateitems = Object.assign(updateitems,{stuffcode:sc})
    }
    if (!(fp==null)){
        updateitems = Object.assign(updateitems,{fixed_price:fp})
    }

    model.Stuff.update(updateitems,{
        where:{
            stuff_id: id,
        }
    }).then(result=>{
        results(null,"update complete")
    }).catch(err=>{
        console.log(err)
        results(err,null)
    })

}

Stuff.deleteItem = async (id,results)=>{
    
    model.Stuff.destroy({where:{
        stuff_id: id,
    }}).then(result=>{
        results(null,"delete complete")
    }).catch(err=>{
        console.log(err)
        results(err,null)
    })

}

module.exports = Stuff;