import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-confirm-delete',
    templateUrl: './confirm-delete.component.html',
    styleUrls: ['./confirm-delete.component.less']
})
export class ConfirmDeleteComponent implements OnInit {

    isDelete: Subject<boolean>;
    constructor(private _bsModalRef: BsModalRef) { }

    ngOnInit(): void {
        this.isDelete = new Subject();
    }

    onCancel(): void {
        this.isDelete.next(false);
        this._bsModalRef.hide();
    }

    onDelete(): void {
        this.isDelete.next(true);
        this._bsModalRef.hide();
    }

}
