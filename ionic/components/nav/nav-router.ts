import {Directive, ElementRef, DynamicComponentLoader, Attribute} from 'angular2/angular2';
import {
  RouterOutlet,
  Router,
  ComponentInstruction,
  Instruction,
  Location} from 'angular2/router';

import {Nav} from './nav';


@Directive({
  selector: 'ion-nav'
})
export class NavRouter extends RouterOutlet {

  constructor(_elementRef: ElementRef, _loader: DynamicComponentLoader,
              _parentRouter: Router, @Attribute('name') nameAttr: string,
              nav: Nav, location: Location) {
    super(_elementRef, _loader, _parentRouter, nameAttr);
    this.nav = nav;
    this.location = location;

    nav.registerRouter(this);
  }

  _activate(instruction: ComponentInstruction): Promise<any> {
    var previousInstruction = this._currentInstruction;
    this._currentInstruction = instruction;
    var componentType = instruction.componentType;
    this.childRouter = this._parentRouter.childRouter(componentType);

    this.nav.push(componentType, instruction.params);
  }

  stateChange(type, viewItem) {
    if (!viewItem || this._activeViewId === viewItem.id) return;
    this._activeViewId = viewItem.id;

    let pathRecognizer = this.getPathRecognizerByComponent(viewItem.componentType);
    if (pathRecognizer) {

      let componentInstruction = pathRecognizer.generate(viewItem.params.data);

      console.log('stateChange', type, viewItem.id, componentInstruction);

      let instruction = new Instruction(componentInstruction, null);

      this._parentRouter.navigateInstruction(instruction);
    }
  }

  getPathRecognizerByComponent(componentType) {
    let rules = this._parentRouter.registry._rules;

    let pathRecognizer = null;
    rules.forEach((rule) => {

      pathRecognizer = rule.matchers.find((matcherPathRecognizer) => {
        return (matcherPathRecognizer.handler.componentType === componentType);
      });

    });

    return pathRecognizer;
  }

}
