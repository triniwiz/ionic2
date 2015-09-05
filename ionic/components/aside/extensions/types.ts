import {Aside} from 'ionic/components/aside/aside';
import {Animation} from 'ionic/animations/animation';
import {CSS} from 'ionic/util/dom'

class AsideOverlayInAnimation extends Animation {
 constructor(element) {
   super(element);
   this.easing('ease').duration(200);
 }
 set aside(aside) {
   this._aside = aside;

   this.backdropAnim = new Animation(aside.backdrop.getNativeElement());
   this.asideAnim = new Animation(aside.getNativeElement());

   this.backdropAnim.fromTo('opacity', 0.01, 0.5);
   this.asideAnim.fromTo('translateX', '0px', aside.width() + 'px');

   this.add(this.backdropAnim, this.asideAnim);
 }
}
Animation.register('aside-overlay-in', AsideOverlayInAnimation);

class AsideOverlayOutAnimation extends Animation {
 constructor(element) {
   super(element);
   this.easing('ease').duration(200);
 }
 set aside(aside) {
   this._aside = aside;

   this.backdropAnim = new Animation(aside.backdrop.getNativeElement());
   this.asideAnim = new Animation(aside.getNativeElement());

   this.backdropAnim.fromTo('opacity', 0.5, 0.01);
   this.asideAnim.fromTo('translateX', aside.width() + 'px',  '0px');

   this.add(this.backdropAnim, this.asideAnim);
 }
}
Animation.register('aside-overlay-out', AsideOverlayOutAnimation);


// TODO use setters instead of direct dom manipulation
const asideManipulator = {
  setOpen(open) {
    this.aside.getNativeElement().classList[open ? 'add' : 'remove']('open');
  },
  setTransform(t) {
    if(t === null) {
      this.aside.getNativeElement().style[CSS.transform] = '';
    } else {
      this.aside.getNativeElement().style[CSS.transform] = 'translate3d(' + t + 'px,0,0)';
    }
  }
}
const contentManipulator = {
  setOpen(open) {
    this.aside.contentElement.classList[open ? 'add' : 'remove'](
      `aside-open-${this.aside.side}`
    )
  },
  setTransform(t) {
    if(t === null) {
      this.aside.contentElement.style[CSS.transform] = '';
    } else {
      this.aside.contentElement.style[CSS.transform] = 'translate3d(' + t + 'px,0,0)';
    }
  }
}

const backdropManipulator = {
  setOpen(open) {
    let amt = open ? 0.5 : 0.01;
    this.aside.backdrop.opacity = amt;
  },
  setTransform(t) {
    if(t === null) {
      t = this.aside.width();
    }
    let fade = Math.max(0.01, 0.5 * t / this.aside.width());
    this.aside.backdrop.opacity = fade;
  }
}

export class AsideType {
  constructor(aside: Aside, private movesAside, private movesContent, private movesBackdrop) {
    this.aside = aside;

    aside.contentElement.classList.add('aside-content')

  }
  setOpen(open) {
  }
  setTransform(t) {
  }
  setDoneTransforming(willOpen) {
  }
}

export class AsideTypeOverlay extends AsideType {
  constructor(aside: Aside) {
    super(aside);

    console.log('Overlay type create');
  }
  setOpen(open) {
    this.animationIn = Animation.create(this.aside.getNativeElement(), 'aside-overlay-in');
    this.animationIn.aside = this.aside;
    this.animationOut = Animation.create(this.aside.getNativeElement(), 'aside-overlay-out');
    this.animationOut.aside = this.aside;

    return new Promise((resolve, reject) => {
      console.log('Playing', open);

      let animPlay = this.animationIn.play.bind(this.animationIn);;
      if(!open) {
        animPlay = this.animationOut.play.bind(this.animationOut);
      }

      animPlay().then(() => {
        resolve();
        if(!open) {
          //this.aside.getNativeElement().style.visibility = 'hidden';
        }
      }, () => {
        reject();
      });
    });
  }
  setTransform(t) {
  }
  setDoneTransforming(willOpen) {

  }
}

export class AsideTypeReveal extends AsideType {
  constructor(aside: Aside) {
    super(aside, false /* moves aside */, true /* moves content */, false /* moves backdrop */);
  }
}
