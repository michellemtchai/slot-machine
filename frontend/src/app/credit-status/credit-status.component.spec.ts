import {
    ComponentFixture,
    TestBed,
} from '@angular/core/testing';

import { CreditStatusComponent } from './credit-status.component';

describe('CreditStatusComponent', () => {
    let component: CreditStatusComponent;
    let fixture: ComponentFixture<CreditStatusComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CreditStatusComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CreditStatusComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
