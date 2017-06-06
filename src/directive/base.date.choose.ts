/**
 * Created by Administrator on 2017/4/18.
 */
import {Directive, ElementRef, HostListener, Input, OnInit} from "@angular/core"
import {FormControl} from "@angular/forms";

declare var laydate:any;
declare var $:any;

@Directive({
  selector:'[dateChoose]'
})
export class BaseDateChooseDirective implements OnInit{
  @Input()
  chooseConfig:any;
  constructor(public elementPre:ElementRef){

  }

  @HostListener("click")
  onClick(){
    let element:any=this.elementPre.nativeElement;
    let chooseConfig:any=this.chooseConfig;
    /*添加清空时间框逻辑*/
    $(".laydate_btn #laydate_clear").unbind("click").bind("click",function() {
        let formControl:any=chooseConfig.control as FormControl;
        formControl.setValue("");
    });
  }

  ngOnInit(){
    let element:any=this.elementPre.nativeElement;
    let chooseConfig:any=this.chooseConfig;
    let dateConfig:any=chooseConfig.dateConfig;

    this.elementPre.nativeElement.onclick=(data:any)=>{
      laydate({
        elem:"#"+element.id,
        format: dateConfig.format||'YYYY-MM-DD hh:mm:ss',
        istime: true,
        istoday: false,
        festival: true,
        min: function () {
          if(dateConfig&&dateConfig.next){
            let dateTimeString:any=laydate.now(dateConfig.next*1);
            return dateTimeString;
          }else{
            return $('input[id*='+dateConfig.minelementid).val();
          }
        }(),
        max:$('input[id*='+dateConfig.maxelementid).val(),
        choose: function(dates:any){
          let formControl:any=chooseConfig.control as FormControl;
          formControl.setValue(dates);
        }
      })

    }
  }
}
