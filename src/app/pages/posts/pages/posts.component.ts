import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/layout/model/user.interface';
import { QueryService } from 'src/app/services/query.serice';
import { PostsService } from '../service/posts.service';

@Component({
    selector: 'posts',
    templateUrl: 'posts.component.html',
    styleUrls:['posts.component.scss']
})

export class PostsComponent implements OnInit {
    user:IUser|null=null;
    posts$:any;
    constructor(private queryService:QueryService,private postService:PostsService,private router:Router) {

     }

    ngOnInit() {
       const id= this.queryService.getIdFromParamsPosts();
     
        this.postService.getPosts(id);
        this.postService.getUser(id).subscribe((user:any)=>{
            this.user=user;
        });
     
       this.posts$=this.postService.posts$;
     }
     goToAddPost(){
         console.log(this.user)
         this.router.navigate(['posts',this.user?.id,'post'])
     }
     goToDashboard(){
        this.router.navigate(['..'])
     }
}