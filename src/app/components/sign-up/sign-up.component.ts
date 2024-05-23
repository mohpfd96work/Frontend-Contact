import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import User, { UserResponse } from '../../Interfaces/user.interface';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  term: boolean = false;
  signUpCredential: User = {
    username: '',
    email: '',
    password: '',
    profileImage: '',
    remember: false,
  };
  private userService: UserService = inject(UserService);
  private router: Router = inject(Router);
  signUp() {
    this.userService.createUser(this.signUpCredential).subscribe({
      next: (res: UserResponse<User>) => {
        console.log(res);
        this.router.navigate([`contacts/${res.data._id}`]);
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  signIn() {
    this.router.navigate(['/sign-in']);
  }
  TermCheck(event: any) {
    this.term = event.target.checked;
  }
}