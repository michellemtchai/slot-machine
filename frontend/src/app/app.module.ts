import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SlotMachineComponent } from './slot-machine/slot-machine.component';
import { CreditStatusComponent } from './credit-status/credit-status.component';
import { CashoutComponent } from './cashout/cashout.component';

@NgModule({
    declarations: [
        AppComponent,
        SlotMachineComponent,
        CreditStatusComponent,
        CashoutComponent,
    ],
    imports: [BrowserModule, HttpClientModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
