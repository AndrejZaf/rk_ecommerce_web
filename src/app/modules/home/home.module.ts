import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeScreenComponent } from './containers/home-screen/home-screen.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeState } from './store/home.store';
import { NgxsModule } from '@ngxs/store';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/home/', '.json');
}

@NgModule({
  declarations: [HomeScreenComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    HttpClientModule,
    NgxsModule.forFeature([HomeState]),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
      isolate: true,
    }),
  ],
})
export class HomeModule {}
