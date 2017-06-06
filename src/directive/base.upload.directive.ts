import {Directive, ElementRef, HostListener, Input} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
/**
 * Created by Administrator on 2017/5/4.
 */

@Directive({
  selector:"[fileUpload]"
})
export class BaseUploadDirective{

  @Input()
  uploadConfig:any;

  constructor(public elementRef:ElementRef){

  }


  @HostListener("change")
  uploadFile(){
    let formControl=this.uploadConfig.formControl as FormControl;
    let imgConfig=this.uploadConfig.config;
    let element=this.elementRef.nativeElement;
    this.checkImgUpload(element,imgConfig,formControl);
  }

  upload(element:any,url:any,formControl:any,imgConfig:any) {
          let xmlHttpRequest = new XMLHttpRequest();
          let genId = "UPLOAD_" + new Date().getTime();
          let file = element;
          let format = file["files"][0].name;
          let _index = format.lastIndexOf(".") + 1;
          let _length = format.length;
          let _string = format.substr(_index, _length).toLowerCase();
          if (_string != 'jpg' && _string != 'gif' && _string != 'jpeg' && _string != 'png') {
            alert("选择的文件应该为图片");
            return false;
          }
          let formData = new FormData();
          formData.append(genId, file["files"][0]);
          if(file["files"].length>1){
            for(let i=1;i<file["files"].length;i++){
              let genId2 = "UPLOAD_" + new Date().getTime()+Math.ceil(Math.random()*1000000);
              formData.append(genId2, file["files"][i]);
            }
          }
          xmlHttpRequest.open("POST", url, true);
          xmlHttpRequest.send(formData);
          xmlHttpRequest.onreadystatechange = function () {
            if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
              let ids = JSON.parse(xmlHttpRequest.responseText);
              if (ids != null) {
                let imageInfo={};
                for (let i = 0; i < ids.data.length; i++) {
                  let data = ids.data[i];
                  let imgId = data.imageId;
                  let imgUrl = data.imageUrl;
                  if(imgConfig){
                    imageInfo[imgConfig.id]=imgId;
                    imageInfo[imgConfig.url]=imgUrl;
                  }else{
                    imageInfo["imgId"]=imgId;
                    imageInfo["imgUrl"]=imgUrl;
                  }
                  imageInfo["showUrl"]=imgUrl;
                }
                formControl.setValue(imageInfo);
                element.value="";//删除之后再上传同个图片 这个需求貌似不合理 会产生垃圾图片
              }
            }
          }
}

  //uploadConfigMap = JSON.parse('{"merchant-logo":{"key":"merchant-logo","detail":"商户logo","width":"200","height":"200","size":"<10000000","validate":false},"merchant-header":{"key":"merchant-header","detail":"店铺首图","width":"750","height":"263","size":"<100k","validate":false},"merchant-show":{"key":"merchant-show","detail":"店铺宣传图","width":"750","height":"<1500","size":"<200k","validate":false},"merchant-id-f#merchant-id-b":{"key":"merchant-id-f#merchant-id-b","detail":"身份证照片","validate":false},"merchant-yyzz-three2one":{"key":"merchant-yyzz-three2one","detail":"营业执照3合1","validate":false},"merchant-other":{"key":"merchant-other","detail":"其它证件1电子版","validate":false},"merchant-yyzz-one2one":{"key":"merchant-yyzz-one2one","detail":"营业执照单独","validate":false},"merchant-zzjg":{"key":"merchant-zzjg","detail":"组织机构代码证电子版","validate":false},"merchant-swdj":{"key":"merchant-swdj","detail":"税务登记证电子版","validate":false},"mall-catergory":{"key":"mall-catergory","detail":"电商商品分类","width":"200","height":"200","size":"<50k","extend":"png、jpeg、jpg","validate":false},"advance-assets":{"key":"advance-assets","detail":"上传素材","width":"750","height":"280","size":"50k","extend":"bmp、png、jpeg、jpg、gif","validate":false},"push-header-tgwxc-large":{"key":"push-header-tgwxc-large","detail":"首页-推广位宣传图","width":"374","height":"300","size":"<200k","extend":"png、jpeg、jpg","validate":false},"push-header-tgwxc":{"key":"push-header-tgwxc","detail":"首页-推广位宣传图","width":"374","height":"150","size":"<200k","extend":"png、jpeg、jpg","validate":false},"push-header-tonglan":{"key":"push-header-tonglan","detail":"首页-通栏推广1宣传","width":"730","height":"250","size":"<100k","extend":"png、jpeg、jpg","validate":false},"push-header-bqhh-loop":{"key":"push-header-bqhh-loop","detail":"首页-必抢好货轮播图","width":"288","height":"216","size":"<200k","extend":"png、jpeg、jpg","validate":false},"mall-fix-catergory":{"key":"mall-fix-catergory","detail":"商城-固定分类","width":"150","height":"150","size":"<200k","extend":"png、jpeg、jpg","validate":false},"mall-zxhw-goods":{"key":"mall-zxhw-goods","detail":"商城-甄选好物","width":"288","height":"216","size":"<200k","extend":"png、jpeg、jpg","validate":false},"mall-zxhw-merchant":{"key":"mall-zxhw-merchant","detail":"商城-优质店铺","width":"288","height":"216","size":"<200k","extend":"png、jpeg、jpg","validate":false},"mall-advace-catergory":{"key":"mall-advace-catergory","detail":"商城-分类广告图","width":"730","height":"250","size":"<100k","extend":"png、jpeg、jpg","validate":false},"visit-push":{"key":"visit-push","detail":"上门-推广位1宣传图","width":"374","height":"300","size":"<200k","extend":"png、jpeg、jpg","validate":false},"presell-activity-lager":{"key":"presell-activity-lager","detail":"活动大图区","width":"750","height":"<1000000","size":"<100k","extend":"png、jpeg、jpg","validate":false},"presell-goods":{"key":"presell-goods","detail":"预售商品1图","width":"246","height":"184","size":"<100k","extend":"png、jpeg、jpg","validate":false},"presell-bottom":{"key":"presell-bottom","detail":"底部规则图片","width":"750","height":"<1000000","size":"<100k","extend":"png、jpeg、jpg","validate":false},"merchant-goods-header":{"key":"merchant-goods-header","detail":"头图","width":"344","height":"258","size":"<200k","extend":"png、jpeg、jpg","validate":false},"merchant-goods-focus":{"key":"merchant-goods-focus","detail":"焦点图","width":"750","height":"562","size":"<200k","extend":"png、jpeg、jpg","validate":false},"merchant-goods-detail":{"key":"merchant-goods-detail","detail":"详情图","width":"50","height":"<1500px","size":"<200k","extend":"png、jpeg、jpg","validate":false},"property-notice-content-img":{"key":"property-notice-content-img","detail":"图文内容","width":"680","height":"406","size":"<60k","validate":false},"backend-lottery-share-img":{"key":"backend-lottery-share-img","detail":"大转盘分享图标大小","size":"<30k","validate":true}}');

  getFileExtend(fileName:any) {
    fileName = fileName || "";
    return fileName.substring(fileName.lastIndexOf(".") + 1);
  }

  checkImgUpload(element:any,imageConfig:any,formControl:any) {
      if(!imageConfig.validate){
        let uploadUrl="https://testbackend.goodaa.com.cn/ejiazi-upload/image/upload.do?belongId="+Math.random();
        this.upload(element,uploadUrl,formControl,imageConfig);
        return;
      }
      let fileObj = element.files[0];
      let fileSize = fileObj.size;
      let fileType = fileObj.type;

      let imgConfig = imageConfig;
      if (imgConfig == undefined || imgConfig == null) {
        imgConfig = {};
      }
      let fileExtend = imgConfig.extend;
      let currentExtend = this.getFileExtend(fileObj.name);
      if (fileExtend && !(fileExtend.indexOf(currentExtend) >= 0)) {
        let errMessage = "文件格式不正确，应为：" + fileExtend + " 所选文件为：" + currentExtend + " 请重新选择符合要求的文件！";
        formControl.setErrors({"fileError":errMessage});
        return;
      }
      let upload=this.upload;

      let localImgSrc = window.navigator.userAgent.indexOf("Chrome") >= 1 || window.navigator.userAgent.indexOf("Safari") >= 1 ? window["webkitURL"].createObjectURL(element["files"][0]) : window.URL.createObjectURL(element["files"][0]);
      let testImg = new Image();
      testImg.src = localImgSrc;
      testImg.onload = function (event) {
        //console.log(fileObj, "*******************", testImg.width, testImg.height, key);
        if (imgConfig && imgConfig.validate) {
          let filePermisionConfig = {
            width: imgConfig.width,
            maxWidth: imgConfig.width,
            height: /^</.test(imgConfig.height) ? null : imgConfig.height,
            maxHeight: /^</.test(imgConfig.height) ? imgConfig.height.replace("<", "") : null,
            maxFileSize: (imgConfig.size == null || imgConfig.size == undefined) ? null : imgConfig.size.replace("<", "").replace("k", "") * 1024
          };
          //console.log(filePermisionConfig, testImg)
          let errMessage="";
          if (/^\d+$/.test(filePermisionConfig.maxWidth) && filePermisionConfig.width * 1 != testImg.width) {
             errMessage = "允许图片宽度为：" + filePermisionConfig.width + " 所选文件宽度为：" + testImg.width + " 请重新选择符合要求的文件！";
          }
          if (/^\d+$/.test(filePermisionConfig.height) && filePermisionConfig.height * 1 != testImg.height) {
             errMessage = "允许图片高度为：" + filePermisionConfig.height + " 所选文件高度为：" + testImg.height + " 请重新选择符合要求的文件！";
          }

          if (/^\d+$/.test(filePermisionConfig.maxWidth) && filePermisionConfig.maxWidth * 1 < testImg.width) {
             errMessage = "允许图片宽度为：" + filePermisionConfig.maxWidth + " 所选文件宽度为：" + testImg.width + " 请重新选择符合要求的文件！";
          }
          if (/^\d+$/.test(filePermisionConfig.maxHeight) && filePermisionConfig.maxHeight * 1 < testImg.height) {
             errMessage = "允许图片最大高度为：" + filePermisionConfig.maxHeight + " 所选文件高度为：" + testImg.height + " 请重新选择符合要求的文件！";
          }
          if (/^\d+$/.test(filePermisionConfig.maxFileSize+"") && filePermisionConfig.maxFileSize * 1 < fileSize) {
             errMessage = "允许图片最大为：" + filePermisionConfig.maxFileSize / 1024 + "k 所选文件大小为：" + fileSize / 1024 + "k 请重新选择符合要求的文件！";
          }
          if(errMessage!=""){
            formControl.setErrors({"fileError":errMessage});
            return;
          }
          let uploadUrl="https://testbackend.goodaa.com.cn/ejiazi-upload/image/upload.do?belongId="+Math.random();
          upload(element,uploadUrl,formControl,imageConfig);

    }
  }
}

}
