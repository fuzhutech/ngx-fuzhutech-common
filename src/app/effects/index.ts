import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './auth.effects';
import {QuoteEffects} from './quote.effects';
import {UserEffects} from './user.effects';

export const effects = {
    auth: AuthEffects,
    quote: QuoteEffects,
    users: UserEffects
};

@NgModule({
    imports: [
        EffectsModule.forFeature([
            QuoteEffects,
            AuthEffects,
            UserEffects
        ]),
    ],
})
export class AppEffectsModule {
}
