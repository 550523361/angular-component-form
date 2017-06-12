import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {BaseValidateService} from "../../service/validate/base.validate.service";
import {BaseDataService} from "angular-component-service";
/**
 * Created by xkfeng on 2017/5/4.
 *
 * create goods  form
 *
 */


@Component({
  selector:"goods-from-create",
  template:"<base-easy-form-component [formModel]='formModel'></base-easy-form-component>",
  providers:[BaseDataService]
})
export class GoodsEasyFormComponent{
  constructor(
    public baseDataService:BaseDataService,private router:Router
  ){
  }

  formModel:any={
  url:"goods/saveGoods.json",
  submit:(value:any)=>{
    this.submit(value);
  },
  elements:[
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
      defaultValue:"0",
      required:true,
      validate:{checkboxRequired:true,checkboxWatchers:true}
    },
    {
      type:"input",
      label:"名称测试",
      prop:"nameTest",
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
      validate:{required:true,maxlength:15,minlength:1,number:"###.##",maxvalue:300.01,minvalue:100.00}
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
          required:true,
          value:"0"
        },
        {
          label:"至",
          type:"input",
          prop:"compB",
          value:"1"
        },
      ]
    },
    {
      label:"头像",
      prop:"photo",
      type:"upload",
      multiple:false,
      uploadClass:{myUploadStyle:true},
      imageConfig:{id:"imgId",url:"imageUrl",detail:"大转盘分享图标大小",size:"<30k","validate":true,extend:".png,.jpeg,.jpg"},
      validate:{required:true}
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
          imageConfig:{id:"imgId",url:"imageUrl",detail:"大转盘分享图标大小",size:"<30k","validate":true,extend:".png,.jpeg,.jpg"}
        },
        {
          label:"",
          prop:"detailB",
          type:"upload",
          value:"",
          multiple:false,
          uploadClass:{myUploadStyle2:true},
          imageConfig:{id:"imgId",url:"imageUrl",detail:"大转盘分享图标大小",size:"<30k","validate":true,extend:".png,.jpeg,.jpg"}
        }
      ],
      validate:{arrayUploadRequired:2}
    }
  ],
  sourceData:{
    sports:2,
    compA:"compAcompA",
    compB:"compAcompB",
    nameTest:"nameTest",
    detailA:{ "imgId": 62153, "imageUrl": "http://ejiaziimgtest.goodaa.com.cn/pic_8f3ccdee-0138-4380-9221-26c0b389e4c6.jpg", "showUrl": "http://ejiaziimgtest.goodaa.com.cn/pic_8f3ccdee-0138-4380-9221-26c0b389e4c6.jpg" },
    detailB:{ "imgId": 62152, "imageUrl": "http://ejiaziimgtest.goodaa.com.cn/pic_73c0d7b9-b7a2-4782-ba7b-fb95876f2697.jpg", "showUrl": "http://ejiaziimgtest.goodaa.com.cn/pic_73c0d7b9-b7a2-4782-ba7b-fb95876f2697.jpg" },
    photo:{ "imgId": 62152, "imageUrl": "http://ejiaziimgtest.goodaa.com.cn/pic_73c0d7b9-b7a2-4782-ba7b-fb95876f2697.jpg", "showUrl": "http://ejiaziimgtest.goodaa.com.cn/pic_73c0d7b9-b7a2-4782-ba7b-fb95876f2697.jpg" }
  }
};

  submit(value:any){
    console.log("sub sub this.formGroup",value)
    this.baseDataService.listData({url:this.formModel.url,param:value,httpMethod:"post"}).subscribe((data:any)=>{
      console.log(data)
    },(error:any)=>{
      console.log(error);
      this.router.navigate(["lotteryList"])
    })
  }
}


