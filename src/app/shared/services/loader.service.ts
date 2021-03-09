import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoaderService {

    isLoadingGlobal: Subject<boolean> = new Subject();
    isLoadingLocal: boolean = false;

    startGlobalLoading():void {
        this.isLoadingGlobal.next(true);
    }

    stopGlobalLoading():void {
        this.isLoadingGlobal.next(false);
    }

    startLocalLoading():void {
        this.isLoadingLocal = true;
    }

    stopLocalLoading():void {
        this.isLoadingLocal = false;
    }
}