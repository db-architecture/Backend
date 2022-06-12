const model = require("../models");
const sequelize = model.sequelize;
//이벤트 코드:7
const event_code = 5;

const Event = function(event){
    this.stuff_name = event.stuff_name;
    this.disprice = event.disprice;
    this.disrate = event.disrate;
    this.startdate = event.startdate;
    this.enddate = event.enddate;
    this.event_type = event.event_type;
};

Event.registerNewEvent = async(event, results)=>{
    try{
        res = await model.Event.findAll({
            raw:true,
            where:{stuff_name:event.stuff_name},
            attributes:['stuff_id']
        })

        if(res.length>1){
            throw "already event!"
        }
        model.Stuff.findAll({
            raw:true,
            where:{stuff_name:event.stuff_name},
            attributes:['stuff_id']
        }).then(stuff_id=>{
            model.Code.findOne({
                raw:true,
                where: {code:event_code, code_name:event.event_type},
                attributes: ['sec_code']
            }).then(event_code_result=>{
                let citems = {stuff_id:stuff_id[0].stuff_id,
                    startdate:event.startdate,
                    enddate:event.enddate,
                    eventcode:event_code_result.sec_code,
                    stuff_name:event.stuff_name}
                if (!(event.disrate==null || event.disrate == "")){
                    citems = Object.assign(citems,{disrate: event.disrate})
                }
                if (!(event.disprice==null || event.disprice == "")){
                    citems = Object.assign(citems,{disprice:event.disprice})
                }
                console.log(citems)
                model.Event.create(citems).then(result=>{
                    console.log("register new event done")
                    results(null,event)
                }).catch(err=>{
                    console.log("err ocuured while creating event")
                    results(err,null)
                })

            }).catch(err=>{
                console.log("err ocuured while getting event_code")
                results(err,null);
            })

        }).catch(err=>{
            console.log("err ocuured while getting stuff_id")
            results(err,null);
        })
    }catch(err){
        console.log(err)
        results(err,null)
    }
}


Event.getAllEvenetList = (event_type,stuff_name,results)=>{
    //물품 이름만 있는 경우
    if(stuff_name != null && event_type==null){
        model.Stuff.findOne({
            raw:true,
            where:{stuff_name:stuff_name},
            attributes:['stuff_id']
        }).then(stuff=>{
            model.Event.findAll({
                raw:true,
                where:{stuff_id:stuff.stuff_id}
            }).then(result=>{
                results(null,result);
            }).catch(err=>{
                console.log("err occured while getting event list with"+stuff_name);
                results(err,null);
            })
        }).catch(err=>{
            console.log("err ocuured while getting stuff_id")
            results(err,null);
        })
    }
    //행사 유형만 있는 경우
    else if(stuff_name == null && event_type != null){
        model.Code.findOne({
            raw:true,
            where:{code:event_code,code_name:event_type},
            attributes:['sec_code']
        }).then(event_code_result=>{
            model.Event.findAll({
                raw:true,
                where:{eventcode:event_code_result.sec_code},
            }).then(result=>{
                results(null,result)
            }).catch(err=>{
                console.log("err occured while getting event list with"+event_type)
                results(err,null)
            })
        }).catch(err=>{
            console.log("err occured while getting event code with "+event_type)
            results(err.null);
        })
    }
    //둘다 있는 경우
    else if(stuff_name != null && event_type != null){
        model.Stuff.findOne({
            raw:true,
            where:{stuff_name:stuff_name},
            attributes:['stuff_id']
        }).then(stuff_result=>{
            model.Code.findOne({
                raw:true,
                where:{code:event_code,code_name:event_type},
                attributes:['sec_code']
            }).then(event_code_result=>{
                model.Event.findAll({
                    raw:true,
                    where:{eventcode:event_code_result.sec_code,stuff_id:stuff_result.stuff_id},
                }).then(result=>{
                    results(null,result)
                }).catch(err=>{
                    console.log("err occured while getting event list with"+event_type+"and"+stuff_name)
                    results(err,null)
                })
            }).catch(err=>{
                console.log("err occured while getting event list with"+event_type)
                results(err,null)
            })
        }).catch(err=>{
            console.log("err ocuured while getting stuff_id with"+stuff_name)
            results(err,null);
        })
    }
    else{
        model.Event.findAll({
            raw:true
        }).then(result=>{
            results(null,result)
        }).catch(err=>{
            console.log("err occured while getting event list ")
            results(err,null)
        })
    }
}


Event.deleteEvent = (event_id, results) => {
    model.Event.destroy({
        where:{id:event_id}
    }).then(result=>{
        console.log("delte event...done")
        results(null,202)
    }).catch(err=>{
        console.log("err occured while deleting event");
        return results(err,null);
    });

}

module.exports = Event;