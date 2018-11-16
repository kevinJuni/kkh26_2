import { Component } from '@angular/core';
import { NgbPaginationConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './services/auth.service';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
//import { ManagerEditorComponent } from './manager-editor/manager-editor.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  devEnv = !environment.production;

  constructor (
    private router: Router,
    private modals: NgbModal,
    private auth: AuthService,
    private translate: TranslateService,
  ) {
    translate.setDefaultLang('en');
    translate.use('ko');
  }


  get me() { return this.auth.me; }


  get displayMenu () {
    return this.router.url != '/login';
  }

  logout () {
    this.auth.logout();
  }

  editProfile () {
//    let dialog = this.modals.open(ManagerEditorComponent, {size: 'sm'});
//    dialog.componentInstance.bind(this.me);

  }
}
