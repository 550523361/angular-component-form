import {Component} from "@angular/core";
import {BaseDataService} from "angular-component-service";
import {Router} from "@angular/router";


@Component({
  selector:"create-goods-form",
  template:"<base-form-component [formModel]='formModel'></base-form-component>",
  providers:[BaseDataService]
})
export class CreateMallGoodsCatogeryFormComponent{

  constructor(
    public baseDataService:BaseDataService,private router:Router
  ){
  }

 formModel={
      url:"goods/saveGoods.json",
      submit:(value:any)=>{
        this.submit(value);
      },
      elements:[
        {
          type:"input",
          label:"分类名称",
          prop:"goodsType",
          removeValidateUrl:"",
          placeholder:"请输入商品类型",
          defaultValue:"",
          required:true,
          validate:{required:true,maxlength:5}
        },
        {
          label:"分类图标",
          prop:"firstPic",
          type:"upload",
          multiple:false,
          uploadClass:{myUploadStyle:true},
          require:true,
          defaultValue:"",
          imageConfig:{id:"imgId",url:"imageUrl",detail:"大转盘分享图标大小",size:"<30k","validate":true,extend:".png,.jpeg,.jpg"},
          validate:{required:true}
        },
      ]
    };

  submit(value:any){
    console.log("sub sub this.formGroup",value)
    this.baseDataService.listData({url:this.formModel.url,param:value,httpMethod:"post"}).subscribe((data:any)=>{
      console.log(data)
    },(error:any)=>{
      console.log(error);
    //  this.router.navigate(["lotteryList"])
    })
  }
}
