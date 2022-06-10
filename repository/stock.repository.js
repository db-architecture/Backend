const model = require("../models");

const Stock = function(stock){
    this.branch_id = stock.branch_id
    this.stuff_name = stock.stuff_name;
    this.stock_num = stock.stock_num;
    this.stock_id = stock.stock_id;
    this.expired_date = stock.expired_date;
};

Stock.getAllList = async(newStock, results) => {
    if(!newStock.stuff_name){
        await model.Stock.findAll({
            raw:true,
            where:{branch_id:newStock.branch_id}
        }).then(result=>{
            console.log("Stock retrieving done");
            results(null,result);
        }).catch(err=>{
            console.log("err occured while getting stock list");
            results(err,null);
        })

    }else{
        await model.Stuff.findOne({
            raw:true,
            where:{stuff_name:newStock.stuff_name},
            attributes:['stuff_id'],
        }).then(stuff=>{
            model.findAll({
                raw:true,
                where:{branch_id:newStock.branch_id, stuff_id:stuff.stuff_id},
            }).then(result=>{
                console.log("Stock retrieving done");
                results(null,result);
            }).catch(err=>{
                console.log("err occured while getting stock list with"+newStock.branch_id+", "+newStock.stuff_name);
                results(err,null);
            })
        }).catch(err=>{
            console.log("err occured while getting stuff_id (Stock.getAllList with:"+ newStock.stuff_name+")");
            results(err,null);
        })
    }
}

Stock.addItem = async(newStock, results)=>{
    await model.Stuff.findOne({
        raw:true,
        where:{stuff_name:newStock.stuff_name},
        attributes:['stuff_id'],
    }).then(stuff=>{
        model.Stock.create({
            stuff_id:stuff.stuff_id,
            stock_num:newStock.stock_num,
            branch_id:newStock.branch_id,
            expired_date:newStock.expired_date
        }).then(result=>{
            console.log("Stock create done");
            results(null,newStock);
        }).catch(err=>{
            console.log("err occured while creating stock");
        results(err,null);
        })
    }).catch(err=>{
        console.log("err occured while getting stuff_id (Stock.addItem with:"+ stock.stuff_name+")");
        results(err,null);
    })
}

Stock.updateStock = async(newStock, results) =>{
    await model.Stock.update(
        {stock_num:newStock.stock_num},
        {where: {branch_id:newStock.branch_id, stock_id:newStock.stock_id}
    }).then(result=>{
        console.log("Upadating stock done with:"+newStock.stock_id)
        results(null,{msg:"Update complete"});
    }).catch(err=>{
        console.log("err occured while updating stock");
        results(err,null);
    })
}

module.exports = Stock;