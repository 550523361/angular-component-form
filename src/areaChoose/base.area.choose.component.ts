import {Component, Output, EventEmitter, OnInit} from "@angular/core";
import {BaseDataService} from "angular-component-service";
import {BaseValidateService} from "../service/validate/base.validate.service";
import {BaseFormCreateComponent} from "../form/base.from.create.component";
import {FormBuilder} from "@angular/forms";
/**
 * Created by xkfeng on 2017/5/10.
 */

declare var $:any;
@Component({
  selector:"base-area-choose",
  templateUrl:"./base.area.choose.component.html",
  styleUrls:["../form/base.from.create.component.css","./base.area.choose.component.css"],
  providers:[BaseDataService,BaseValidateService]
})
export class BaseAreaChooseComponent extends BaseFormCreateComponent implements OnInit{

  @Output()
  chooseResultEmitter:any=new EventEmitter<boolean>();

  noticeChooseResult(){
    let communityList:any=this.chooseArray;
    let areaList:any=this.chooseAreaArray;
    let data:any={
      communityList:communityList,
      areaList:areaList,
      list:areaList.concat(communityList)
    };
    this.noticeWrap(data);
  }

  noticeWrap(data:any){
    console.log("noticeWrap",data)
    this.chooseResultEmitter.emit(data);
  }

  constructor(
      public formBuilder:FormBuilder,
      public baseDataService:BaseDataService,
      public baseValidateService:BaseValidateService
  ){
    super(formBuilder,baseDataService,baseValidateService);

  }

  ngOnInit(){
    this.formModel={
      url:"goods/saveGoods.json",
      elements:[
        {
          label:"小区选择",
          type:"array",
          prop:"communityChoose",
          noNeedValidateElement:true,
          options:[
            {
              label:"",
              prop:"provinceId",
              defaultValue:"",
              type:"select",
              value:"",
              init:true,
              options:[
                {
                  label:"请选择省",
                  value:"0"
                }
              ],
              remoteInfo:{
                baseUrl:"https://testbackend.goodaa.com.cn/ejiazi-backend/",
                url:"citys/queryOpeningCitiesList.json",
                httpMethod:"get",
                param:{extend:"pid"},
                convert:(data:any)=>{
                  let options=[
                    {
                      label:"请选择",
                      value:""
                    }
                  ];
                  if(data&&data.citiesList){
                    data.citiesList.forEach(
                        (item:any)=>{
                          options.push({
                            label:item["name"],
                            value:item["id"]
                          })
                        }
                    )
                  }
                  return options;
                }
              },
              validates:[
                (control:any)=>{
                  console.log("aaaaaaaaaaaaaaaaaaaaaaa",control)
                  let param:any={prop:"province",formModel:this.formModel,grandfather:"activeTime",formGroup:this.formGroup};
                  this.baseValidateService.baseValidate(control,{checkboxWatchers:true},param)
                }
              ]
            },
            {
              label:"市",
              prop:"cityId",
              defaultValue:"",
              type:"select",
              switchers:[
                {
                  prop:"provinceId",
                  showValue:"0"
                }
              ],
              value:"",
              remoteInfo:{
                baseUrl:"https://testbackend.goodaa.com.cn/ejiazi-backend/",
                url:"citys/queryOpeningCitiesList.json",
                httpMethod:"get",
                param:{extend:"pid"},
                propMap:{areaProvinceId:"provinceId",areaCityId:"cityId",areaDistrictId:"districtId"},
                convert:(data:any)=>{
                  let options:any=[
                    {
                      label:"请选择",
                      value:""
                    }
                  ];
                  if(data&&data.citiesList){
                    data.citiesList.forEach(
                        (item:any)=>{
                          options.push({
                            label:item["name"],
                            value:item["id"]
                          })
                        }
                    )
                  }
                  return options;
                }
              }
            },
            {
              label:"区",
              prop:"districtId",
              defaultValue:"",
              type:"select",
              switchers:[
                {
                  prop:"cityId",
                  showValue:"0"
                }
              ],
              value:"",
              remoteInfo:{
                baseUrl:"https://testbackend.goodaa.com.cn/ejiazi-backend/",
                url:"citys/queryOpeningCitiesList.json",
                httpMethod:"get",
                param:{extend:"pid"},
                propMap:{areaProvinceId:"provinceId",areaCityId:"cityId",areaDistrictId:"districtId"},
                convert:(data:any)=>{
                  let options:any=[
                    {
                      label:"请选择",
                      value:""
                    }
                  ];
                  if(data&&data.citiesList){
                    data.citiesList.forEach(
                        (item:any)=>{
                          options.push({
                            label:item["name"],
                            value:item["id"]
                          })
                        }
                    )
                  }
                  return options;
                }
              }
            },
            {
              label:"小区名称",
              prop:"communityName",
              type:"input",
              defaultValue:"",
              remoteInfo:{
                baseUrl:"https://testbackend.goodaa.com.cn/ejiazi-backend/",
                url:"community/queryCommunitiesList.json",
                httpMethod:"get",
                param:{cityId:"testName",promotionType:"1",extend:"pid"},
                convert:(data:any)=>{
                  let options:any=[
                    {
                      label:"请选择",
                      value:""
                    }
                  ];
                  if(data&&data.citiesList){
                    data.citiesList.forEach(
                        (item:any)=>{
                          options.push({
                            label:item["name"],
                            value:item["id"]
                          })
                        }
                    )
                  }
                  return options;
                }
              }
            },
            {
              label:"搜索",
              prop:"searchBtn",
              type:"searchBtn",
              defaultValue:"",
              click:(data:any)=>{
                console.log(data);
                this.queryCommunityList(data);
              }
            }
          ],
          override:{grandfather:"communityChoose",prop:"provinceId"},
          validate:{arrayWatchers:1}
        },
        {
          label:"区域选择",
          type:"array",
          prop:"areaChoose",
          noNeedValidateElement:true,
          options:[
            {
              label:"",
              prop:"provinceId",
              defaultValue:"",
              type:"select",
              value:"",
              init:true,
              options:[
                {
                  label:"请选择省",
                  value:"0"
                }
              ],
              remoteInfo:{
                baseUrl:"https://testbackend.goodaa.com.cn/ejiazi-backend/",
                url:"citys/queryOpeningCitiesList.json",
                httpMethod:"get",
                param:{extend:"pid"},
                convert:(data:any)=>{
                  let options:any=[
                    {
                      label:"请选择",
                      value:""
                    }
                  ];
                  if(data&&data.citiesList){
                    data.citiesList.forEach(
                        (item:any)=>{
                          options.push({
                            label:item["name"],
                            value:item["id"]
                          })
                        }
                    )
                  }
                  return options;
                }
              },
              validate:{checkboxWatchers:true}
            },
            {
              label:"市",
              prop:"cityId",
              defaultValue:"",
              type:"select",
              switchers:[
                {
                  prop:"provinceId",
                  showValue:"0"
                }
              ],
              value:"",
              remoteInfo:{
                baseUrl:"https://testbackend.goodaa.com.cn/ejiazi-backend/",
                url:"citys/queryOpeningCitiesList.json",
                httpMethod:"get",
                param:{extend:"pid"},
                propMap:{provinceId:"provinceId",cityId:"cityId",districtId:"districtId"},
                convert:(data:any)=>{
                  let options:any=[
                    {
                      label:"请选择",
                      value:""
                    }
                  ];
                  if(data&&data.citiesList){
                    data.citiesList.forEach(
                        (item:any)=>{
                          options.push({
                            label:item["name"],
                            value:item["id"]
                          })
                        }
                    )
                  }
                  return options;
                }
              }
            },
            {
              label:"区",
              prop:"districtId",
              defaultValue:"",
              type:"select",
              switchers:[
                {
                  prop:"cityId",
                  showValue:"0"
                }
              ],
              value:"",
              remoteInfo:{
                baseUrl:"https://testbackend.goodaa.com.cn/ejiazi-backend/",
                url:"citys/queryOpeningCitiesList.json",
                httpMethod:"get",
                param:{extend:"pid"},
                propMap:{provinceId:"provinceId",cityId:"cityId",districtId:"districtId"},
                convert:(data:any)=>{
                  let options:any=[
                    {
                      label:"请选择",
                      value:""
                    }
                  ];
                  if(data&&data.citiesList){
                    data.citiesList.forEach(
                        (item:any)=>{
                          options.push({
                            label:item["name"],
                            value:item["id"]
                          })
                        }
                    )
                  }
                  return options;
                }
              }
            },
            {
              label:"环",
              prop:"rings",
              defaultValue:"",
              type:"select",
              switchers:[
                {
                  prop:"cityId",
                  showValue:"0"
                }
              ],
              value:"",
              remoteInfo:{
                baseUrl:"https://testbackend.goodaa.com.cn/ejiazi-backend/",
                url:"ring/queryOpeningRingList.json",
                httpMethod:"get",
                param:{},
                propMap:{provinceId:"provinceId",cityId:"cityId",districtId:"districtId"},
                convert:(data:any)=>{
                  let options:any=[
                    {
                      label:"请选择",
                      value:""
                    }
                  ];
                  if(data&&data.citiesList){
                    data.citiesList.forEach(
                        (item:any)=>{
                          options.push({
                            label:item["name"],
                            value:item["id"]
                          })
                        }
                    )
                  }
                  return options;
                }
              }
            },
            {
              label:"添加",
              prop:"addAreaBtn",
              type:"button",
              defaultValue:"",
              click:(data:any)=>{
                console.log(data)
                let area:any={name:""};
                data.forEach((item:any)=>{
                  area[item.prop]=item.value;
                  let areaName:any=$("[name="+item.prop+"]:last option:selected").text();
                  if(areaName!="请选择"&&area[item.prop]){
                    area.name+=(area.name==""?"":"-")+areaName;
                  }
                });
                this.chooseArea(area);
              }
            }
          ],
          override:{grandfather:"areaChoose"},
          validate:{arrayWatchers:1}
        }
      ]
    };
    this.initForm()
  }

  queryResultCommunityList:any;
  queryCommunityList(data:any){
    let queryParmaBody={};
    data.forEach((item:any)=>{
      queryParmaBody[item.prop]=item.value;
    });
    let queryParam={
      baseUrl:"https://testbackend.goodaa.com.cn/ejiazi-backend/",
      url:"community/queryCommunitiesList.json",
      httpMethod:"get",
      param:queryParmaBody
    }
    this.baseDataService.listData(queryParam).subscribe((resultDataRemote:any)=>{
      let resultData:any=resultDataRemote.json();
      if(resultData&&resultData.code==1){
        this.queryResultCommunityList=resultData.data;
      }
    });
  }
  chooseArray:any=[];
  chooseCommunity(community:any){
    let result:any=this.findCommunity(community.id,community);
    if(result==0){
      return;
    }
    if(!community["checked"]||community["checked"]==false){
      if(!result){
        community["checked"]=true;
        this.chooseArray.push(community);
      }
    }else{
      result["checked"]=false;
      this.removeCommunity(community.id);
    }
    this.noticeChooseResult();
  }

  findCommunity(findId:any,community:any){
    if(!this.isCommunityInChooseArea(community)){
      return 0;
    }
    let findCommunity:any=this.chooseArray.filter((community:any)=>{
      if(community.id==findId){
        return community;
      }
    });
    return findCommunity.length==0?null:findCommunity[0];
  }

  removeCommunity(removeId:any){
    let index:any=-1;
    let findIndex:any=this.chooseArray.forEach((community:any,seq:any)=>{
      if(community.id==removeId){
        community.checked=false;
        index=seq;
      }
    });
    this.chooseArray.splice(index,1);
    this.noticeChooseResult();
  }

  chooseAreaArray:any=[];

  chooseArea(area:any){
    let checkResult:any=this.checkAreaCanAdd(area);
    if(!checkResult){
      this.addArea(area);
    }
    this.noticeChooseResult();
  }

  checkAreaCanAdd(area:any){
    /*1：检查区域 被覆盖，2：检查区域 覆盖区域，3：检查区域覆盖小区*/
    let result:any;
    this.chooseAreaArray.forEach((arrayArea:any)=>{
      if(arrayArea.provinceId==area.provinceId){
        if(arrayArea.cityId==""&&arrayArea.cityId==""&&arrayArea.districtId==""&&arrayArea.rings==""){
          result=arrayArea;/*被省覆盖 不添加当前区域*/
          return;
        }
        if(arrayArea.cityId!=""&&arrayArea.cityId==area.cityId&&arrayArea.districtId==""&&arrayArea.rings==""){
          result=arrayArea;/*被城市覆盖 不添加当前区域*/
          return;
        }
        if(arrayArea.districtId!=""&&arrayArea.cityId==area.cityId&&arrayArea.districtId==area.districtId&&arrayArea.rings==""){
          result=arrayArea;/*被城区覆盖 不添加当前区域*/
          return;
        }
        if(arrayArea.districtId!=""&&arrayArea.cityId==area.cityId&&arrayArea.districtId==area.districtId&&area.rings!=""&&arrayArea.rings!=""&&arrayArea.rings>=area.rings){
          result=arrayArea;/*被有区环覆盖 不添加当前区域*/
          return;
        }
        if(arrayArea.districtId==""&&area.districtId==""&&arrayArea.cityId==area.cityId&&area.rings!=""&&arrayArea.rings!=""&&arrayArea.rings>=area.rings){
          result=arrayArea;/*被无区环覆盖 不添加当前区域*/
          return;
        }
        if(arrayArea.districtId==""&&area.districtId!=""&&area.rings!=""&&arrayArea.cityId==area.cityId&&area.rings!=""&&arrayArea.rings!=""&&arrayArea.rings>=area.rings){
          result=arrayArea;/*被无区环覆盖 不添加当前区域*/
          return;
        }
      }
    });
    console.log(result,area);

    let areaDeleteArr:any=[];
    /*查找被新区域覆盖的已选择的区域*/
    this.chooseAreaArray.forEach((arrayArea:any)=>{
      if(arrayArea.provinceId==area.provinceId&&arrayArea.cityId==area.cityId&&
          arrayArea.districtId==area.districtId&&arrayArea.rings==area.rings){
        //不要排除自己啊
        return;
      }
      if(arrayArea.provinceId==area.provinceId){
        if(arrayArea.cityId!=""&&area.cityId==""&&area.districtId==""&&area.rings==""){
          areaDeleteArr.push(arrayArea);/*省覆盖省下面任何区域*/
          return;
        }
        if(arrayArea.cityId==area.cityId&&area.cityId!=""&&area.districtId==""&&area.rings==""&&(arrayArea.districtId!=""||arrayArea.rings!="")){
          areaDeleteArr.push(arrayArea);/*城市覆盖其下面任何区域*/
          return;
        }
        if(arrayArea.districtId==area.districtId&&arrayArea.cityId==area.cityId&&area.cityId!=""&&area.districtId!=""&&area.rings==""&&arrayArea.rings!=""){
          areaDeleteArr.push(arrayArea);/*区覆盖其下面任何区域*/
          return;
        }
        if(area.districtId==""&&arrayArea.cityId==area.cityId&&area.cityId!=""&&area.rings>arrayArea.rings){
          areaDeleteArr.push(arrayArea);/*无区环覆盖其下面任何区域*/
          return;
        }
        if(arrayArea.districtId==area.districtId&&area.districtId!=""&&arrayArea.cityId==area.cityId&&area.cityId!=""&&arrayArea.rings!=""&&area.rings>arrayArea.rings){
          areaDeleteArr.push(arrayArea);/*有区环覆盖其下面任何区域*/
          return;
        }
        if(arrayArea.districtId==""&&area.districtId==""&&arrayArea.cityId==area.cityId&&area.cityId!=""&&arrayArea.rings!=""&&area.rings!=""&&area.rings>arrayArea.rings){
          areaDeleteArr.push(arrayArea);/*无区 对无区 环覆盖其下面任何区域*/
          return;
        }
        if(arrayArea.districtId!=""&&area.districtId==""&&arrayArea.cityId==area.cityId&&area.cityId!=""&&arrayArea.rings!=""&&area.rings!=""&&area.rings>=arrayArea.rings){
          areaDeleteArr.push(arrayArea);/*无区 对有区 环覆盖其下面任何区域*/
          return;
        }
        if(arrayArea.districtId==""&&area.districtId!=""&&arrayArea.cityId==area.cityId&&area.cityId!=""&&area.rings>arrayArea.rings){
          //areaDeleteArr.push(arrayArea);/*有区 对无区 环覆盖其下面任何区域*/
          return;
        }
      }
    });
    console.log("delete array",areaDeleteArr);
    this.removeArea(areaDeleteArr);

    //3.查找和删除小区
    let findDeleteCommunity:any=this.chooseArray.filter((community:any)=>{
      if(area.provinceId==community.provinceId&&area.cityId==""){
        return community;//省
      }else if(area.provinceId==community.provinceId&&area.cityId==community.cityId&&area.districtId==""&&area.rings==""){
        return community;//城市
      }else if(area.provinceId==community.provinceId&&area.cityId==community.cityId&&area.districtId==community.districtId&&area.rings==""){
        return community;//区
      }else if(area.provinceId==community.provinceId&&area.cityId==community.cityId&&area.districtId==""&&area.rings>=community.rings){
        return community;//无区环
      }else if(area.provinceId==community.provinceId&&area.cityId==community.cityId&&area.districtId==community.districtId&&area.rings>=community.rings){
        return community;//有区环
      }
    });

    console.log("findDeleteCommunity",findDeleteCommunity)

    this.removeCommunities(findDeleteCommunity);

    return result;
  }

  findArea(findId:any){
    let findCommunity:any=this.chooseAreaArray.filter((community:any)=>{
      if(community.id==findId){
        return community;
      }
    });
    return findCommunity.length==0?null:findCommunity[0];
  }

  addArea(area:any){
    this.chooseAreaArray.push(area);
  }

  removeArea(deleteArray:any){
    deleteArray.forEach((deleteArea:any)=>{
      let index:any=-1;
      let findIndex:any=this.chooseAreaArray.forEach((area:any,seq:any)=>{
        if(area.provinceId==deleteArea.provinceId&&area.cityId==deleteArea.cityId&&area.districtId==deleteArea.districtId&&area.rings==deleteArea.rings){
          index=seq;
        }
      });
      this.chooseAreaArray.splice(index,1);
    })
    this.noticeChooseResult();
  }

  /**
   * 批量删除小区
   * @param deleteArray
   */
  removeCommunities(deleteArray:any){
    deleteArray.forEach((deleteCommunity:any)=>{
      let index:any=-1;
      let findIndex:any=this.chooseArray.forEach((community:any,seq:any)=>{
        if(community.id==deleteCommunity.id){
          community.checked=false;
          index=seq;
        }
      });
      this.chooseArray.splice(index,1);
    })
    this.noticeChooseResult();
  }

  /**
   * 查找小区是否被已选择区域覆盖
   * @param community
   */
  isCommunityInChooseArea(community:any){
    let checkResult:any=this.chooseAreaArray.filter((area:any)=>{
      if(area.provinceId==community.provinceId&&area.cityId==""){
        return community;//省
      }else if(area.provinceId==community.provinceId&&area.cityId==community.cityId&&area.districtId==""&&area.rings==""){
        return community;//城市
      }else if(area.provinceId==community.provinceId&&area.cityId==community.cityId&&area.districtId==community.districtId&&area.rings==""){
        return community;//区
      }else if(area.provinceId==community.provinceId&&area.cityId==community.cityId&&area.districtId==""&&area.rings>=community.rings){
        return community;//无区环
      }else if(area.provinceId==community.provinceId&&area.cityId==community.cityId&&area.districtId==community.districtId&&area.rings>=community.rings){
        return community;//有区环
      }
    })
    return checkResult.length==0;
  }
}
