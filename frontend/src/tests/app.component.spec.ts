import { AppComponent } from '../app/app.component';
import { environment } from '../environments/environment';
import { runComponentTests } from '../helpers/test';
import * as appStub from '../helpers/app.component.stub';
import { ApiService } from '../helpers/api-service';
import {
    defaultSlots,
    MACHINE_ROLLING,
    CASHING_OUT,
    ROLL_INTERVAL,
} from '../helpers/slot-machine';

runComponentTests('AppComponent', AppComponent, () => {
    beforeEach(function (this: any) {
        appStub.setupGetRouteStub(this, { credit: 10 });
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
            it('app-credit-status', function (this: any) {
                expect(
                    this.compiled.querySelector(
                        'app-credit-status'
                    )
                ).not.toBe(null);
            });
            it('app-slot-machine', function (this: any) {
                expect(
                    this.compiled.querySelector(
                        'app-slot-machine'
                    )
                ).not.toBe(null);
            });
            it('app-cashout', function (this: any) {
                expect(
                    this.compiled.querySelector('app-cashout')
                ).not.toBe(null);
            });
        });
    });
    describe('ngOnInit()', () => {
        it('retrieve data with GET /game/play', function (this: any) {
            this.component.ngOnInit();
            expect(this.routeCalled).toEqual('/game/start');
        });
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
        describe('when rolling = true', () => {
            beforeEach(function (this: any) {
                this.message = null;
                this.component.rolling = true;
                appStub.alertStub(this);
            });
            it('raises an alert with a message about the machine rolling', function (this: any) {
                expect(this.message).toBeNull();
                this.component.play();
                expect(this.message).toEqual(MACHINE_ROLLING);
            });
        });
        describe('when cashingOut = true', () => {
            beforeEach(function (this: any) {
                this.message = null;
                this.component.cashingOut = true;
                appStub.alertStub(this);
            });
            it('raises an alert with a message about cashing out', function (this: any) {
                expect(this.message).toBeNull();
                this.component.play();
                expect(this.message).toEqual(CASHING_OUT);
            });
        });
        describe('when rolling = false, cashingOut = false', () => {
            beforeEach(function (this: any) {
                this.message = null;
                this.blocks = new Array<string>('C', 'C', 'C');
                this.component.blocks = this.blocks;
                appStub.alertStub(this);
            });
            describe('and POST /game/play has an error', () => {
                beforeEach(function (this: any) {
                    this.credit = 20;
                    this.component.credit = this.credit;
                    appStub.setupPostRouteStub(this, {}, true);
                });
                it('runs alert on an error message', function (this: any) {
                    expect(this.message).toBeNull();
                    this.component.play();
                    expect(this.routeCalled).toEqual(
                        '/game/play'
                    );
                    expect(this.message).toEqual(
                        appStub.ERROR_MSG
                    );
                    expect(this.component.credit).toEqual(
                        this.credit
                    );
                    expect(this.component.blocks).toEqual(
                        this.blocks
                    );
                    expect(this.component.rolling).toBeFalse();
                });
            });
            describe('and POST /game/play returns inSession=false', () => {
                beforeEach(function (this: any) {
                    this.credit = 0;
                    this.component.credit = this.credit;
                });
                describe('and confirm start new game', () => {
                    beforeEach(function (this: any) {
                        this.sessionEndMsg = 'session ends';
                        appStub.setupPostRouteStub(this, {
                            inSession: false,
                            message: this.sessionEndMsg,
                        });
                        appStub.confirmStub(this, true);
                    });
                    it('resets to new game', function (this: any) {
                        expect(this.message).toBeNull();
                        expect(this.component.credit).toEqual(
                            this.credit
                        );
                        expect(this.component.blocks).toEqual(
                            this.blocks
                        );
                        this.component.play();
                        expect(this.component.credit).toEqual(
                            10
                        );
                        expect(this.component.blocks).toEqual(
                            defaultSlots
                        );
                        expect(this.message).toEqual(
                            this.sessionEndMsg
                        );
                    });
                });
                describe('and decline start new game', () => {
                    beforeEach(function (this: any) {
                        this.sessionEndMsg = 'session ends';
                        appStub.setupPostRouteStub(this, {
                            inSession: false,
                            message: this.sessionEndMsg,
                        });
                        appStub.confirmStub(this, false);
                    });
                    it('retains old game state and set credit=0', function (this: any) {
                        expect(this.message).toBeNull();
                        expect(this.component.credit).toEqual(
                            this.credit
                        );
                        expect(this.component.blocks).toEqual(
                            this.blocks
                        );
                        this.component.play();
                        expect(this.component.credit).toEqual(0);
                        expect(this.component.blocks).toEqual(
                            this.blocks
                        );
                        expect(this.message).toEqual(
                            this.sessionEndMsg
                        );
                    });
                });
            });
            describe('POST /game/play returns inSession=true', () => {
                beforeEach(function (this: any) {
                    this.credit = 20;
                    this.component.credit = this.credit;
                    this.newBlocks = new Array<string>(
                        'L',
                        'L',
                        'L'
                    );
                    this.newCredit = this.credit + 20;
                    appStub.setupPostRouteStub(this, {
                        inSession: true,
                        blocks: this.newBlocks,
                        credit: this.newCredit,
                    });
                    jasmine.clock().install();
                });
                it('updates game state', function (this: any) {
                    expect(this.component.credit).toEqual(
                        this.credit
                    );
                    expect(this.component.blocks).toEqual(
                        this.blocks
                    );
                    this.component.play();
                    jasmine.clock().tick(ROLL_INTERVAL);
                    expect(this.component.blocks).toEqual(
                        new Array<string>('', '', '')
                    );
                    jasmine.clock().tick(ROLL_INTERVAL);
                    expect(this.component.blocks).toEqual(
                        new Array<string>(
                            this.newBlocks[0],
                            '',
                            ''
                        )
                    );
                    jasmine.clock().tick(ROLL_INTERVAL);
                    expect(this.component.blocks).toEqual(
                        new Array<string>(
                            this.newBlocks[0],
                            this.newBlocks[1],
                            ''
                        )
                    );
                    jasmine.clock().tick(ROLL_INTERVAL);
                    expect(this.component.blocks).toEqual(
                        this.newBlocks
                    );
                    expect(this.component.credit).toEqual(
                        this.newCredit
                    );
                });
                afterEach(() => {
                    jasmine.clock().uninstall();
                });
            });
        });
    });
    describe('cashout()', () => {
        describe('when rolling = true', () => {
            beforeEach(function (this: any) {
                this.message = null;
                this.component.rolling = true;
                appStub.alertStub(this);
            });
            it('raises an alert with a message about the machine rolling', function (this: any) {
                expect(this.message).toBeNull();
                this.component.cashout();
                expect(this.message).toEqual(MACHINE_ROLLING);
            });
        });
        describe('when cashingOut = true', () => {
            beforeEach(function (this: any) {
                this.message = null;
                this.component.cashingOut = true;
                appStub.alertStub(this);
            });
            it('raises an alert with a message about cashing out', function (this: any) {
                expect(this.message).toBeNull();
                this.component.cashout();
                expect(this.message).toEqual(CASHING_OUT);
            });
        });
        describe('when rolling = false, cashingOut = false', () => {
            beforeEach(function (this: any) {
                this.message = null;
                this.credit = 30;
                this.blocks = new Array<string>('C', 'C', 'C');
                this.sessionEndMsg = 'session ends';
                this.component.blocks = this.blocks;
                this.component.credit = this.credit;
                appStub.setupPostRouteStub(this, {
                    inSession: false,
                    message: this.sessionEndMsg,
                });
            });
            describe('and confirm start new game', () => {
                beforeEach(function (this: any) {
                    appStub.confirmStub(this, true);
                });
                it('resets to new game', function (this: any) {
                    expect(this.message).toBeNull();
                    expect(this.component.credit).toEqual(
                        this.credit
                    );
                    expect(this.component.blocks).toEqual(
                        this.blocks
                    );
                    this.component.cashout();
                    expect(this.component.credit).toEqual(10);
                    expect(this.component.blocks).toEqual(
                        defaultSlots
                    );
                    expect(this.message).toEqual(
                        this.sessionEndMsg
                    );
                });
            });
            describe('and decline start new game', () => {
                beforeEach(function (this: any) {
                    appStub.confirmStub(this, false);
                });
                it('retains old game state and set credit=0', function (this: any) {
                    expect(this.message).toBeNull();
                    expect(this.component.credit).toEqual(
                        this.credit
                    );
                    expect(this.component.blocks).toEqual(
                        this.blocks
                    );
                    this.component.cashout();
                    expect(this.component.credit).toEqual(0);
                    expect(this.component.blocks).toEqual(
                        this.blocks
                    );
                    expect(this.message).toEqual(
                        this.sessionEndMsg
                    );
                });
            });
        });
    });
});
