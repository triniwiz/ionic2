import {App} from 'ionic/ionic';
import {
  Control,
  ControlGroup,
  NgForm,
  formDirectives,
  Validators,
  NgControl,
  ControlValueAccessor,
  NgControlName,
  NgFormModel,
  FormBuilder
} from 'angular2/forms';

@App({
  templateUrl: 'main.html'
})
class IonicApp {
  constructor() {
    this.fruitsForm = new ControlGroup({
      "appleCtrl": new Control({"checked": false, "value": "apple"}),
      "bananaCtrl": new Control(true),
      "grapeCtrl": new Control("grape"),
      "cherryCtrl": new Control({"checked": false, "value": 12})
    });
  }

  doSubmit(ev) {
    console.log('Submitting form', this.fruitsForm.value);
    event.preventDefault();
  }
}
