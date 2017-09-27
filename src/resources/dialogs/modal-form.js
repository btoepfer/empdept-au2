import {DialogController} from 'aurelia-dialog';
import {inject} from 'aurelia-framework';

@inject(DialogController)
export class ModalForm {
  constructor(dialogController) {
    this.dialogController = dialogController;
    this.action = null;
  }
  
  activate(model) {
    this.model = model;
  }
  
  save() {
    this.dialogController.ok();
  }
  
  cancel() {
    this.dialogController.cancel();
  }
}

