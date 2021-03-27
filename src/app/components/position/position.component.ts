import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddOrEditPositionComponent } from 'src/app/shared/components/add-or-edit-position/add-or-edit-position.component';
import { Position } from 'src/app/shared/interfaces';
import { MessageService } from 'src/app/shared/services/message.service';
import { PositionsService } from 'src/app/shared/services/positions.service';

@Component({
    selector: 'app-position',
    templateUrl: './position.component.html',
    styleUrls: ['./position.component.less']
})
export class PositionComponent implements OnInit {

    @Input("categoryID") categoryID: string;
    loading: boolean;
    positions: Position[] = [];
    modalRef: BsModalRef;

    constructor(
        private positionsService: PositionsService, private modalService: BsModalService,
        private messageService: MessageService
    ) { }

    ngOnInit(): void {
        this.getByCategoryId();
    }

    getByCategoryId(): void {
        this.loading = true;
        this.positionsService.getByCategoryId(this.categoryID).subscribe((positions: Position[]) => {
            this.positions = positions;
            this.loading = false;
        });
    }

    addOrEdit(position?: Position): void {
        const initialState = {
            categoryID: this.categoryID,
            position
        }
        this.modalRef = this.modalService.show(AddOrEditPositionComponent, {
            class: 'modal-md',
            initialState
        });
        this.modalRef.content.position = position;
        this.modalRef.onHide.subscribe(() => {
            this.getByCategoryId();
        })
    }
    remove(id: string): void {
        this.positionsService.remove(id).subscribe(() => {
            this.messageService.open('Категория удалена');
        });
    }

}
