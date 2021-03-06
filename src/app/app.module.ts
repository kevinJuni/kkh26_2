import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {
  LocationStrategy, HashLocationStrategy, registerLocaleData, CommonModule
} from '@angular/common';
import localeKo from '@angular/common/locales/ko'
registerLocaleData(localeKo)
import {ToastrModule } from 'ngx-toastr';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { NgxUploaderModule } from 'ngx-uploader';
import { NgSpinKitModule } from 'ng-spin-kit';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TextMaskModule } from 'angular2-text-mask';

import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

// material
import { CustomMaterialModule } from './custom-material/custom-material.module';

// services
import { CommonBackendService } from './services/backend.service';
import { DistrictSearchService } from './services/district-search.service';
import { TokenInterceptor } from './services/token-intercepter';
import { AuthService } from './services/auth.service';

// pipes
import { Nl2brPipe } from './pipes//nl2br.pipe';
import { EnumeratePipe } from './pipes/enumerate.pipe';


import { AppComponent } from './app.component';
import { EntranceComponent } from './components/entrance/entrance.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoryManagerComponent } from './components/category-manager/category-manager.component';
import { CommonAlertComponent } from './dialog-components/common-alert/common-alert.component';
import { ContentsService } from './services/contents.service';
import { ContentsManagerComponent } from './components/contents-manager/contents-manager.component';
import { ContentEditorComponent } from './components/content-editor/content-editor.component';
import { ContentDetailComponent } from './components/content-detail/content-detail.component';
import { SettingsManagerComponent } from './components/settings-manager/settings-manager.component';
import { BinarySelectComponent } from './dialog-components/binary-select/binary-select.component';
import { FileDropComponent } from './components/file-drop/file-drop.component';
import { AssetListComponent } from './components/asset-list/asset-list.component';
import { HumanizeBytesPipe } from './pipes/humanize-bytes.pipe';
import { RunningTimeComponent } from './components/running-time/running-time.component';
import { FaqComponent } from './components/faq/faq.component';
import { FaqModalComponent } from './components/faq-modal/faq-modal.component';


import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PostManagerService } from './services/post-manager.service';
import { FaqRemoveConfirmComponent } from './components/faq-remove-confirm/faq-remove-confirm.component';
import { NoticeComponent } from './components/notice/notice.component';
import { NoticeModalComponent } from './components/notice-modal/notice-modal.component';
import { NoticeRemoveConfirmComponent } from './components/notice-remove-confirm/notice-remove-confirm.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    Nl2brPipe,
    EnumeratePipe,
    EntranceComponent,
    DashboardComponent,
    ContentsManagerComponent,
    ContentEditorComponent,
    ContentDetailComponent,
    SettingsManagerComponent,
    CommonAlertComponent,
    CategoryManagerComponent,
    BinarySelectComponent,
    FileDropComponent,
    AssetListComponent,
    HumanizeBytesPipe,
    RunningTimeComponent,
    FaqComponent,
    FaqModalComponent,
    FaqRemoveConfirmComponent,
    NoticeComponent,
    NoticeModalComponent,
    NoticeRemoveConfirmComponent,
  ],
  entryComponents: [
    CommonAlertComponent,
    BinarySelectComponent,
    ContentDetailComponent,
    ContentEditorComponent,
    FaqModalComponent,
    FaqRemoveConfirmComponent,
    NoticeModalComponent,
    NoticeRemoveConfirmComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgSpinKitModule,
    ToastrModule.forRoot(),
    CustomMaterialModule,
    NgxMaterialTimepickerModule.forRoot(),
    
    RouterModule.forRoot([
      { path: 'login', component: EntranceComponent },
      { path: 'contents', component: ContentsManagerComponent },
      { path: 'contents-categories', component: CategoryManagerComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'notice', component: NoticeComponent },
      { path: '**', component: ContentsManagerComponent }
    ]),
    NgxUploaderModule,
    TextMaskModule,
  ],
  providers: [
    CommonBackendService,
    AuthService,
    DistrictSearchService,
    PostManagerService,
    ContentsService,
    

    Nl2brPipe, EnumeratePipe,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: LOCALE_ID, useValue: 'ko'},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

