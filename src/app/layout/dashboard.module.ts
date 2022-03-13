import { NgModule } from '@angular/core';

import { DashboardComponent } from './pages/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { DashboardService } from './service/dashboard.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { DashboardTableComponent } from './components/table/dashboard-table.component';
import { MatButtonModule } from '@angular/material/button';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationComponent } from './components/pagination/pagination.component';
import { MatIconModule } from '@angular/material/icon';
import { TokenInterceptorService } from '../interceptors/token-service.interceptor';
import { FilterComponent } from './components/filter/filter.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        DashboardRoutingModule,
        MatToolbarModule,
        MatTableModule,
        MatButtonModule,
        NgxPaginationModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [],
    declarations: [
        DashboardComponent,
        DashboardTableComponent,
        PaginationComponent,
        FilterComponent
    ],
    providers: [DashboardService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        },],
})
export class DashboardModule { }
