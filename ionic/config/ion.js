import * as util from 'ionic/util'
import {dom} from 'ionic/util'
import {Platform} from 'ionic/platform/platform'
import {Component} from 'angular2/src/core/annotations_impl/annotations'

export class Ion {
  constructor(){

  }

  invoke(instance) {
    //ComponentClass.config = this
    //this.componentCssName = util.pascalCaseToDashCase(ComponentClass.name)

    const config = this;

    // For each property class, check if it exists on the element and add the
    // corresponding classname for it, otherwise add it
    let foundMatchingPropClass = false;
    for (let propClass of this.propClasses) {
      if(dom.hasAttribute(instance.domElement, propClass)) {
        dom.addClass(instance.domElement, `${this.componentCssName}-${propClass}`);
        foundMatchingPropClass = true;
      }
    }

    // TODO: This worked fine for property-only buttons, but breaks with
    // class, etc.
    //
    // If we want to enhance a raw element (for example, a button),
    // only do it if we also have a matching prop class
    //if(!foundMatchingPropClass && this.enhanceRawElement) {
      // Don't enhace this raw element
      //return;
    //}

    // Add the base element classes (ex, button and button-ios)
    dom.addClass(instance.domElement, this.componentCssName, `${this.componentCssName}-${platformMode}`);

    // Check and apply and property classes (properties that should be
    // converted to class names). For example, <button primary> should
    // add the class button-primary

    for (let attrName in this.bind) {
      let binding = this.bind[attrName]
      let defaultValue = binding._defaultValue
      if (!instance[binding.property] && defaultValue) {
        instance[binding.property] = defaultValue
        instance.domElement.setAttribute(util.pascalCaseToDashCase(attrName), defaultValue)
      }
    }

    return {
      properties: this.properties,
      getDelegate(delegateName) {
        let cases = (config.delegates || {})[delegateName] || [];
        for (let i = 0; i < cases.length; i++) {
          let delegateCase = cases[i];
          if (util.isArray(delegateCase)) {
            let [ check, DelegateConstructor ] = delegateCase;
            if (check(instance)) {
              return new DelegateConstructor(instance);
            }
          } else {
            return new delegateCase(instance);
          }
        }
      }
    }
  }
}
