import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Subject, takeUntil } from 'rxjs';
import SwalConfigForDelete from 'src/app/configs/swal.config';
import getPaginationIndex from 'src/app/functions/get-pagination-index';
import { QueryService } from 'src/app/services/query.serice';
import Swal from 'sweetalert2';
import {IUser, IUserPaginationData} from '../../model/user.interface';
import { DashboardService } from '../../service/dashboard.service';

@Component({
    selector: 'dashboard-table',
    templateUrl: 'dashboard-table.component.html',
    styleUrls:['dahboard-table.component.scss']
})

export class DashboardTableComponent implements OnInit {

    displayedColumns: string[] = ['position', 'ad', 'email', 'cins' ,'status' ,'əməliyyatlar'];
    userData:IUser[]=[];
    subscription$=new Subject();
    paginationData:any
    constructor(private dashboardService:DashboardService,private router:Router,private queryService:QueryService) { }

    ngOnInit() {
        this.dashboardService.users$.pipe(takeUntil(this.subscription$)).subscribe(users=>{
            this.dashboardService.usersPaginationData$.pipe(takeUntil(this.subscription$)).subscribe(paginationDatas=>{
                if(paginationDatas.totalData){
                    this.paginationData=paginationDatas;
                    this.userData=users.map((user,index)=>{
                        user.position= getPaginationIndex(this.paginationData?.currentPage,this.paginationData?.limit,index);
                        return user;
                    });
                }
            });
        })
    }

    onDelete(user:IUser){
        Swal.fire(SwalConfigForDelete).then((result) => {
            if (result.value) {
                this.dashboardService.deleteUser(Number(user.id)).pipe(catchError(err=>{
                    Swal.fire(
                        'Xəta baş verdi',
                        '',
                        'error'
                      )
                    return err
                })).subscribe(res=>{
                    Swal.fire(
                        'Uğurla silindi',
                        '',
                        'success'
                    )
                    this.dashboardService.getUsers();
                })
                
            }
          })
    }

    goToEdit(user:IUser){
        this.router.navigate(['dashboard','user',user.id])
    }

    goToPosts(user:IUser){
        this.router.navigate(['..','posts',user.id]);
       
 
    }

    ngOnDestroy(): void {
       this.subscription$.unsubscribe();    
    }
}