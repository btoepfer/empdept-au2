import {bindable} from 'aurelia-framework';

export class editableField {
  @bindable name;

  constructor(edit) {
    this.edit = false;
  }

  nameChanged(newValue, oldValue) {
    console.log(newValue, oldValue);
  }

  changeEdit() {
    if (this.edit)
      this.edit = false;
    else
      this.edit = true;
  }
}
