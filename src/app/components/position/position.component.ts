import { Component, Input, OnInit } from '@angular/core';
import { Position } from 'src/app/shared/interfaces';
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

    constructor(
        private positionsService: PositionsService
    ) { }

    ngOnInit(): void {
        this.loading = true;
        this.positionsService.getByCategoryId(this.categoryID).subscribe((positions: Position[]) => {
            this.positions = positions;
            this.loading = false;
        });
    }

}
