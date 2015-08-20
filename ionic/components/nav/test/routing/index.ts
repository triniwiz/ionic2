import {NgIf, NgFor, EventEmitter, Component, View, Inject, Injectable} from 'angular2/angular2';
import {
  RouteConfig,
  Route,
  Location
} from 'angular2/router';

import {App, IonicView, NavParams} from 'ionic/ionic';


@IonicView({templateUrl: 'view1.html'})
class View1Cmp {
  constructor(location: Location) {
    this.path = location.path();
    console.log('View1Cmp', this.path);
  }
  viewDidEnter() {
    this.windowHash = window.location.hash;
  }
}


@IonicView({templateUrl: 'view2.html'})
class View2Cmp {
  constructor(location: Location) {
    this.path = location.path();
    console.log('View2Cmp', this.path);
  }
  viewDidEnter() {
    this.windowHash = window.location.hash;
  }
}


@IonicView({templateUrl: 'view3.html'})
class View3Cmp {
  constructor(params: NavParams, location: Location) {
    this.id = params.get('id');
    this.path = location.path();
    console.log('View3Cmp, path:', this.path, ' id:', this.id);
  }
  viewDidEnter() {
    this.windowHash = window.location.hash;
  }
}


@App()
@RouteConfig([
  new Route({path: '/', component: View1Cmp, as: 'first'}),
  new Route({path: '/second', component: View2Cmp, as: 'second'}),
  new Route({path: '/third/:id', component: View3Cmp, as: 'third'})
])
class InboxApp {
  constructor(location: Location) {
    this.location = location;
  }
}
