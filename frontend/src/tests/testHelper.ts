import {
    ComponentFixture,
    TestBed,
} from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { cacheTestingModule } from 'ng-cache-testing-module';

interface ThisContext {
    component: any;
    fixture: ComponentFixture<any>;
}

export const runComponentTests = (
    componentName: string,
    componentClass: any,
    runTests: () => void
) => {
    describe(componentName, function () {
        cacheTestingModule();
        beforeEach(async function (this: any) {
            await TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                declarations: [componentClass],
                schemas: [NO_ERRORS_SCHEMA],
            }).compileComponents();
            this.fixture = TestBed.createComponent(
                componentClass
            );
            this.component = this.fixture.componentInstance;
            this.fixture.detectChanges();
        });
        it('can be created', function (this: any) {
            expect(this.component).toBeTruthy();
        });

        describe('should test whether', function () {
            runTests();
        });
        afterAll(() => {
            cleanStylesFromDOM();
        });
    });
};
const cleanStylesFromDOM = (): void => {
    let head: HTMLHeadElement = document.getElementsByTagName(
        'head'
    )[0];
    let styles:
        | HTMLCollectionOf<HTMLStyleElement>
        | [] = head.getElementsByTagName('style');
    for (let i: number = 0; i < styles.length; i++) {
        head.removeChild(styles[i]);
    }
};
