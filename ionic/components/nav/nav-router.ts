import {Directive, ElementRef, DynamicComponentLoader, Attribute, Injector, bind} from 'angular2/angular2';
import {
  RouterOutlet,
  Router,
  Instruction,
  ComponentInstruction,
  RouteParams,
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

    // convert RouteParams to plain object
    // which will later turn into Ionic's NavParams
    var params = new RouteParams(instruction.params).params;

    this.nav.push(componentType, params);

    // var bindings = Injector.resolve([
    //   bind(ROUTE_DATA)
    //       .toValue(instruction.routeData()),
    //   bind(RouteParams).toValue(new RouteParams(instruction.params)),
    //   bind(Router).toValue(this.childRouter)
    // ]);

    // return this._loader.loadNextToLocation(componentType, this._elementRef, bindings)
    //     .then((componentRef) => {
    //       this._componentRef = componentRef;
    //       // if (hasLifecycleHook(hookMod.onActivate, componentType)) {
    //       //   return this._componentRef.instance.onActivate(instruction, previousInstruction);
    //       // }
    //     });

  }

}
