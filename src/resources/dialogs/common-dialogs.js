import {inject} from 'aurelia-framework';
import {DialogService} from 'aurelia-dialog';
import {MessageBox} from './message-box';
import {EmployeeNew} from '../../employees/employee-new';

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

  showTempMessage(message, title = 'Message', options = ['OK'], timeOut = 3000) {
    return this.dialogService
      .open({ viewModel: MessageBox, model: { message, title, options } }).then(openDialogResult => {
      // Note you get here when the dialog is opened, and you are able to close dialog
      setTimeout(() => {
        openDialogResult.controller.cancel()
      }, timeOut);
    });
  }

  showEmployeeEdit(departmentId, employee) {
    return this.dialogService.open({ viewModel: EmployeeNew, model: {departmentId, employee } }).whenClosed(response => {
      return response;
    });
  }
}

