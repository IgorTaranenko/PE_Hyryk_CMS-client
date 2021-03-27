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
    create(position: Position): Observable<Position> {
        return this.http.post<Position>(`/api/positions`, position);
    }
    update(id: string, position: Position): Observable<Position> {
        return this.http.patch<Position>(`/api/positions/${id}`, position);
    }
    remove(id: string) {
        return this.http.delete<Position>(`/api/positions/${id}`);
    }
}