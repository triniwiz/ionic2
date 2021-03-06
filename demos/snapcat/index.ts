import {FormBuilder, Control, ControlGroup, Validators} from 'angular2/angular2';

import {App, IonicView, Animation, Modal, NavController, NavParams} from 'ionic/ionic';


@IonicView({
  templateUrl: 'detail.html'
})
export class DetailPage {
  constructor(params: NavParams) {
    this.post = params.post;
  }
}

@IonicView({
  templateUrl: 'feed.html'
})
export class FeedPage {
  constructor(nav: NavController) {
    this.nav = nav;

    this.filterForm = new ControlGroup({
      filterControl: new Control("")
    });

    this.posts = [
      {
        text: 'I tried to keep both arts alive, but the camera won. I found that while the camera does not express the soul, perhaps a photograph can!',
        image: 'http://ionic-io-assets.s3.amazonaws.com/images/p.jpg',
        day: 5
      },
      {
        text: 'It is good to realize that if love and peace can prevail on earth, and if we can teach our children to honor nature\'s gifts, the joys and beauties of the outdoors will be here forever.',
        image: 'http://ionic-io-assets.s3.amazonaws.com/images/p1.png',
        day: 6
      },
      {
        text: 'I see humanity now as one vast plant, needing for its highest fulfillment only love, the natural blessings of the great outdoors, and intelligent crossing and selection.',
        image: 'http://ionic-io-assets.s3.amazonaws.com/images/p2.png',
        day: 7
      },
      {
        text: 'You must not lose faith in humanity. Humanity is an ocean; if a few drops of the ocean are dirty, the ocean does not become dirty.',
        image: 'http://ionic-io-assets.s3.amazonaws.com/images/p3.png',
        day: 7
      },
      {
        text: 'Keep close to Nature\'s heart... and break clear away, once in awhile, and climb a mountain or spend a week in the woods. Wash your spirit clean.',
        image: 'http://ionic-io-assets.s3.amazonaws.com/images/p4.png',
        day: 8
      }
    ];
  }

  postClicked(event, post) {
    console.log('Post clicked');
    this.nav.push(DetailPage, {
      post: post
    });
    event.preventDefault();
  }
}

@App({
  templateUrl: 'main.html'
})
class IonicApp {
  constructor(modal: Modal) {
    this.modal = modal;
    this.rootView = FeedPage;
  }

  openHeart() {
    console.log('openHeart');

    this.modal.open(HeartModal, {
      enterAnimation: 'my-fade-in',
      leaveAnimation: 'my-fade-out'
    });
  }

  openGear() {
    console.log('openGear');

    this.modal.open(SettingsModal, {
      enterAnimation: 'my-fade-in',
      leaveAnimation: 'my-fade-out'
    });
  }
}

@IonicView({
  template: '<ion-view id="settings-modal"><ion-content padding><button (click)="close()">Close</button></ion-content></ion-view>'
})
export class SettingsModal {}


@IonicView({
  template: '<ion-view id="heart-modal"><button icon (click)="close()"><i class="icon ion-close"></i></button><h2>20</h2><p>You\'re pretty awesome</p></ion-view>'
})
export class HeartModal {}



class FadeIn extends Animation {
  constructor(element) {
    super(element);
    this
      .easing('ease')
      .duration(250)
      .fadeIn();
  }
}

Animation.register('my-fade-in', FadeIn);

class FadeOut extends Animation {
  constructor(element) {
    super(element);
    this
      .easing('ease')
      .duration(250)
      .fadeOut();
  }
}

Animation.register('my-fade-out', FadeOut);
