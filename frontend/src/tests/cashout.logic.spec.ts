import {
    approximately,
    containsCoordinate,
    percentDist,
    percentTrue,
} from '../helpers/cashout.test';
import {
    cashout,
    coord,
    dimensions,
    allMoves,
} from '../helpers/cashout';

describe('cashout move logic', () => {
    describe('availableMoves()', () => {
        beforeEach(function (this: any) {
            this.dimensions = dimensions(10, 10);
            this.distance = 10;
        });
        describe('when all coord within screen', () => {
            beforeEach(function (this: any) {
                this.coordinates = coord(10, 10);
                this.screen = dimensions(30, 30);
            });
            it('returns all coordinate options', function (this: any) {
                let res = cashout.availableMoves(
                    this.dimensions,
                    this.coordinates,
                    this.screen,
                    this.distance
                );
                let expected = [
                    coord(0, 10),
                    coord(10, 0),
                    coord(20, 10),
                    coord(10, 20),
                ];
                expect(res.length).toEqual(4);
                for (let i = 0; i < res.length; i++) {
                    expect(
                        containsCoordinate(expected, res[i])
                    ).toBeTrue();
                }
            });
        });
        describe('when some coordinates are outside screen', () => {
            beforeEach(function (this: any) {
                this.coordinates = coord(0, 0);
                this.screen = dimensions(20, 20);
            });
            it('returns only coordinates on screen', function (this: any) {
                let res = cashout.availableMoves(
                    this.dimensions,
                    this.coordinates,
                    this.screen,
                    this.distance
                );
                let expected = [coord(0, 10), coord(10, 0)];
                expect(res.length).toEqual(2);
                for (let i = 0; i < res.length; i++) {
                    expect(
                        containsCoordinate(expected, res[i])
                    ).toBeTrue();
                }
            });
        });
    });
    describe('getRandomNewCoord()', () => {
        it('gives each coord an equal chance', function (this: any) {
            let sampleSize = 10000;
            let offset = 2;
            let dist = percentDist(
                sampleSize,
                allMoves,
                cashout.getRandomNewCoord
            );
            for (let i = 0; i < dist.length; i++) {
                expect(
                    approximately(dist[i], 25, offset)
                ).toBeTrue();
            }
        });
    });
    describe('hasPercentChance()', () => {
        it('returns true at approximately the given percent over multiple iterations', function (this: any) {
            let sampleSize = 10000;
            let offset = 2;
            for (let percent = 1; percent <= 100; percent++) {
                let res = percentTrue(
                    percent,
                    sampleSize,
                    cashout.hasPercentChance
                );
                expect(
                    approximately(res, percent, offset)
                ).toBeTrue();
            }
        });
    });
    describe('getRandomInt()', () => {
        beforeEach(function (this: any) {
            this.numRepeat = 1000;
        });
        it('always return a number, where 0 <= x < max', function (this: any) {
            for (let i = 2; i < this.numRepeat; i++) {
                let max = i + 1;
                let res = cashout.getRandomInt(max);
                expect(res).toEqual(jasmine.any(Number));
                expect(res >= 0 && res < max).toBeTruthy();
            }
        });
    });
    describe('validPosition()', () => {
        beforeEach(function (this: any) {
            this.max = 20;
            this.offset = 10;
        });
        describe('value < 0', () => {
            it('return false', function (this: any) {
                expect(
                    cashout.validPosition(
                        -1,
                        this.offset,
                        this.max
                    )
                ).toBeFalse();
            });
        });
        describe('value > max', () => {
            it('return false', function (this: any) {
                expect(
                    cashout.validPosition(
                        21,
                        this.offset,
                        this.max
                    )
                ).toBeFalse();
            });
        });
        describe('value + offset > max', () => {
            it('return false', function (this: any) {
                expect(
                    cashout.validPosition(
                        11,
                        this.offset,
                        this.max
                    )
                ).toBeFalse();
            });
        });
        describe('value >=0 && value + offset >= max', () => {
            it('return true', function (this: any) {
                expect(
                    cashout.validPosition(
                        5,
                        this.offset,
                        this.max
                    )
                ).toBeTrue();
            });
        });
    });
});
