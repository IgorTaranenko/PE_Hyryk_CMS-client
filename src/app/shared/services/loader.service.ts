import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LoaderService {

    isLoading: boolean = false;

    startLoading():void {
        this.isLoading = true;
    }

    stopLoading():void {
        this.isLoading = false;
    }
}