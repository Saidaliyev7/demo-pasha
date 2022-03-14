import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { genderList, IGender, IStatus, statusList } from 'src/app/layout/model/user.interface';
import { DashboardService } from 'src/app/layout/service/dashboard.service';
import { QueryService } from 'src/app/services/query.serice';
import Swal from 'sweetalert2';
import { PostsService } from '../../../service/posts.service';
import { PostChangeService } from '../service/post-change.service';

@Component({
    selector: 'post-add',
    templateUrl: 'post-add.component.html',
    styleUrls: ['post-add.component.scss']
})

export class PostAddComponent implements OnInit {

    addForm = new FormGroup({
        title: new FormControl(''),
        body: new FormControl(''),
        user_id:new FormControl('')
    });

    isAdd:boolean=true;
    userId:any;
    genders: IGender[] = genderList;
    statuses: IStatus[] = statusList;
    constructor(private router: Router, private postChangeService: PostChangeService,private postsService:PostsService,private queryService:QueryService ) { }

    ngOnInit() {
       this.userId= this.queryService.getIdFromParams();
       const id=this.userId
       this.addForm.patchValue({
           user_id:this.queryService.getIdFromParamsPosts()
       })
       if(id&&id!=='post'){
           this.isAdd=false
       }else{
           this.isAdd=true;
       }
    }

    onSubmitForm() {
       if(this.isAdd){
        this.postChangeService.addPostToDashboard(this.addForm.value).subscribe(res => {
            this.postsService.getPosts(this.queryService.getIdFromParamsPosts());
            this.router.navigate(['posts',this.queryService.getIdFromParamsPosts()])
            Swal.fire('Uğurla əlavə olundu', '', 'success')
        })
       } else{
        this.postChangeService.editPost(this.addForm.value, this.userId).subscribe(res => {
            this.postsService.getPosts(this.queryService.getIdFromParamsPosts());
            this.router.navigate(['posts',this.queryService.getIdFromParamsPosts()])
            Swal.fire('Uğurla dəyişdirildi', '', 'success')
        }) 
       }
     
    }

    goBackToDashboard() {
        this.router.navigate(['posts',this.queryService.getIdFromParamsPosts()])
    }

}