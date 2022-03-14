import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/app/configs/api.config';
import { IRequestModelUser } from 'src/app/model/request.interface';

@Injectable()
export class PostChangeService {
    constructor(private httpClient:HttpClient) { }
    

    addPostToDashboard(body:any){
         return  this.httpClient.post(API.Posts.get,body);
    }
    editPost(body:any,id:string|number){
        return  this.httpClient.put(API.Users.add+`/${id}`,body);
   }
}