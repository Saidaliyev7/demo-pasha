import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { API } from 'src/app/configs/api.config';
import { constructGetRequestHeaders } from 'src/app/functions/construct-headers';
import { QueryService } from 'src/app/services/query.serice';

@Injectable({providedIn:'root'})
export class PostsService {

    posts$:BehaviorSubject<any[]>= new BehaviorSubject([] as any);
    user$:BehaviorSubject<any[]>= new BehaviorSubject([] as any);
    postsPaginationData$:BehaviorSubject<any>=new BehaviorSubject({} as any)
    constructor(private queryService:QueryService,private httpClient:HttpClient) {
     }

     getUser(id?:number|string){
        return this.httpClient.get(API.Users.get+`/${id}`);
     }


     getPost(id?:number|string){
         return this.httpClient.get(API.Users.add+`/${id}`)
     }

    getPosts(id?:number|string){

    this.queryService.getQueryParams().subscribe((params:any)=>{
        const  queryParams =constructGetRequestHeaders(params);
        this.httpClient.get(API.Users.get+`/${id}/posts`+`?${queryParams}`,{
           observe:'response',
       }).pipe(map((response:any)=>{
           const headers= response.headers as HttpHeaders;
           const limit= headers.get('X-Pagination-Limit');
           const currentPage=headers.get("X-Pagination-Page");
           const totalPages=headers.get("X-Pagination-Pages")
           const totalData=headers.get("X-Pagination-Total");
           this.postsPaginationData$.next({
               limit,
               currentPage,
               totalPages,
               totalData
           })
           const posts=response.body;
           return posts
       })).pipe(take(1)).subscribe(posts=>{
           this.posts$.next(posts);
       })
    }).unsubscribe();
    }

    deletePost(userId:string|number,id:string|number){
        return this.httpClient.delete(API.Users.get+`/${userId}/posts/${id}`,{
            observe:'response'
        })
    }
    
}