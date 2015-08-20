import {Directive, ElementRef, DynamicComponentLoader, Attribute, Injector, bind} from 'angular2/angular2';
import {
  RouterOutlet,
  Router,
  Instruction,
  ComponentInstruction,
  ROUTE_DATA} from 'angular2/router';

import {Nav} from './nav';


@Directive({selector: 'ion-nav'})
export class NavRouter extends RouterOutlet {

  constructor(_elementRef: ElementRef, _loader: DynamicComponentLoader,
              _parentRouter: Router, @Attribute('name') nameAttr: string,
              nav: Nav) {
    super(_elementRef, _loader, _parentRouter, nameAttr);
    this.nav = nav;
  }

  _activate(instruction: ComponentInstruction): Promise<any> {
    var previousInstruction = this._currentInstruction;
    this._currentInstruction = instruction;
    var componentType = instruction.componentType;
    this.childRouter = this._parentRouter.childRouter(componentType);

    this.nav.push(componentType, instruction.params);
  }

}
