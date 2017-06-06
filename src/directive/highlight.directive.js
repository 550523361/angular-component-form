var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, HostListener, Input } from "@angular/core";
export var HighLightDirective = (function () {
    function HighLightDirective(elementPre) {
        this.elementPre = elementPre;
    }
    HighLightDirective.prototype.onMouseEnter = function () {
        this.highLight(this.myEnterColor);
    };
    HighLightDirective.prototype.onMouseLeave = function () {
        this.highLight(this.myLeaveColor);
    };
    HighLightDirective.prototype.highLight = function (color) {
        this.elementPre.nativeElement.style.background = color;
    };
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], HighLightDirective.prototype, "myEnterColor", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], HighLightDirective.prototype, "myLeaveColor", void 0);
    __decorate([
        HostListener("mouseenter"), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], HighLightDirective.prototype, "onMouseEnter", null);
    __decorate([
        HostListener("mouseleave"), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], HighLightDirective.prototype, "onMouseLeave", null);
    HighLightDirective = __decorate([
        Directive({
            selector: '[myHighLight]'
        }), 
        __metadata('design:paramtypes', [ElementRef])
    ], HighLightDirective);
    return HighLightDirective;
}());
//# sourceMappingURL=highlight.directive.js.map