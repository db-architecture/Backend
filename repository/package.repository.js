const model = require("../models");
const sequelize = model.sequelize;
//택배 코드:7
const package_code = 7;

const Package = function(pacakge){
    this.branch = pacakge.branch;
    this.weight = pacakge.weight;
    this.b_phone = pacakge.b_phone;
    this.b_address = pacakge.b_address;
    this.b_name = pacakge.b_name;
    this.s_phone = pacakge.s_phone;
    this.s_address = pacakge.s_address;
    this.s_name = pacakge.s_name;
    this.commision = pacakge.commision;
    this.package_price = pacakge.package_price;
    this.pakage_type = pacakge.pakage_type;
}

Package.getAllPackageLsit = (type,branch, results) =>{
    //지점명 있는 경우
    if(branch != null){
        model.Branch.findOne ({
            raw:true,
            where:{branch_name:branch},
            attributes:['branch_id']
        }).then(branch=>{
            //타입 있는 경우
            if(type != null){
                model.Code.findOne({
                    raw:true,
                    where: {code:package_code,code_name:type},
                    attributes: ['sec_code']
                }).then(codeValue=>{
                    model.Package.findAll({
                        raw:true,
                        where:{pakage_type:codeValue.sec_code, branch_id:branch.branch_id}
                    }).then(result=>{
                        console.log("get all package ("+type+"),("+branch+")");
                        results(null,result);
                    })
                }).catch(err=>{
                    console.log("err occuered while get all package (get code value) "+type+"),("+branch+")");
                    results(err, null);
                })
            }
            //타입 없는 경우
            else{
                model.Package.findAll({
                    raw:true,
                    where:{branch_id:branch.branch_id},
                }).then(result=>{
                    console.log("get all package ("+branch+")");
                    results(null,result);
                }).catch(err=>{
                    console.log("err occuered while get all package (Package find All) ("+branch+")");
                    results(err, null);
                })
            }
        }).catch(err=>{
            console.log("err occured while get branch id ("+type+")");
            results(err, null);
        })
    }
    //지점명 없는 경우
    else{
        //타입 있는 경우
        if(type != null){
            model.Code.findOne({
                raw:true,
                where: {code:package_code,code_name:type},
                attributes: ['sec_code']
            }).then(codeValue=>{
                model.Package.findAll({
                    raw:true,
                    where:{pakage_type:codeValue.sec_code}
                }).then(result=>{
                    console.log("get all package ("+type+")")
                    results(null,result);
                })
            }).catch(err=>{
                console.log("err occuered while get all package (get code value) ("+type+")");
                results(err, null);
            })
        }
        //타입 없는 경우
        else{
            model.Package.findAll({
                raw:true,
            }).then(result=>{
                console.log("get all package ("+branch+")");
                results(null,result);
            }).catch(err=>{
                console.log("err occuered while get all package (Package find All)");
                results(err, null);
            })
        }
    }
    
}

Package.registerNewPackage = async (package, results) => {
    try {
        const branch = await model.Branch.findOne({
            raw:true,
            where: {branch_name:package.branch},
            attributes:['branch_id']
        });
    
        const code = await model.Code.findOne({
            raw:true,
            where: {
                code:package_code,
                code_name:package.pakage_type
            },
            attributes:['sec_code']
        });

        await sequelize.transaction(async t => {
            await model.Package.create({
                weight : package.weight,
                b_phone : package.b_phone,
                b_address : package.b_address,
                b_name : package.b_name,
                s_phone : package.s_phone,
                s_address : package.s_address,
                s_name : package.s_name,
                commision : package.commision,
                package_price : package.package_price,
                pakage_type : code.sec_code,
                branch_id : branch.branch_id
            });
        });
    } catch(err) {
        console.log("err occured while register package " + err);
        return results(err,null);
    }

    console.log("register package: ",{ ...package });
    return results(null,{ ...package });
}


module.exports = Package;