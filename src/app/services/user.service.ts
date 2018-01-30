import {Inject, Injectable} from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../domain';

@Injectable()
export class UserService {
    private readonly domain = 'users';
    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(@Inject('BASE_CONFIG') private config,
                private http: HttpClient) {
    }

    searchUsers(filter: string): Observable<User[]> {
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http.get(uri, {params: {'email_like': filter}})
            .map(res => res as User[]);
    }

    // POST /projects
    add(user: User): Observable<User> {
        user.id = null;
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .post(uri, JSON.stringify(user), {headers: this.headers})
            .map(res => res as User);
    }

    // PUT /projects
    update(user: User): Observable<User> {
        const uri = `${this.config.uri}/${this.domain}/${user.id}`;
        const toUpdate = {
            name: user.name,
            email: user.email
        };
        return this.http
            .patch(uri, JSON.stringify(toUpdate), {headers: this.headers})
            .map(res => res as User);
    }

    del(user: User): Observable<User> {
        const uri = `${this.config.uri}/${this.domain}/${user.id}`;
        return this.http
            .delete(uri)
            .mapTo(user);
    }

    // GET /projects
    get(userId: string): Observable<User[]> {
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .get(uri, {params: {'userId': userId}, headers: this.headers})
            .map(res => res as User[]);
    }
}
