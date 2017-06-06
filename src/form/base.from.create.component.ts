import {Component} from "@angular/core";
import {FormBuilder, FormGroup, FormArray, FormControl} from "@angular/forms";
import {BaseDataService} from "angular-component-service";
import {BaseCustomerKeysPipe} from "../pipe/base.customer.keys.pipe";

@Component({
  template:"<span></span>",
  providers:[BaseCustomerKeysPipe]
})
export class BaseFormCreateComponent{

  formGroup:FormGroup;
  formModel:any;
  constructor( public formBuilder:FormBuilder,public baseDataService:BaseDataService){

  }

  submit(){
    console.log("submit data....")
  }

  initForm(){
    this.formGroup=this.formBuilder.group(this.recreateFormByModel());
  }

  chooseResultFun(data:any){
    console.log("chooseResult",data);
  }

  operateUtil($event:any,element:any,operateType:any,formControl:any,index:any){
    $event.stopPropagation();
    $event.preventDefault();
    console.log(element,operateType,formControl,index,typeof formControl,formControl instanceof FormControl);
    if(operateType=="remove"){
      formControl.setValue("");
    }else if(operateType=="left"){
      let groupArray:any=this.formGroup.get(element.prop) as FormArray;
      let options:any=groupArray.controls;
      let operateOption:any=options.splice(index,1)[0];
      options.splice(index-1,0,operateOption);
    }else if(operateType=="right"){
      let groupArray:any=this.formGroup.get(element.prop) as FormArray;
      let options:any=groupArray.controls;
      let operateOption:any=options.splice(index,1)[0];
      options.splice(index+1,0,operateOption);
    }
  }

  recreateFormByModel(){
    let formGroupModel:any={};
    this.formModel.elements.forEach((item:any)=>{
      if(item.type=="checkbox"){
        const addressFGs = item.options.map((option:any)=> {
          let optionModel:any={};
          for(let prop in option){
            if(prop=="value"){
              optionModel[prop]=[option[prop],item.validates];
            }else{
              optionModel[prop]=[option[prop]];
            }
          }
          if(item.type=="checkbox"){
            optionModel["checked"]=[item.defaultValue==option.value,item.validates];
          }

          if(option.type=="select"){
            if(option.remoteInfo!=null){
              this.baseDataService.listData({url:option.remoteInfo.url,param:option.remoteInfo.param,httpMethod:option.remoteInfo.httpMethod}).subscribe((data:any)=>{
                item["options"+option.prop]=option.remoteInfo.convert(data.json())||data.json();
              })
            }
          }

          return this.formBuilder.group(optionModel);
        });
        const addressFormArray:any = this.formBuilder.array(addressFGs);
        formGroupModel[item.prop]=addressFormArray;
        if(item.type=="array"&&!item.noNeedValidateElement==true){
          formGroupModel[item.prop+"LinkValidate"]=[item.defaultValue,[(control:any)=>{
            if(control.value!=""){
              return {"required":control.value}
            }
          }]];
        }
      }else if(item.type=="array"){
        let keyPropMap:any={};
        const addressFGs:any = item.options.map((option:any,index:any) => {
          option["value"]=[option["value"],item.validates];
          keyPropMap[option.prop]=index;
          if(option.type=="select"){
            if(option.remoteInfo!=null&&option.init){
              this.baseDataService.listData({url:option.remoteInfo.url,param:option.remoteInfo.param,httpMethod:option.remoteInfo.httpMethod}).subscribe((data:any)=>{
                option["options"]=option.remoteInfo.convert(data.json())||data.json();
              })
            }
          }
          return this.formBuilder.group(option);
        });
        item["keyPropMap"]=keyPropMap;
        const addressFormArray:any = this.formBuilder.array(addressFGs);
        formGroupModel[item.prop]=addressFormArray;
        if(item.type=="array"&&!item.noNeedValidateElement==true){
          formGroupModel[item.prop+"LinkValidate"]=[item.defaultValue,[(control:any)=>{
            if(control.value!=""){
              return {"required":control.value}
            }
          }]];
        }
      }else if(item.type=="select"){
        if(item.remoteInfo!=null){
          this.baseDataService.listData({url:item.remoteInfo.url,param:item.remoteInfo.param,httpMethod:item.remoteInfo.httpMethod}).subscribe((data:any)=>{
            item.options=item.remoteInfo.convert(data.json())||data.json();
          })
        }
        formGroupModel[item.prop]=[item.defaultValue,item.validates,item.asyncValidates];
      }else{
        formGroupModel[item.prop]=[item.defaultValue,item.validates,item.asyncValidates];
      }
    });
    return formGroupModel;
  }
}
