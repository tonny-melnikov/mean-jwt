import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
    authToken: any;
    user: any;

    constructor(
        private http: Http,
        public jwtHelper: JwtHelperService
    ) { }

    registerUser(user) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('users/register', user, { headers })
            .map(res => res.json());
    }

    authenticateUser(user) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('users/auth', user, { headers })
        .map(res => res.json());
    }

    getProfile() {
        const headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get('users/profile', { headers })
            .map(res => res.json());
    }

    loadToken() {
        const token = localStorage.getItem('id_token');
        this.authToken = token;
    }

    storeUserData(token, user) {
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    }

    loggedIn() {
        const token: string = localStorage.getItem('id_token');
        return token != null && !this.jwtHelper.isTokenExpired(token);
    }

    logout() {
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    }
}
