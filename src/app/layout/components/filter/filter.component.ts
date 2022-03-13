import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import resetWhiteSpaceFromObject from 'src/app/functions/reset-whitespace';
import { QueryService } from 'src/app/services/query.serice';
import { genderList, IGender, IStatus, statusList } from '../../model/user.interface';
import { DashboardService } from '../../service/dashboard.service';

@Component({
    selector: 'filter',
    templateUrl: 'filter.component.html',
    styleUrls:['filter.component.scss']
})

export class FilterComponent implements OnInit {
    genders:IGender[]=genderList;
    statuses:IStatus[]=statusList;

    filterForm = new FormGroup({
        name: new FormControl(''),
        email: new FormControl(''),
        status: new FormControl(''),
        gender: new FormControl(''),
      });
    constructor(private dashboardService:DashboardService,private queryService:QueryService) { }

    ngOnInit() {
        this.queryService.getQueryParams().subscribe((params:any)=>{
            this.filterForm.patchValue({
                name:params.name,
                email:params.email,
                status:params.status,
                gender:params.gender
            })
        }).unsubscribe()
     }

    onSubmitForm(){
       let formValue=  this.filterForm.value;
       resetWhiteSpaceFromObject(formValue)
        this.queryService.changeQuery(formValue);
        setTimeout(() => {
            this.dashboardService.getUsers();
        }, 0);
    }

    resetForm(){
        this.filterForm.reset({
            name:'',
            email:'',
            status:'',
            gender:''
        })
        this.queryService.changeQuery(this.filterForm.value);
        setTimeout(() => {
            this.dashboardService.getUsers();
        }, 0);
    }
}