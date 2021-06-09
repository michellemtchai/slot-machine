import { runComponentTests } from '../helpers/test';
import { CreditStatusComponent } from '../app/credit-status/credit-status.component';

runComponentTests(
    'CreditStatusComponent',
    CreditStatusComponent,
    () => {
        describe('at start up', () => {
            it(`credit=10`, function (this: any) {
                expect(this.component.credit).toEqual(0);
            });
            it(`should display credit=0`, function (this: any) {
                const compiled = this.fixture.debugElement
                    .nativeElement;
                expect(
                    compiled.querySelector('h2').textContent
                ).toContain(0);
            });
        });
        it('should display credit after detectChanges()', function (this: any) {
            this.fixture.detectChanges();
            const compiled = this.fixture.debugElement
                .nativeElement;
            expect(
                compiled.querySelector('h2').textContent
            ).toContain(this.component.credit);
        });
    }
);
