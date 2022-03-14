import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
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
    userId:any;
    genders: IGender[] = genderList;
    statuses: IStatus[] = statusList;
    constructor(private router: Router, private userChangeService: UserChangeService, private dashboardService: DashboardService,private queryService:QueryService ) { }

    ngOnInit() {
       this.userId= this.queryService.getIdFromParams();
       const id=this.userId
       if(id&&id!=='user'){
           this.isAdd=false
           this.dashboardService.getUserById(id).pipe(take(1)).subscribe((user:any)=>{
            this.addForm.patchValue({
                name:user.name,
                email:user.email,
                gender:user.gender,
                status:user.status
            })
           })
       }else{
           this.isAdd=true;
       }
    }

    onSubmitForm() {
       if(this.isAdd){
        this.userChangeService.addUserToDashboard(this.addForm.value).subscribe(res => {
            this.dashboardService.getUsers();
            this.router.navigate(['..'])
            Swal.fire('Uğurla əlavə olundu', '', 'success')
        })
       } else{
        this.userChangeService.editUser(this.addForm.value, this.userId).subscribe(res => {
            this.dashboardService.getUsers();
            this.router.navigate(['..'])
            Swal.fire('Uğurla dəyişdirildi', '', 'success')
        }) 
       }
     
    }

    goBackToDashboard() {
        this.router.navigate(['..'])
    }

}