import {
  View,
  Directive,
  ElementRef,
  Renderer,
  Optional,
  Parent,
  NgControl
} from 'angular2/angular2';

import {Ion} from '../ion';
import {IonInputItem} from '../form/input';
import {IonicConfig} from '../../config/config';
import {IonicComponent, IonicView} from '../../config/annotations';
import {Icon} from '../icon/icon';


@IonicComponent({
  selector: 'ion-checkbox',
  host: {
    '[class.item]': 'item',
    '[attr.aria-checked]': 'input.checked'
  },
  defaultProperties: {
    'iconOff': 'ion-ios-circle-outline',
    'iconOn': 'ion-ios-checkmark'
  }
})
@IonicView({
  template:
  '<div class="item-media media-checkbox">' +
  '<icon [name]="iconOff" class="checkbox-off"></icon>' +
    '<icon [name]="iconOn" class="checkbox-on"></icon>' +
  '</div>' +
  '<div class="item-content">' +
    '<content></content>' +
  '</div>'
})
export class Checkbox extends IonInputItem {
  constructor(
    cd: NgControl,
    renderer: Renderer,
    elementRef: ElementRef,
    config: IonicConfig
  ) {
    super(elementRef, config);
    this.onChange = (_) => {};
    this.onTouched = (_) => {};
    this.renderer = renderer;
    this.elementRef = elementRef;
    this.cd = cd;

    cd.valueAccessor = this;

    this.item = true;
  }

  onInit() {
    super.onInit();
  }

  onAllChangesDone() {
    if (this.input && this.input.value === void 0) {
      this.input.value = "on";
    }
  }

  //from clicking the label or selecting with keyboard
  //view -> model (Control)
  toggle() {
    this.input.checked = !this.input.checked;
    this.onChange({"checked": this.input.checked, "value": this.input.value});
  }

  // Called by the model (Control) to update the view
  writeValue(modelValue) {
    let type = typeof modelValue;
    switch (type) {
      case "boolean":
        this.input.checked = modelValue; break;
      case "object":
        if (modelValue.checked !== void 0) this.input.checked = !!modelValue.checked;
        if (modelValue.value !== void 0) this.input.value = modelValue.value.toString();
        break;
      default:
        this.input.value = modelValue.toString();
    }
    debugger;
    this.cd.control._value = {"checked": this.input.checked, "value": this.input.value};
  }

  // Used by the view to update the model (Control)
  // Up to us to call it in update()
  registerOnChange(fn) { this.onChange = fn; }

  registerOnTouched(fn) { this.onTouched = fn; }
}
