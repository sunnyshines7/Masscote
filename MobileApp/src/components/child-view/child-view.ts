import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the ChildViewComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'child-view',
  templateUrl: 'child-view.html'
})
export class ChildViewComponent {

  @Input() desc_name: string;
  @Input() value1: string;
  @Input() value2;
  @Input() isInput: boolean;
  @Output() modelValue = new EventEmitter();
  input_value: string;
  project: any;

  constructor() {
    console.log('Hello ChildViewComponent Component');
  }

  ngOnInit() {
    console.log("hii")
    this.project = JSON.parse(localStorage.getItem('project'));;
    console.log(this.project)
  }

  updateValue(e) {
    if(e.target.value == 0){
      e.target.value = ''
    }
  }

  inputChanged() {
    console.log("child"+this.input_value);
    this.modelValue.emit(this.input_value);
  }

}
