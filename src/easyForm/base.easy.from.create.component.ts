import {Component, Input, OnChanges, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, FormArray, FormControl} from "@angular/forms";
import {BaseDataService} from "angular-component-service";
import {BaseCustomerKeysPipe} from "../pipe/base.customer.keys.pipe";
import {BaseValidateService} from "../service/validate/base.validate.service";
import {isArray} from "rxjs/util/isArray";

@Component({
  selector:"base-easy-form-component",
  templateUrl:"./base.easy.from.create.component.html",
  styleUrls:["./base.easy.from.create.component.css"],
  providers:[BaseCustomerKeysPipe,BaseDataService,BaseValidateService]
})
export class BaseEasyFormCreateComponent implements OnChanges{
  formGroup:FormGroup;
  @Input()
  formModel:any;
  constructor( public formBuilder:FormBuilder,public baseDataService:BaseDataService,public baseValidateService:BaseValidateService){

  }

  ngOnChanges(){
    this.initForm();
  }
  submitForm(value){
    if(typeof this.formModel.submit  == "function"){
      value["range"]=this.serviceArea||"";
      /*初步清洗部分冗余结构*/
      if(this.formModel.washData!=false){
        for(let key in value){
          ////console.log(key+" is "+isArray(value[key]));
          if(isArray(value[key])&&value[key]){
            value[key]=value[key].map((item,seq)=>{
              if(item.type=="upload"){
                if(item.value){
                  item.value["index"]=seq;
                  return item.value;
                }
              }else if(item.type=="checkbox"){
                if(item.checked==true){
                  return item;
                }
              }else{
                return item;
              }
            }).filter(item=>{
              return item!=""&&item!=null;
            })
          }
        }
      }
      this.formModel.submit(value);
    }else{
      //console.warn("formModel no submit property can't submit form!");
    }
  }

  initForm(){
    this.formGroup=this.formBuilder.group(this.recreateFormByModel());
  }

  operateUtil($event:any,element:any,operateType:any,formControl:any,index:any){
    $event.stopPropagation();
    $event.preventDefault();
    //console.log(element,operateType,formControl,index,typeof formControl,formControl instanceof FormControl);
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
    let sourceData:any=this.formModel.sourceData||{}
    this.formModel.elements.forEach((item:any)=>{
      if(item.type=="checkbox"){
        const addressFGs = item.options.map((option:any)=> {
          let optionModel:any={};
          option.type=item.type;
          for(let prop in option){
            ////console.log("prop",prop)
            if(prop=="value"){
              optionModel[prop]=[option[prop],
                [(control:any)=>{
                  let param:any={
                    formModel:this.formModel,
                    formGroup:this.formGroup,
                    prop:item.prop,
                    grandfather:item.prop
                  };
                  let override:any=item.override;
                  if(override){
                    for(let key in override){
                      param[key]=override[key];
                    }
                  }
                  return this.baseValidateService.baseValidate(control,item.validate,param);
                }]
              ];
            }else{
              optionModel[prop]=[option[prop]];
            }
          }
          if(item.type=="checkbox"){
            let defaultValue:any=sourceData[item.prop]||item.defaultValue;
            ////console.log(item.prop,"defaultValue",defaultValue)
            optionModel["checked"]=[defaultValue==option.value,
              [(control:any)=>{
                let param:any={
                  formModel:this.formModel,
                  formGroup:this.formGroup,
                  prop:item.prop,
                  grandfather:item.prop
                };
                let override:any=item.override;
                if(override){
                  for(let key in override){
                    param[key]=override[key];
                  }
                }
                //console.log("*************",item.label)
                return this.baseValidateService.baseValidate(control,item.validate,param);
              }]
            ];
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
          let defaultValue:any=sourceData[option.prop]||option["value"];
          //console.log(option.prop,"defaultValue",defaultValue)
          option["value"]=[defaultValue,[(control:any)=>{
            let param:any={
              formModel:this.formModel,
              formGroup:this.formGroup,
              prop:item.prop,
              grandfather:item.prop
            };
            let override:any=item.override;
            if(override){
              for(let key in override){
                param[key]=override[key];
              }
            }
            return this.baseValidateService.baseValidate(control,item.validate,param);
          }]];
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
        if(item.type=="array"&&!item.noNeedValidateElement==true&&item.validate){
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
        formGroupModel[item.prop]=[item.defaultValue,
          [(control:any)=>{
            let param:any={
              formModel:this.formModel,
              formGroup:this.formGroup,
              prop:item.prop,
              grandfather:item.prop
            };
            let override:any=item.override;
            if(override){
              for(let key in override){
                param[key]=override[key];
              }
            }
            return this.baseValidateService.baseValidate(control,item.validate,param);
          }]
          ,item.asyncValidates];
      }else{
        let defaultValue:any=sourceData[item.prop]||item.defaultValue;
        //console.log(item.prop,"defaultValue",defaultValue)
        formGroupModel[item.prop]=[defaultValue,
          [(control:any)=>{
            let param:any={
              formModel:this.formModel,
              formGroup:this.formGroup,
              prop:item.prop,
              grandfather:item.prop
            };
            let override:any=item.override;
            if(override){
              for(let key in override){
                param[key]=override[key];
              }
            }
            return this.baseValidateService.baseValidate(control,item.validate,param);
          }]
          ,item.asyncValidates];
      }
    });
    return formGroupModel;
  }

  serviceArea:any;
  chooseResult(data:any){
    this.serviceArea=data;
  }
}
