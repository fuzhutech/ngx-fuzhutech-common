import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {
    StoreRouterConnectingModule,
    RouterStateSerializer,
} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {reducers, metaReducers, CustomRouterStateSerializer} from './reducers';
import {environment} from '../environments/environment';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {HomeComponent} from './home/home.component';
import {FzHighlightModule} from './ngx-fuzhutech-common';
import {FzPrismModule} from '../lib/core/prism/prism.module';
import {NgxFuzhutechCommonModule} from '../lib/ngx-fuzhutech-common.module';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        // RouterModule,
        // ReactiveFormsModule,
        HttpClientModule,
        // HttpClientJsonpModule,
        SharedModule,
        CoreModule,
        /**
         * StoreModule.forRoot is imported once in the root module, accepting a reducer
         * function or object map of reducer functions. If passed an object of
         * reducers, combineReducers will be run creating your application
         * meta-reducer. This returns all providers for an @ngrx/store
         * based application.
         */
        StoreModule.forRoot(reducers, {metaReducers}),

        /**
         * @ngrx/router-store keeps router state up-to-date in the store.
         */
        StoreRouterConnectingModule,

        /**
         * Store devtools instrument the store retaining past versions of state
         * and recalculating new states. This enables powerful time-travel
         * debugging.
         *
         * To use the debugger, install the Redux Devtools extension for either
         * Chrome or Firefox
         *
         * See: https://github.com/zalmoxisus/redux-devtools-extension
         */
        !environment.production
            ? StoreDevtoolsModule.instrument({
                maxAge: 25 //  Retains last 25 states
            })
            : [],

        /**
         * EffectsModule.forRoot() is imported once in the root module and
         * sets up the effects class to be initialized immediately when the
         * application starts.
         *
         * See: https://github.com/ngrx/platform/blob/master/docs/effects/api.md#forroot
         */
        EffectsModule.forRoot([]),
        AppRoutingModule,
        FzPrismModule.forRoot({
            // 指定ueditor.js路径目录
            path: 'assets/js',
            // 默认全局配置项
            options: {
                // themePath: '/assets/ueditor1_4_3_3-utf8-jsp/themes/'
            }
        }),
        FzHighlightModule,
        NgxFuzhutechCommonModule.forRoot()
    ],
    providers: [
        /**
         * The `RouterStateSnapshot` provided by the `Router` is a large complex structure.
         * A custom RouterStateSerializer is used to parse the `RouterStateSnapshot` provided
         * by `@ngrx/router-store` to include only the desired pieces of the snapshot.
         */
        {provide: RouterStateSerializer, useClass: CustomRouterStateSerializer},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
