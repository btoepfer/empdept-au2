import {inject} from 'aurelia-framework';
import {filterDepartments} from '../elements/departments/departments';

@inject(Element)
export class FilterCustomAttribute {
  constructor(element) {
    this.element = element;
  }

  valueChanged(newValue) {
    //alert(newValue);
    //filterDepartments(newValue);
  }
}
