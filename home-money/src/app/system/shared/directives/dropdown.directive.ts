import { Directive, HostBinding, HostListener } from '@angular/core';


@Directive({
  selector: '[dropdown]'
})

export class DropDownDirectivr {
  @HostBinding('class.open') isOpen = false;
  @HostListener('click') onClick(){
    this.isOpen = !this.isOpen
  }

}
