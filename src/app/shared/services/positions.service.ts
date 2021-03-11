import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Position } from "../interfaces";

@Injectable({
    providedIn: "root"
})

export class PositionsService {
    constructor(private http: HttpClient) {}

    getByCategoryId(id: string): Observable<Position[]> {
        return this.http.get<Position[]>(`/api/positions/${id}`);
    }
}