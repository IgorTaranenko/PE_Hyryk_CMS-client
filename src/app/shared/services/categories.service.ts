import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "../interfaces";

@Injectable({
    providedIn: 'root'
})

export class CategoriesService {
    constructor(private http: HttpClient) { }

    getAll():Observable<Category[]> {
        return this.http.get<Category[]>('/api/categories');
    }

    getCategory(id: string): Observable<Category> {
        return this.http.get<Category>(`/api/categories/${id}`);
    }
}