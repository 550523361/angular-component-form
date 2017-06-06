import {Injectable} from "@angular/core";
import {BaseDataService} from "angular-component-service";
import {Http} from "@angular/http";
/**
 * Created by xiankun.feng on 2017/5/3.
 */

@Injectable()
export class BaseValidateService extends BaseDataService{
  constructor(http:Http){
    super(http);
  }

  /**
   * 复杂校验 完成 非空、字符(长度，maxlength,minlength)、数字(大小，位数 如 12.31  maxvalue,minvalue)、mobile、email、url、remote(异步远程校验。。可以携带参数)
   * 异步校验会发生在最后
   * @param prop formControl
   * @param rulues  校验规则map 如{mobile:true,number:"##.###"最多三位小数整数最多2位}
   * @param param 异步校验参数配置 如商品名称全商家不重名，此时商户id可以配置上就可以自动携带作为查询条件
   * @returns {{}} 返回验证结果 是json对象或Promise实例(异步校验)
   */
  baseValidate(prop:any,rulues:any,param:any={},remoteService:any={}):any{
    let error:any={};
    let value:any=prop.value||"";
    for(let key in rulues){
      let ruleValue:any=rulues[key];
      if(key=="required"&&value==""){
        error= {"required":"不能为空"};
        break;
      }else if(key=="maxlength"&&value.length>ruleValue){
        error= {"maxlength":"不能超过"+ruleValue+"字符"};
        break;
      }else if(key=="minlength"&&value.length<ruleValue){
        error= {"maxlength":"不能少于"+ruleValue+"字符"};
        break;
      }else if(key=="number"){
        let pattenStr:any=ruleValue;
        let splitArr:any=pattenStr.split(".");
        let aboveZero:any=null;
        let bellowZero:any="";
        if(splitArr.length==2){
          aboveZero=pattenStr.split(".")[0];
          bellowZero=pattenStr.split(".")[1];
        }else if(splitArr.length==1){
          aboveZero=pattenStr.split(".")[0];
        }
        let valueArr:any=value.split(".");
        let valueAboveZero:any=null;
        let valueBellowZero:any="";
        if(valueArr.length==2){
          valueAboveZero=value.split(".")[0];
          valueBellowZero=value.split(".")[1];
        }else if(valueArr.length==1){
          valueAboveZero=value.split(".")[0];
        }

        if(/^0\d+/.test(valueAboveZero)){
          error= {"number":"请输入合法数字,整数不能以两个0开头"};
        }else if(valueAboveZero.length>aboveZero.length){
          error= {"number":"请输入合法数字,只允许"+aboveZero.length+"位整数"};
        }else if(valueBellowZero.length>bellowZero.length){
          error= {"number":"请输入合法数字,只允许"+bellowZero.length+"位小数"};
        }else if(valueBellowZero.length==0&&valueArr.length==2){
          error= {"number":"请输入合法数字,小数位不能为空！"};
        }
        if(rulues["maxvalue"]||rulues["minvalue"]){

        }else{
          break;
        }
      }else if(key=="email"&&!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)){
        error= {"required":"请输入合法邮箱！"};
        break;
      }else if(key=="url"&&!/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(value)){
        error= {"required":"请输入合法地址"};
        break;
      }else if(key=="mobile"&&!/^\d{11}$/.test(value)){
        error= {"required":"请输入11位手机号码！"};
        break;
      }else if(key=="maxvalue"&&value*1>ruleValue*1){
        error= {"required":"不能大于"+ruleValue};
        break;
      }else if(key=="minvalue"&&value*1<ruleValue*1){
        error= {"required":"不能小于"+ruleValue};
        break;
      }else if(key=="checkboxRequired"){
        let grandfather:any=param["grandfather"];
        let formGroup:any=param["formGroup"];
        if(!formGroup){
          continue;
        }
        let grandfatherControl:any=formGroup.get(grandfather);
        let lazyTimerId:any=setTimeout(function () {
          let checkedNum:any=grandfatherControl.controls.filter((optionControl:any)=>{
            return optionControl.value.checked;
          }).length;
          if(checkedNum==0){
            grandfatherControl.setErrors({"required":"至少得选择一个吧！"});
          }
          //clearTimeout(lazyTimerId);
        },10);
      }else if(key=="arrayUploadRequired"){
        error= {};
        let grandfather:any=param["grandfather"]+"LinkValidate";
        let formGroup:any=param["formGroup"];
        if(!formGroup){
          continue;
        }
        let grandfatherControl:any=formGroup.get(grandfather);
        if(prop.parent){
          let lazyTimerId:any=setTimeout(function () {
            let checkedNum:any=prop.parent.parent.controls.filter((optionControl:any)=>{
              return optionControl.value.value!="";
            }).length;
            if(checkedNum<rulues["arrayUploadRequired"]*1){
              grandfatherControl.setErrors({"required":"得至少上传！"+rulues["arrayUploadRequired"]+"个图吧！"});
              grandfatherControl.setValue("得至少上传！"+rulues["arrayUploadRequired"]+"个图吧！");
            }else{
              grandfatherControl.setErrors({});
              grandfatherControl.setValue("");
            }
            //clearTimeout(lazyTimerId);
          },10);
        }
      }else if(key=="checkboxWatchers"){
        error= {};
        let propName:any=param["prop"];
        let formModel:any=param["formModel"];
        let formGroup:any=param["formGroup"];
        if(formGroup){
          let queryParam:any={};
          let grandfather:any=param["grandfather"];
          if(!formGroup){
            continue;
          }
          let grandfatherControl:any=formGroup.get(grandfather);
          let lazyTimerId:any=setTimeout(function () {
            grandfatherControl.controls.forEach((optionControl:any)=>{
              let isChecked:any=optionControl.value.checked;
              let optionValue:any=optionControl.value.value;
              for(let queryProp in formModel.elements){
                let item:any=formModel.elements[queryProp];
                let innerProp:any=item.prop;
                if(propName!=innerProp&&item.switcher&&item.switcher[0].prop==propName){
                  let watchersControl:any=formGroup.get(innerProp);
                  let watcherValue:any=item.switcher[0].showValue;
                  if(watcherValue==optionValue){
                    if(isChecked){
                      watchersControl.enable({onlySelf:false,emitEvent:false});
                      item.hidden=false;
                    }else{
                      watchersControl.disable({onlySelf:false,emitEvent:false});
                      item.hidden=true;
                    }
                  }
                }
              }
            });
            //clearTimeout(lazyTimerId);
          },10);
        }
        break;
      }else if(key=="arrayWatchers"){
        error= {};
        if(!prop.parent) return;
        let propName:any=prop.parent.controls["prop"].value;// who am i
        let formModel:any=param["formModel"];
        let formGroup:any=param["formGroup"];
        if(formGroup){
          let queryParam:any={};
          let grandfather:any=param["grandfather"];
          if(!formGroup){
            continue;
          }
          let formValues={};
          formGroup.value[grandfather].forEach((item:any)=>{
            formValues[item.prop]=item.value;
          });
          let grandfatherControl:any=formGroup.get(grandfather);
          formModel.elements.forEach((element:any)=>{
            if(element.type=="array"&&element.keyPropMap&&grandfather==element.prop){
              element.options.forEach((option:any)=>{
                if(option.switchers&&option.switchers.length>0&&option.switchers[0].prop==propName){
                  if(option.remoteInfo!=null){
                    option.remoteInfo.param[option.remoteInfo.param["extend"]]=value;
                    if(option.remoteInfo.propMap){
                      for(let propKey in option.remoteInfo.propMap){
                        option.remoteInfo.param[option.remoteInfo.propMap[propKey]]=propKey==propName?value:formValues[propKey];
                      }
                    }
                    if(value==""||value==null){
                      option["options"]=option.remoteInfo.convert({});
                    }else{
                      console.log("element",element.prop)
                      this.listData({url:option.remoteInfo.url,param:option.remoteInfo.param,httpMethod:option.remoteInfo.httpMethod}).subscribe((data:any)=>{
                        option["options"]=option.remoteInfo.convert(data.json())||data.json();
                      });
                    }
                  }
                }
              })
            }
          })
          grandfatherControl.controls.forEach((optionControl:any)=>{
            if(optionControl.controls["switchers"]&&optionControl.controls["switchers"].value["prop"]==propName&&optionControl.controls["value"].value!=""){
              optionControl.controls["value"].setValue("");
            }
          });
          //formGroup.get(grandfather+"LinkValidate").setErrors({});
        }
        break;
      }else if(key=="watchers"){
        error= {};
        let propName:any=param["prop"];
        let formModel:any=param["formModel"];
        let formGroup:any=prop.parent;
        if(formGroup){
          let queryParam:any={};
          for(let queryProp in formModel.elements){
            let item:any=formModel.elements[queryProp];
            let innerProp:any=item.prop;
            if(propName!=innerProp&&item.switcher&&item.switcher[0].prop==propName){
              let watchersControl:any=formGroup.get(innerProp);
              let watcherValue:any=item.switcher[0].showValue;
              if(watcherValue==prop.value){
                watchersControl.enable({onlySelf:false,emitEvent:false});
                item.hidden=false;
              }else{
                watchersControl.disable({onlySelf:false,emitEvent:false});
                item.hidden=true;
              }
            }
          }
        }
        break;
      }else if(key=="remote"){
        //http 远程验证。。。
        let formGroup:any=prop.parent;
        if(formGroup){
          let queryParam:any={};
          for(let queryProp in param){
            queryParam[queryProp]=formGroup.get(queryProp).value;
          }
          this.remoteSyncValidate({body:queryParam,value:value},remoteService).subscribe((item:any)=>{
            prop.setErrors({"remote":item.json().msg});
          });
        }
      }
    }
    return error;
  }

  /**
   * 远程异步校验 放在这里是为了这个校验比较复杂 需要单独处理
   * @param param 校验参数
   */
  remoteValidate(param:any,remoteService:any={}):any{
    let queryParam:any={
        url:remoteService.url,
        baseUrl:remoteService.baseUrl,
        param:param.body,
        httpMethod:"post"
    };
    return new Promise(resolve=>{
      let remoteCheckResult=this.listData(queryParam);
        remoteCheckResult.subscribe((data:any)=>{
          let result=data.json();
          if(result.code=="1"){
            resolve();
          }else{
            if(param.value=="admin"){
              resolve({"remote":result.msg});
            }else{
              resolve();
            }
          }
        })
    })
  }

  /**
   * 远程异步校验使用同步方法可能导致页面闪烁 放在这里是为了这个校验比较复杂 需要单独处理
   * @param param 校验参数
   */
  remoteSyncValidate(param:any,remoteService:any={}):any{
    let queryParam:any={
        url:remoteService.url,
        baseUrl:remoteService.baseUrl,
        param:param.body,
        httpMethod:"post"
    };
    return this.listData(queryParam);
  }
}
