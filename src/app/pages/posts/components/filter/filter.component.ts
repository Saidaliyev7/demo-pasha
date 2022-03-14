import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import resetWhiteSpaceFromObject from 'src/app/functions/reset-whitespace';
import { QueryService } from 'src/app/services/query.serice';
import { PostsService } from '../../service/posts.service';
@Component({
    selector: 'posts-filter',
    templateUrl: 'filter.component.html',
    styleUrls:['filter.component.scss']
})

export class PostsFilterComponent implements OnInit {

    @Input("userId") userId:any;
    filterForm = new FormGroup({
        title: new FormControl(''),
        email: new FormControl(''),
      });
    constructor(private dashboardService:PostsService,private queryService:QueryService) { }

    ngOnInit() {
        this.queryService.getQueryParams().subscribe((params:any)=>{
            this.filterForm.patchValue({
                title:params.name,
                email:params.email,
            })
        }).unsubscribe()
     }

    onSubmitForm(){
       let formValue=  this.filterForm.value;
       resetWhiteSpaceFromObject(formValue)
        this.queryService.changeQuery(formValue);
        setTimeout(() => {
            this.dashboardService.getPosts(this.userId);
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
            this.dashboardService.getPosts(this.userId);
        }, 0);
    }
}