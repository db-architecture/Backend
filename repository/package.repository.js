const model = require("../models");
//택배 코드:7
const package_code = 7;

const Package = function(pacakge){
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

Package.getAllPackageLsit = (type, results) =>{
    // type이 주어진 경우
    console.log(type)
    if(type != null){
        model.Code.findOne({
            raw: true,
            where: {code:package_code, code_name:type},
            attributes:['sec_code']
        }).then(codeValue =>{
            model.Package.findAll({
                raw: true,
                where: {pakage_type:codeValue.sec_code}
            }).then(result=>{
                console.log("get all package ("+type+")");
                results(null,result);

            }).catch(err =>{
                console.log("err occuered while get all package ("+type+")");
                results(err, null);
            })
        }).catch(err =>{
            console.log("err occuered while get all package (get code value) ("+type+")");
            results(err, null);
        })
    }
    //type이 주어지지 않은 경우
    else{
        model.Package.findAll({
            raw:true,
        }).then(result=>{
            console.log("get all package");
            results(null,result);
        }).catch(err=>{
            console.log("err occuered while get all package");
            results(err, null);
        })
    }
}

Package.registerNewPackage = (package, results) => {
    console.log("repository")
    model.Code.findOne({
        raw:true,
        where: {code:package_code,code_name:package.pakage_type},
        attributes:['sec_code']
    }).then(code => {
        model.Package.create({
            weight : package.weight,
            b_phone : package.b_phone,
            b_address : package.b_address,
            b_name : package.b_name,
            s_phone : package.s_phone,
            s_address : package.s_address,
            s_name : package.s_name,
            commision : package.commision,
            package_price : package.package_price,
            pakage_type : code.sec_code
          })
          .then(result => 
            {console.log("register package: ",{ ...package });
            results(null,{ ...package })
          })
          .catch(err => 
            {
            console.log("err occured while register package " + err);
            results(err,null);
          });
          
    }).catch(err => {
        console.log("err occured while get package code " + err);
        results(err,null);
    })
  };


module.exports = Package;