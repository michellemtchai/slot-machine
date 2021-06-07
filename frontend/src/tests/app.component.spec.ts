import { runComponentTests } from '../helpers/test';
import { AppComponent } from '../app/app.component';
import { environment } from '../environments/environment';
import { ApiService } from '../helpers/api-service';
import { defaultSlots } from '../helpers/slot-machine';
import { of } from 'rxjs';

runComponentTests('AppComponent', AppComponent, () => {
    beforeEach(function (this: any) {
        spyOn(this.component.api, 'get').and.callFake(
            function () {
                return of({ credit: 10 });
            }
        );
    });
    describe('at start up', () => {
        it(`title='${environment.APP_NAME}'`, function (this: any) {
            expect(this.component.title).toEqual(
                environment.APP_NAME
            );
        });
        it('credit=0', function (this: any) {
            expect(this.component.credit).toEqual(0);
        });
        it('rolling=false', function (this: any) {
            expect(this.component.rolling).toEqual(false);
        });
        it('cashingOut=false', function (this: any) {
            expect(this.component.cashingOut).toEqual(false);
        });
        it("blocks=['C', 'L', 'O']", function (this: any) {
            expect(this.component.blocks).toEqual(defaultSlots);
        });
        describe('create the components', () => {
            beforeEach(function (this: any) {
                this.compiled = this.fixture.debugElement.nativeElement;
            });
            it('credit-status', function (this: any) {
                expect(
                    this.compiled.querySelector(
                        'app-credit-status'
                    )
                ).not.toBe(null);
            });
            it('slot-machine', function (this: any) {
                expect(
                    this.compiled.querySelector(
                        'app-slot-machine'
                    )
                ).not.toBe(null);
            });
            it('cashout', function (this: any) {
                expect(
                    this.compiled.querySelector('app-cashout')
                ).not.toBe(null);
            });
        });
    });
    describe('ngOnInit()', () => {
        it("credit=10 and blocks=['C', 'L', 'O']", function (this: any) {
            this.component.ngOnInit();
            expect(this.component.credit).toEqual(10);
            expect(this.component.blocks).toEqual(defaultSlots);
        });
    });
    describe('newGame()', () => {
        it("resets values to credit=10 and blocks=['C', 'L', 'O']", function (this: any) {
            this.component.credit = 20;
            this.component.blocks = new Array<string>(
                '',
                '',
                ''
            );
            expect(this.component.credit).toEqual(20);
            expect(this.component.blocks).toEqual(
                new Array<string>('', '', '')
            );
            this.component.newGame();
            expect(this.component.credit).toEqual(10);
            expect(this.component.blocks).toEqual(defaultSlots);
        });
    });
    describe('play()', () => {
        it('retrieve data with POST /game/play', function (this: any) {
            //TODO
        });
    });
    describe('cashout()', () => {
        it('retrieve data with POST /game/cashout', function (this: any) {
            //TODO
        });
    });
});
