import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageService } from 'src/app/dialog/service/message.service';
import { AuthService, ILoginData } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginData: ILoginData = {};

  constructor(
    public auth: AuthService,
    public snackBar: MatSnackBar,
    public messageService: MessageService
  ) {}

  onLogin() {
    this.auth.login(this.loginData);
  }

  ngOnInit(): void {
    this.auth.logout();
    this.auth.error$.next('');
    this.auth.error$.subscribe({
      next: (error) => {
        if (error)
          this.messageService.showMessage('Hibás felhasználónév vagy jelszó!');
      },
    });
  }
}
