import { Injector } from "@angular/core";
import { Http, Response, Headers } from "@angular/http"; //http method
import { Observable } from "rxjs"; //Observable return
import "rxjs/add/operator/map"; //http method
import * as AppConst from '../constant/app.const';  //use constant


export default class ApiService<T> { // no need to import from app module

    protected apiUrl: string
    protected http: Http


    constructor(injector: Injector) {
        this.http = injector.get(Http)
    }

    protected getAll(): Observable<any[]> {
        return this.http.get(this.apiUrl).map(response => response.json())
    }

    protected get(id): Observable<any> {
        return this.http.get(this.apiUrl + id).map(response => response.json())
    }

    protected getAllFromURL(specialURL): Observable<any[]> {
        return this.http.get(specialURL).map(response => response.json())
    }

    protected getAllby(value, specialURL): Observable<any[]> {
        return this.http.get(specialURL + value).map(response => response.json())
    }

    protected add(obj): Observable<Response> {
        var headers = new Headers()
        headers.append('Content-Type', 'application/json')
        return this.http.post(this.apiUrl, JSON.stringify(obj), { headers: headers }).map(response => response.json())
    }

    protected remove(id): Observable<Response> {
        return this.http.delete(this.apiUrl + id).map(response => response.json())
    }

    protected edit(id, obj): Observable<Response> {
        return this.http.put(this.apiUrl + id, obj).map(response => response.json())
    }

    protected updateToURL(specialURL, id, obj): Observable<Response> {
        return this.http.put(specialURL + id, obj).map(response => response.json())
    }

}