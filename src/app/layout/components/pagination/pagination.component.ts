import { Component, OnInit } from '@angular/core';
import { QueryService } from 'src/app/services/query.serice';
import { DashboardService } from '../../service/dashboard.service';

@Component({
    selector: 'pagination',
    templateUrl: 'pagination.component.html',
    styleUrls:['pagination.component.scss']
})

export class PaginationComponent implements OnInit {
    constructor(private dashboardService:DashboardService,private queryService:QueryService) { }

    ngOnInit() { }
    changePage(page:any){
        this.queryService.changeQuery({
            page:page
        })
        setTimeout(() => {
            this.dashboardService.getUsers();
        }, 0);
     
    }
}