import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonAlertComponent } from './dialog-components/common-alert/common-alert.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  devEnv = !environment.production;

  constructor (
    private router: Router,
    private dialog: MatDialog,
    private translate: TranslateService,
    private auth: AuthService,
  ) {
    translate.setDefaultLang('en');
    translate.use('ko');
  }


  get me() { return this.auth.me; }


  get displayMenu () {
    return this.router.url != '/login';
  }

  logout () {
    this.auth.logout()
    .subscribe(res => this.router.navigate(['/login']), this.onError.bind(this));
  }

  onError () {
    this.dialog.open(CommonAlertComponent, {
      width: '250px',
      data: {title: '오류', prompt: '로그인 중 오류가 발생했습니다.'}
    });
  }
}
