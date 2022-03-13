import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { genderList, IGender, IStatus, statusList } from 'src/app/layout/model/user.interface';
import { DashboardService } from 'src/app/layout/service/dashboard.service';
import { QueryService } from 'src/app/services/query.serice';
import Swal from 'sweetalert2';
import { UserChangeService } from '../service/user-change.service';

@Component({
    selector: 'user-add',
    templateUrl: 'user-add.component.html',
    styleUrls: ['user-add.component.scss']
})

export class UserAddComponent implements OnInit {

    addForm = new FormGroup({
        name: new FormControl(''),
        email: new FormControl(''),
        status: new FormControl(''),
        gender: new FormControl(''),
    });

    isAdd:boolean=true;

    genders: IGender[] = genderList;
    statuses: IStatus[] = statusList;
    constructor(private router: Router, private userChangeService: UserChangeService, private dashboardService: DashboardService,private queryService:QueryService ) { }

    ngOnInit() {
       const id= this.queryService.getIdFromParams();
       if(id&&id!=='user'){
           this.isAdd=false
           this.dashboardService.getUserById(id).subscribe(user=>{
            this.addForm.patchValue(user)
           }).unsubscribe();
       }else{
           this.isAdd=true;
       }
    }

    onSubmitForm() {
        this.userChangeService.addUserToDashboard(this.addForm.value).subscribe(res => {
            this.dashboardService.getUsers();
            this.router.navigate(['..'])
            Swal.fire('Uğurla əlavə olundu', '', 'success')
        })
    }

    goBackToDashboard() {
        this.router.navigate(['..'])
    }

}