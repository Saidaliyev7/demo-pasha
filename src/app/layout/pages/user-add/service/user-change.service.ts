import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/app/configs/api.config';
import { IRequestModelUser } from 'src/app/model/request.interface';

@Injectable()
export class UserChangeService {
    constructor(private httpClient:HttpClient) { }
    

    addUserToDashboard(body:IRequestModelUser){
         return  this.httpClient.post(API.Users.add,body);
    }
}