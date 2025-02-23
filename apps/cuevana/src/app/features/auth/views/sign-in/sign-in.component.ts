import { ChangeDetectorRef, Component, ElementRef, inject, OnInit, signal, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, of } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  imports: [FormsModule, ReactiveFormsModule]
})
export class AuthSignInComponent implements OnInit {
  form: FormGroup;
  readonly isValid = signal<boolean>(false);
  readonly isLoading = signal<boolean>(false);
  readonly pwdInput = viewChild<ElementRef>('pwdInput');

  readonly fb = inject(FormBuilder);
  readonly router = inject(Router);
  readonly cRef = inject(ChangeDetectorRef);

  constructor() {
    this.builder();
  }

  builder(): void {
    this.form = this.fb.group({
      tipodoc: ['DNI', Validators.required],
      numdoc: [null, [Validators.required, Validators.minLength(8)]],
      password: [null]
    });
  }

  ngOnInit() {
    this.isLoading.set(false);
  }

  validate(): void {
    if (this.isValid()) {
      const values = this.form.value;
      // console.log(values);
      this.isLoading.set(true);

      of(null)
        .pipe(delay(500))
        .subscribe(() => {
          this.router.navigateByUrl('/');
        });
    }

    if (this.form.valid) {
      // Consultar a la base de datos que el dni existe
      this.isValid.set(true);

      // Pasamos el focus al password
      this.cRef.detectChanges();
      this.pwdInput().nativeElement.focus();
    }
  }

  validateKeyNumbers(e: KeyboardEvent): void {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];

    if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  }

}