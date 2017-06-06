import {PipeTransform, Pipe} from "@angular/core";
/**
 * Created by xkfeng on 2017/5/2.
 */


@Pipe({name:"keys"})
export class BaseCustomerKeysPipe implements PipeTransform{

  transform(value:any,args:string[]):string[]{
    if(!value){
      return [];
    }
    return Object.keys(value);
  }


}
