import { runComponentTests } from '../helpers/test';
import { SlotMachineComponent } from '../app/slot-machine/slot-machine.component';

runComponentTests(
    'SlotMachineComponent',
    SlotMachineComponent,
    () => {
        beforeEach(function (this: any) {
            this.blockImage = (index: number) =>
                this.component.getBlockImage(
                    this.component.blocks[index]
                );
        });
        describe('at start up', () => {
            it("sets blocks=['', '', '']", function (this: any) {
                expect(this.component.blocks).toEqual(
                    new Array<string>('', '', '')
                );
            });
            it('should display blocks', function (this: any) {
                const compiled = this.fixture.debugElement
                    .nativeElement;
                const img = compiled.querySelectorAll('img');
                expect(img[0].src).toContain(this.blockImage(0));
                expect(img[1].src).toContain(this.blockImage(1));
                expect(img[2].src).toContain(this.blockImage(2));
            });
        });
        it('should display blocks after detectChanges()', function (this: any) {
            this.component.blocks = new Array<string>(
                'C',
                'L',
                'O'
            );
            this.fixture.detectChanges();
            const compiled = this.fixture.debugElement
                .nativeElement;
            const img = compiled.querySelectorAll('img');
            expect(img[0].src).toContain(this.blockImage(0));
            expect(img[1].src).toContain(this.blockImage(1));
            expect(img[2].src).toContain(this.blockImage(2));
        });
        describe('when play button is clicked', () => {
            it('runs play()', async function (this: any) {
                spyOn(this.component, 'play').and.callThrough();
                const button = this.fixture.debugElement.nativeElement.querySelector(
                    'button'
                );
                button.click();
                await this.fixture.whenStable().then(() => {
                    expect(
                        this.component.play
                    ).toHaveBeenCalled();
                });
            });
        });
    }
);
