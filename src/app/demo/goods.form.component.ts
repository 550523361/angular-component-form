import {FormBuilder, Validators} from "@angular/forms";
import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {BaseValidateService} from "../../service/validate/base.validate.service";
import {BaseDataService} from "angular-component-service";
import {BaseFormCreateComponent} from "../../form/base.from.create.component";
/**
 * Created by xkfeng on 2017/5/4.
 *
 * create goods  form
 *
 */


@Component({
  selector:"goods-from-create",
  templateUrl:"../../form/base.from.create.component.html",
  styleUrls:["../../form/base.from.create.component.css"],
  providers:[BaseValidateService,BaseDataService]
})
export class GoodsFormComponent extends BaseFormCreateComponent implements OnInit{
  constructor(
    public formBuilder:FormBuilder,public baseValidateService:BaseValidateService,public baseDataService:BaseDataService,private router:Router
  ){
    super(formBuilder,baseDataService);
  }
  ngOnInit(){
    this.formModel={
      url:"goods/saveGoods.json",
      elements:[
        {
          type:"input",
          label:"远程校验",
          prop:"name",
          removeValidateUrl:"",
          placeholder:"请输入名称",
          defaultValue:"",
          required:true,
          switcher:[{
            prop:"sports",
            showValue:2
          },{
            prop:"sex",
            showValue:0
          }],
          validates:[(control:any)=>{
            let remoteValidateRequiredParam={"name":true,name1:true};
            let remoteService={
              url:"goods/existName",
              baseUrl:"https://testmerchant.goodaa.com.cn/ejiazi-merchant/",
            };
            return this.baseValidateService.baseValidate(control,{remote:true},remoteValidateRequiredParam,remoteService);
          }]
        },
        {
          type:"input",
          label:"名称1",
          prop:"name1",
          removeValidateUrl:"",
          placeholder:"请输入名称",
          defaultValue:"",
          required:true,
          switcher:[
            {
              prop:"sports",
              showValue:1
            }
          ],
          validates:[(data:any)=>{
            let error=this.baseValidateService.baseValidate(data,{required:true,maxlength:15,minlength:1,number:"###.##",maxvalue:300.01,minvalue:100.00});
            return error;
          }]
        },
        {
          type:"radio",
          label:"性别",
          prop:"sex",
          defaultValue:"0",
          switcher:[
            {
              prop:"sports",
              showValue:3
            }
          ],
          options:[
            {
              label:"男",
              value:"0"
            },
            {
              label:"女",
              value:"1"
            }
          ],
          placeholder:"请输入名称",
          required:true,
          validates:[
            (control:any)=>{
              let param={prop:"sex",formModel:this.formModel};
              return this.baseValidateService.baseValidate(control,{watchers:true},param);
            }
          ],
        },
        {
          type:"checkbox",
          label:"爱好",
          prop:"love",
          options:[
            {
              label:"看报",
              value:"0"
            },
            {
              label:"看电视",
              value:"1"
            },
            {
              label:"交友",
              value:"2"
            },
            {
              label:"创作",
              value:"3"
            }
          ],
          placeholder:"请输入名称",
          defaultValue:"",
          required:true,
          validates:[Validators.required,Validators.maxLength(5)]
        },
        {
          type:"checkbox",
          label:"体育运动",
          prop:"sports",
          options:[
            {
              label:"跑步",
              value:"0"
            },
            {
              label:"健身",
              value:"1"
            },
            {
              label:"瑜伽",
              value:"2"
            },
            {
              label:"太极",
              value:"3"}
          ],
          placeholder:"请输入名称",
          defaultValue:"2",
          required:true,
          validates:[(control:any)=>{
            let param={prop:"sports",formModel:this.formModel,grandfather:"sports",formGroup:this.formGroup};
            this.baseValidateService.baseValidate(control,{checkboxRequired:true,checkboxWatchers:true},param)
          }]
        },
        {
          type:"input",
          label:"内增高",
          switcher:[{
            prop:"sex",
            showValue:"1"
          }],
          prop:"innerHeight",
          validates:[
            (data:any)=>{
              return this.baseValidateService.baseValidate(data,{required:true,number:"##.##",maxvalue:10,minvalue:0.5})
            }
          ]
        },
        {
          type:"array",
          label:"活动时间",
          prop:"compSizeInnerHeight",
          options:[
            {
              label:"",
              type:"input",
              prop:"compA",
              value:"0"
            },
            {
              label:"至",
              type:"input",
              prop:"compB",
              value:"1"
            },
          ],
          validates:[
            (data:any)=>{
             // return this.baseValidateService.baseValidate(data,{required:true,number:"##.##",maxvalue:10,minvalue:0.5})
            }
          ]
        },
        {
          label:"头像",
          prop:"photo",
          type:"upload",
          multiple:false,
          uploadClass:{myUploadStyle:true},
          imageConfig:{id:"imgId",url:"imageUrl",detail:"大转盘分享图标大小",size:"<30k","validate":true,extend:".png,.jpeg,.jpg"},
          validates:[(control:any)=>{
            console.log(control.value);
            this.baseValidateService.baseValidate(control,{required:true});
          }]
        },
        {
          label:"详情图片",
          prop:"detail",
          type:"upload",
          multiple:false,
          uploadClass:{myUploadStyle2:true},
          imageConfig:{id:"imgId",url:"imageUrl",detail:"大转盘分享图标大小",size:"<30k","validate":true,extend:".png,.jpeg,.jpg"},
          validates:[(control:any)=>{
            console.log(control.value);
            this.baseValidateService.baseValidate(control,{required:true});
          }]
        },
        {
          label:"商品详情图",
          type:"array",
          prop:"goodsDetailImages",
          validates:[],
          options:[
            {
              label:"",
              prop:"detailA",
              type:"upload",
              value:"",
              multiple:false,
              uploadClass:{myUploadStyle2:true},
              imageConfig:{id:"imgId",url:"imageUrl",detail:"大转盘分享图标大小",size:"<30k","validate":true,extend:".png,.jpeg,.jpg"},
              validates:[(control:any)=>{
                console.log(control.value);
                this.baseValidateService.baseValidate(control,{required:true});
              }]
            },
            {
              label:"",
              prop:"detailB",
              value:"",
              type:"upload",
              multiple:false,
              uploadClass:{myUploadStyle2:true},
              imageConfig:{id:"imgId",url:"imageUrl",detail:"大转盘分享图标大小",size:"<30k","validate":true,extend:".png,.jpeg,.jpg"},
              validates:[(control:any)=>{
                console.log(control.value);
                this.baseValidateService.baseValidate(control,{required:true});
              }]
            },
            {
              label:"",
              prop:"detailC",
              value:"",
              type:"upload",
              multiple:false,
              uploadClass:{myUploadStyle2:true},
              imageConfig:{id:"imgId",url:"imageUrl",detail:"大转盘分享图标大小",size:"<30k","validate":true,extend:".png,.jpeg,.jpg"},
              validates:[(control:any)=>{
                console.log(control.value);
                this.baseValidateService.baseValidate(control,{required:true});
              }]
            }
          ]
        }
      ]
    };
    this.initForm()
  }


  open(){

  }

  close(data:any){
    console.log("closedata",data)
  }

  submit(){
    console.log("sub sub this.formGroup",this.formGroup.value)
    this.baseDataService.listData({url:this.formModel.url,param:this.formGroup.value,httpMethod:"post"}).subscribe((data:any)=>{
      console.log(data)
    },(error:any)=>{
      console.log(error);
      this.router.navigate(["lotteryList"])
    })
  }
}


