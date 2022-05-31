const model = require("../models");

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
    if(type){
        model.PackageCode.findOne({
            raw: true,
            where: {packagecode_name:type},
            attributes:['packagecode']
        }).then(codeValue =>{
            model.Package.findAll({
                raw: true,
                where: {pakage_type:codeValue}

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
}

Package.registerNewPackage = (package, results) => {
    model.PackageCode.findOne({
        raw:true,
        where: {packagecode_name:package.pakage_type},
        attributes:['packagecode']
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
            pakage_type : code
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