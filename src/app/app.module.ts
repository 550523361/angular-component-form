import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {Routes, RouterModule} from "@angular/router";
import {CreateMerchantFormComponent} from "./demo/create.merchant.form.component";
import {CreateMallGoodsCatogeryFormComponent} from "./demo/create.mallGoodsCatogery.form.component";
import {GoodsFormComponent} from "./demo/goods.form.component";
import {CreateGoodsFormComponentFormGroup} from "./demo/create.goods.form.component.form.group";
import {CreateGoodsFormComponent} from "./demo/create.goods.form.component";
import {BaseDateChooseDirective} from "../directive/base.date.choose";
import {BaseUploadDirective} from "../directive/base.upload.directive";
import {BaseUploadDirectiveFormGroup} from "../directive/base.upload.directive.form.group";
import {BaseCustomerKeysPipe} from "../pipe/base.customer.keys.pipe";
import {BaseAreaChooseComponent} from "../areaChoose/base.area.choose.component";
import {BaseFormCreateComponent} from "../form/base.from.create.component";
import {GoodsEasyFormComponent} from "./demo/goods.easy.form.component";
import {BaseEasyFormCreateComponent} from "../easyForm/base.easy.from.create.component";
const appRoutes:Routes=[
  {
    path:"merchant",
    component:CreateMerchantFormComponent
  },
  {
   path:"category",
   component:CreateMallGoodsCatogeryFormComponent
   },
   {
   path:"goodsForm",
   component:GoodsFormComponent
   },
   {
   path:"group",
   component:CreateGoodsFormComponentFormGroup
   },
  {
    path: "goods",
    component: CreateGoodsFormComponent,
  },
  {
    path: "easyGoods",
    component: GoodsEasyFormComponent,
  },
  {path: "base", component: BaseFormCreateComponent},
  {
    path: '**', redirectTo: "easyGoods"
  }
];
@NgModule({
  declarations: [
    AppComponent,
    BaseDateChooseDirective,
    CreateGoodsFormComponent,
    BaseCustomerKeysPipe,
    GoodsFormComponent,
    CreateMallGoodsCatogeryFormComponent,
    BaseUploadDirective,
    BaseUploadDirectiveFormGroup,
    CreateGoodsFormComponentFormGroup,
    CreateMerchantFormComponent,
    BaseFormCreateComponent,
    BaseAreaChooseComponent,
    GoodsEasyFormComponent,
    BaseEasyFormCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
