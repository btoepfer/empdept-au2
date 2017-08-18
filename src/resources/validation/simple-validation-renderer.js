import {
  ValidationRenderer,
  RenderInstruction,
  ValidateResult
} from 'aurelia-validation';

export class SimpleValidationRenderer {
  render(instruction) {
    
    
    for (let {result, elements} of instruction.unrender) {
      elements.forEach(target => 
          target.parentElement.querySelector(".info")
            .innerHTML = "<i class='fa fa-info'></i>"
        );
      //
    }
    
    let currentElement = [];
    let everythingValid = true;
    for (let {result, elements} of instruction.render) {
      elements.forEach(target => {
        if (currentElement !== target) {
          currentElement = target;
          everythingValid = true;
        }
        if (!result.valid)
          everythingValid = false;

        if (everythingValid)
          target.parentElement.querySelector(".info")
            .innerHTML = "<i class='success fa fa-check'></i>";
        else
          target.parentElement.querySelector(".info")
            .innerHTML = "<i class='error fa fa-times'></i>";
      })
        //result.message);
    }

    
  }
}
