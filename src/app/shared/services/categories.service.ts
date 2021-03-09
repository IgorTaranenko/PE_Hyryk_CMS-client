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

    create(name: string, img?: File): Observable<Category> {
        const fd = new FormData();
        if (img) {
            fd.append('image', img, img.name)
        }
        fd.append('name', name);
        return this.http.post<Category>('/api/categories', fd)
    }

    update(id:string, name: string, img?: File): Observable<Category> {
        const fd = new FormData();
        if (img) {
            fd.append('image', img, img.name)
        }
        fd.append('name', name);
        return this.http.patch<Category>(`/api/categories/${id}`, fd)
    }

    delete(id: string) {
        return this.http.delete(`/api/categories/${id}`);
    }
}