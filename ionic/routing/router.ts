import {RegExpWrapper} from 'angular2/src/facade/lang';

import * as util from '../util/util';


export class IonicRouter {
  constructor(app) {
    this.app = app;
    this._viewCtrls = [];
  }

  stateChange(type, activeView) {
    // this fires when the app's state has changed. `stateChange` will
    // tell each of the state managers that the state has changed, and
    // each state manager will decide what to do with this info
    // (the url state manager updates the url bar if a route was setup)
    if (activeView && activeView.component) {

      let componentRoute = activeView.component.route;
      if (componentRoute) {
        let path = componentRoute.generate(activeView.params);
        if (path) {
          for (let name in stateManagers) {
            stateManagers[name].stateChange(path, type, activeView);
          }
        }
      }

    }
  }

  stateClear() {
    console.log('stateClear');
  }

  addViewController(viewCtrl) {
    this._viewCtrls.push(viewCtrl);
  }

  viewController() {
    if (this._viewCtrls.length) {
      return this._viewCtrls[ this._viewCtrls.length - 1 ];
    }
  }

}

