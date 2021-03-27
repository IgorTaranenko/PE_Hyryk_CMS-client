import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Position } from '../../interfaces';
import { MessageService } from '../../services/message.service';
import { PositionsService } from '../../services/positions.service';

@Component({
    selector: 'app-add-or-edit-position',
    templateUrl: './add-or-edit-position.component.html',
    styleUrls: ['./add-or-edit-position.component.less']
})
export class AddOrEditPositionComponent implements OnInit {
    positionForm: FormGroup;
    categoryID: string;
    positionID: string;
    position: Position;
    isNew: boolean = true;
    constructor(
        private modalService: BsModalService, private positionService: PositionsService,
        private messageService: MessageService
    ) { }

    ngOnInit(): void {
        this.positionForm = new FormGroup({
            name: new FormControl(this.position ? this.position.name : null, Validators.required),
            cost: new FormControl(this.position ? this.position.cost : null, [Validators.required]),
            units: new FormControl(this.position ? this.position.units : null, Validators.required)
        })
        if (this.position) {
            this.isNew = false;
            this.positionID = this.position._id
        }
    }

    addOrEditPosition(): void {
        const position: Position = {
            name: this.positionForm.value.name,
            cost: this.positionForm.value.cost,
            units: this.positionForm.value.units,
            category: this.categoryID
        }
        let obs$: Observable<Position>;
        let message: string;
        if (this.isNew) {
            obs$ = this.positionService.create(position);
            message = 'Позиция создана';
        } else {
            obs$ = this.positionService.update(this.positionID, position);
            message = 'Изменения сохранены';
        }
        obs$.subscribe(() => {
            this.modalService.hide();
            this.messageService.open(message);
        })
    }
}
