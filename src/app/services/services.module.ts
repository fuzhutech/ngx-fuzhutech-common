import {NgModule, ModuleWithProviders} from '@angular/core';
import {QuoteService} from './quote.service';
import {UserService} from './user.service';
import {AuthService} from './auth.service';
import {AuthGuardService} from './auth-guard.service';

@NgModule()
export class ServicesModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ServicesModule,
            providers: [
                AuthService,
                AuthGuardService,
                QuoteService,
                UserService,
            ]
        };
    }
}
