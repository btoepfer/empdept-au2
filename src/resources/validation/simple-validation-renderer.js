import {
  ValidationRenderer,
  RenderInstruction,
  ValidateResult
} from 'aurelia-validation';

export class SimpleValidationRenderer {
   render(instruction) {
    
    for (let {result, elements} of instruction.unrender) {
      elements.forEach(target => target.parentElement.querySelector(".error").textContent = "");
    }

    
    for (let {result, elements} of instruction.render) {
      elements.forEach(target => target.parentElement.querySelector(".error").textContent = result.message);
    }
  }
}
