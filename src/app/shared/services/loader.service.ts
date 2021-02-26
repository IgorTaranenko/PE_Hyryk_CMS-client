import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LoaderService {

    isLoadingGlobal: boolean = false;
    isLoadingLocal: boolean = false;

    startGlobalLoading():void {
        this.isLoadingGlobal = true;
    }

    stopGlobalLoading():void {
        this.isLoadingGlobal = false;
    }

    startLocalLoading():void {
        this.isLoadingLocal = true;
    }

    stopLocalLoading():void {
        this.isLoadingLocal = true;
    }
}