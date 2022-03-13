import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor() {}

    getTokenFromEnvironment():string{
        return environment.token as string;
    }
}