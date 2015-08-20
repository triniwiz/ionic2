import {NgIf, NgFor, EventEmitter, Component, View, Inject, Injectable} from 'angular2/angular2';
import {
  RouterLink,
  RouteConfig,
  Router,
  Route,
  RouterOutlet,
  Location,
  RouteParams
} from 'angular2/router';

import {App, IonicView, NavParams} from 'ionic/ionic';


@IonicView({templateUrl: 'view1.html'})
class View1Cmp {
  constructor() {
    console.log('View1Cmp');
  }
}


@IonicView({templateUrl: 'view2.html'})
class View2Cmp {
  constructor() {
    console.log('View2Cmp');
  }
}


@IonicView({templateUrl: 'view3.html'})
class View3Cmp {
  constructor(params: NavParams) {
    this.id = params.get('id');
    console.log('View3Cmp, id:', this.id);
  }
}


@App({directives: [RouterOutlet, RouterLink]})
@RouteConfig([
  new Route({path: '/', component: View1Cmp, as: 'first'}),
  new Route({path: '/second', component: View2Cmp, as: 'second'}),
  new Route({path: '/third/:id', component: View3Cmp, as: 'third'})
])
class InboxApp {
  constructor(router: Router, location: Location) {
    this.router = router;
    this.location = location;
  }
}
