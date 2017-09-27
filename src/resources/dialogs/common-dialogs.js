import {inject} from 'aurelia-framework';
import {DialogService} from 'aurelia-dialog';
import {MessageBox} from './message-box';
import {ModalForm} from './modal-form';

@inject(DialogService)
export class CommonDialogs {
  constructor(dialogService) {
    this.dialogService = dialogService;
  }
  
  showMessage(message, title = 'Message', options = ['OK']) {
    return this.dialogService.open({ viewModel: MessageBox, model: { message, title, options } }).whenClosed(response => {
      return response;
    });
  }
  
  showForm(message, title = 'Prompt') {
    return this.dialogService.open({ viewModel: ModalForm, model: { message, title } }).whenClosed(response => {
      return response;
    });
  }
}
