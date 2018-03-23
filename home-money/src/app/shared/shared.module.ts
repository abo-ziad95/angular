import { NgModule } from '@angular/core';
import { ReactiveFormsModule ,FormsModule } from '@angular/forms';
// import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    // NgxChartsModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    // NgxChartsModule
  ]
})

export class SharedModule {

}
