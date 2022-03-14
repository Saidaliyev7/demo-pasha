import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take, } from 'rxjs';
import { API } from 'src/app/configs/api.config';
import { constructGetRequestHeaders } from 'src/app/functions/construct-headers';
import { QueryService } from 'src/app/services/query.serice';
import {IUser, IUserPaginationData} from '../model/user.interface';

@Injectable({providedIn:'root'})
export class DashboardService {
    users$:BehaviorSubject<IUser[]>= new BehaviorSubject([] as IUser[]);
    usersPaginationData$:BehaviorSubject<IUserPaginationData>=new BehaviorSubject({} as IUserPaginationData)
    constructor(private httpClient:HttpClient,private queryService:QueryService) { }
    
    getUsers():void{
        this.queryService.getQueryParams().subscribe((params:any)=>{
            const  queryParams =constructGetRequestHeaders(params);
            this.httpClient.get(API.Users.get+`?${queryParams}`,{
               observe:'response',
           }).pipe(map((response:any)=>{
               const headers= response.headers as HttpHeaders;
               const limit= headers.get('X-Pagination-Limit');
               const currentPage=headers.get("X-Pagination-Page");
               const totalPages=headers.get("X-Pagination-Pages")
               const totalData=headers.get("X-Pagination-Total");
               this.usersPaginationData$.next({
                   limit,
                   currentPage,
                   totalPages,
                   totalData
               })
               const users=response.body.map((user:any)=>{
                   return {
                       ...user,
                       status:user.status==='active'?true:false
                   }
               })
               return users
           })).pipe(take(1)).subscribe(users=>{
               this.users$.next(users);
           })
        }).unsubscribe();
        
    }

    getUserById(id:string){
        return this.httpClient.get(API.Users.get+`/${id}`);
    }

    deleteUser(id:number){
       return this.httpClient.delete(API.Users.get+`/${id}`).pipe(take(1));
    }

}