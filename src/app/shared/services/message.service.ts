import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})

export class MessageService {
    constructor(private snackBar: MatSnackBar) { }

    open(message: string) {
        this.snackBar.open(message, null, {
            duration: 1500,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: 'custom-snack-bar'
        });
    }
}