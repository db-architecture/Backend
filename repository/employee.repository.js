const model = require("../models")
const Sequelize = require('sequelize')

const Emp = ()=>{

}

Emp.emp_list = (bi,results)=>{
    model.Employee.findAll({
        raw:true,
        where:{
            branch_id:bi
        },
        attributes:['employee_name','employee_phone','salary'],
    }).then(result=>{
        results(null,result)
    }).catch(err=>{
        results(err,null)
        console.log(err)
    })
}

Emp.emp_create = (bi,en,ph,sa,results) =>{
    model.Employee.create({
        employee_name: en,
        employee_phone: ph,
        salary: sa,
        branch_id:bi,
    }).then(result=>{
        if (result == null){
            throw new {msg:"Create incomplete"}
        }
        results(null,{msg:"Create complete"})
    }).catch(err=>{
        results(err,null)
        console.log(err)
    })
}

Emp.emp_update = (en,bi,sa,results) =>{
    model.Employee.update({
        salary:sa
    },{where:{
        employee_name: en,
        branch_id: bi,
    }}).then(result=>{
        if (result == null){
            throw new {msg:"Update incomplete"}
        }
        results(null,{msg:"Update complete"})
    }).catch(err=>{
        results(err,null)
        console.log(err)
    })
}

Emp.emp_del = (en,bi,results) =>{
    model.Employee.destroy({
        where:{
            employee_name:en,
            branch_id:bi,
        }
    }).then(result=>{
        if (result == null){
            throw new {msg:"Delete incomplete"}
        }
        results(null,{msg:"Delete complete"})
    }).catch(err=>{
        results(err,null)
        console.log(err)
    })
}

module.exports = Emp;