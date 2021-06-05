import { runComponentTests } from './testHelper';
import { AppComponent } from '../app/app.component';
import { environment } from '../environments/environment';

runComponentTests('AppComponent', AppComponent, function () {
    it(`the title is '${environment.APP_NAME}'`, function (this: any) {
        expect(this.component.title).toEqual(
            environment.APP_NAME
        );
    });
});
