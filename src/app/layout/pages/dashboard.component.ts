import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IUserPaginationData } from '../model/user.interface';
import { DashboardService } from '../service/dashboard.service';

@Component({
    selector: 'dashboard.component.ts',
    templateUrl: 'dashboard.component.html',
    styleUrls:['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    subscriptions$:Subject<any>=new Subject();

    paginationData:IUserPaginationData|null=null;
    constructor(private dashboardService:DashboardService,private router:Router) { }

    ngOnInit() { 
        this.dashboardService.getUsers()
        this.dashboardService.usersPaginationData$.pipe(takeUntil(this.subscriptions$)).subscribe(paginationDatas=>{
            if(paginationDatas.totalData){
            
                this.paginationData=paginationDatas;
            }
          
        });
    }
    redirrectToAdd(){
        this.router.navigate(['dashboard/user'])
    }

    ngOnDestroy(): void {
        this.subscriptions$.unsubscribe();
        
    }
}