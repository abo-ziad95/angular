import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/Common';
// import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SharedModule } from '../shared/shared.module';
import { BillPageComponent } from './bill-page/bill-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { PlanningPageComponent } from './planning-page/planning-page.component';
import { RecordsPageComponent } from './records-page/records-page.component';
import { SystemComponent } from './system.component';
import { SystemRoutingModule } from './system-routing.module';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HearedComponent } from './shared/components/heared/heared.component';
import { DropDownDirectivr } from './shared/directives/dropdown.directive';
import { filterPipe } from './shared/pipes/filter.pipe';
import { BillCardComponent } from './bill-page/bill-card/bill-card.component';
import { CurrencyCardComponent } from './bill-page/currency-card/currency-card.component';
import { BillService } from './shared/services/bill.service';
import { AddEventComponent } from './records-page/add-event/add-event.component';
import { AddCateComponent } from './records-page/add-cate/add-cate.component';
import { EditCateComponent } from './records-page/edit-cate/edit-cate.component';
import { CatService } from './shared/services/cat.service';
import { EventsService } from './shared/services/events.service';
import { HistoryDetailComponent } from './history-page/history-detail/history-detail.component';
import { HistoryEventsComponent } from './history-page/history-events/history-events.component';
import { HistoryFilterComponent } from './history-page/history-filter/history-filter.component';




@NgModule({
  declarations: [
    BillPageComponent,
    HistoryPageComponent,
    PlanningPageComponent,
    RecordsPageComponent,
    SystemComponent,
    SidebarComponent,
    HearedComponent,
    DropDownDirectivr,
    BillCardComponent,
    CurrencyCardComponent,
    AddEventComponent,
    AddCateComponent,
    EditCateComponent,
    HistoryDetailComponent,
    HistoryEventsComponent,
    HistoryFilterComponent,
    filterPipe
  ],
   imports: [
     CommonModule,
     SharedModule,
     SystemRoutingModule
   ],
providers: [BillService, CatService, EventsService]
})

export class SystemModule{

}
