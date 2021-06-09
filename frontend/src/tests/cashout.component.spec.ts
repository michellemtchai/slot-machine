import { CashoutComponent } from '../app/cashout/cashout.component';
import { runComponentTests } from '../helpers/test';
import { coord } from '../helpers/cashout';
import { Coordinate } from '../helpers/interfaces';
import {
    hasPercentChanceStub,
    unclickableStub,
} from '../helpers/cashout.component.stub';

runComponentTests('CashoutComponent', CashoutComponent, () => {
    beforeEach(function (this: any) {
        this.compiled = this.fixture.debugElement.nativeElement;
        this.button = this.compiled.querySelector('button');
    });
    describe('at start up', () => {
        it('button positioned at position.x=0, position.y=0', function (this: any) {
            expect(this.component.position.x).toEqual(0);
            expect(this.component.position.y).toEqual(0);
            expect(this.button.style.marginTop).toContain(0);
            expect(this.button.style.marginLeft).toContain(0);
        });
    });
    describe('clicks button', () => {
        beforeEach(function (this: any) {
            spyOn(
                this.component,
                'cashoutAction'
            ).and.callThrough();
        });
        describe('canCashOut=true', () => {
            it('runs cashout()', async function (this: any) {
                this.button.click();
                await this.fixture.whenStable().then(() => {
                    expect(
                        this.component.cashoutAction
                    ).toHaveBeenCalled();
                });
            });
        });
        describe('canCashOut=false', () => {
            beforeEach(function (this: any) {
                this.component.canCashOut = false;
            });
            it('not run cashout()', async function (this: any) {
                this.button.click();
                await this.fixture.whenStable().then(() => {
                    expect(
                        this.component.cashoutAction
                    ).not.toHaveBeenCalled();
                });
            });
        });
    });
    describe('mouseover event', () => {
        beforeEach(function (this: any) {
            expect(this.component.position.x).toEqual(0);
            expect(this.component.position.y).toEqual(0);
            expect(this.button.style.marginTop).toContain(0);
            expect(this.button.style.marginLeft).toContain(0);
            this.hover = () =>
                this.button.dispatchEvent(
                    new MouseEvent('mouseover')
                );
            this.sameCoord = (position: Coordinate) => {
                return (
                    this.component.position.x === position.x &&
                    this.component.position.y === position.y
                );
            };
        });
        it('runs moveButton()', async function (this: any) {
            spyOn(
                this.component,
                'moveButton'
            ).and.callThrough();
            this.hover();
            await this.fixture.whenStable().then(() => {
                expect(
                    this.component.moveButton
                ).toHaveBeenCalled();
            });
        });
        describe('50% chance', () => {
            beforeEach(function (this: any) {
                hasPercentChanceStub(this, true);
            });
            it('move button', async function (this: any) {
                expect(this.component.position.x).toEqual(0);
                expect(this.component.position.y).toEqual(0);
                this.hover();
                await this.fixture.whenStable().then(() => {
                    expect(
                        this.sameCoord(coord(0, 0))
                    ).toBeFalse();
                    expect(this.percent).toEqual(50);
                });
            });
        });
        describe('50% chance', () => {
            it("doesn't move button", async function (this: any) {
                hasPercentChanceStub(this, false);
                expect(this.component.position.x).toEqual(0);
                expect(this.component.position.y).toEqual(0);
                this.hover();
                await this.fixture.whenStable().then(() => {
                    expect(
                        this.sameCoord(coord(0, 0))
                    ).toBeTrue();
                });
            });
            describe('60% chance', () => {
                beforeEach(function (this: any) {
                    hasPercentChanceStub(this, false);
                });
                it('set canCashOut=true', async function (this: any) {
                    this.hover();
                    await this.fixture.whenStable().then(() => {
                        expect(
                            this.component.canCashOut
                        ).toBeTrue();
                    });
                });
            });
            describe('40% chance', () => {
                beforeEach(function (this: any) {
                    unclickableStub(this);
                });
                it('set canCashOut=false', async function (this: any) {
                    this.hover();
                    await this.fixture.whenStable().then(() => {
                        expect(
                            this.component.canCashOut
                        ).toBeFalse();
                        expect(this.percent).toEqual(40);
                    });
                });
            });
        });
    });
    describe('mouseleave event', () => {
        beforeEach(function (this: any) {
            this.component.canCashOut = false;
            this.leave = () =>
                this.button.dispatchEvent(
                    new MouseEvent('mouseleave')
                );
        });
        it('runs resetButton() and set canCashOut=true', async function (this: any) {
            spyOn(
                this.component,
                'resetButton'
            ).and.callThrough();
            expect(this.component.canCashOut).toEqual(false);
            expect(this.component.buttonClass()).toEqual(
                'unclickable'
            );
            this.leave();
            await this.fixture.whenStable().then(() => {
                expect(
                    this.component.resetButton
                ).toHaveBeenCalled();
                expect(this.component.canCashOut).toEqual(true);
                expect(this.component.buttonClass()).toEqual('');
            });
        });
    });
});
