import {Component, OnInit} from "@angular/core";
import {BaseDataService} from "angular-component-service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {BaseValidateService} from "../../service/validate/base.validate.service";
import {BaseFormCreateComponent} from "../../form/base.from.create.component";

@Component({
  selector:"create-goods-form",
  templateUrl:"../../form/base.from.create.component.html",
  styleUrls:["../../form/base.from.create.component.css"],
  providers:[BaseValidateService,BaseDataService]
})
export class CreateGoodsFormComponentFormGroup extends BaseFormCreateComponent implements OnInit{

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
          label:"详情图片     sdfasdf",
          prop:"detailPics",
          type:"array",
          multiple:false,
          uploadClass:{myUploadStyle2:true},
          options:[
            [
              {
                label:"",
                prop:"detailA",
                type:"upload",
                value:"",
                multiple:false,
                uploadClass:{myUploadStyle2:true},
                imageConfig:{id:"imgId",url:"imageUrl",detail:"大转cvhfghdfgh盘分享图标大小",size:"<30k","validate":true,extend:".png,.jpeg,.jpg"},
                validates:[(control:any)=>{
                  //let param={prop:"detailPics",formModel:this.formModel,grandfather:"detailPics",formGroup:this.formGroup};
                  console.log(control)
                  //return this.baseValidateService.baseValidate(control,{arrayUploadRequired:1},param);
                }]
              }
            ],
            [
              {
                label:"",
                prop:"detailB",
                value:"",
                type:"upload",
                multiple:false,
                imgId:"",
                uploadClass:{myUploadStyle2:true},
                imageConfig:{id:"imgId",url:"imageUrl",detail:"大转盘分享图标大小",size:"<30k","validate":true,extend:".png,.jpeg,.jpg"},
                validates:[(control:any)=>{
                  //let param={prop:"detailPics",formModel:this.formModel,grandfather:"detailPics",formGroup:this.formGroup};
                  console.log(control)
                  //return this.baseValidateService.baseValidate(control,{arrayUploadRequired:1},param);
                }]
              }
            ]
          ],
          validates:[(control:any)=>{
            //let param={prop:"detailPics",formModel:this.formModel,grandfather:"detailPics",formGroup:this.formGroup};
            console.log(control)
            //return this.baseValidateService.baseValidate(control,{arrayUploadRequired:1},param);
          }]
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
