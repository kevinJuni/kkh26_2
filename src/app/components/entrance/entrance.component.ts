import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CommonAlertComponent } from 'app/dialog-components/common-alert/common-alert.component';
import { AuthService } from 'app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entrance',
  templateUrl: './entrance.component.html',
  styleUrls: ['./entrance.component.css']
})
export class EntranceComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private auth: AuthService,
  ) { this.makeForm(); }

  makeForm () {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login () {
    let form = this.form.value;
    this.auth.login(form.username, form.password).subscribe(
      res => {
        this.router.navigate(['/contents'])
      },
      this.onError.bind(this)
    );
  }

  onError () {
    this.dialog.open(CommonAlertComponent, {
      width: '250px',
      data: {title: '오류', prompt: '로그인 중 오류가 발생했습니다.'}
    });
  }

}
