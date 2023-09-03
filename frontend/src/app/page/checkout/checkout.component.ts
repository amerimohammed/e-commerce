import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { loadStripe } from '@stripe/stripe-js';
import { env } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CartService } from 'src/app/service/cart.service';

const apiUrl = env.apiUrl + '/stripe';
/**
 * @title Stepper that displays errors in the steps
 */
@Component({
  selector: 'app-checkout',
  templateUrl: 'checkout.component.html',
  styleUrls: ['checkout.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
  standalone: true,
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class CheckoutComponent {
  stripePromise = loadStripe(env.stripePublicKey);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    private cartService: CartService
  ) {}

  async pay(): Promise<void> {
    const checkoutItems = this.cartService.getItems().map((item) => ({
      productId: item.product.productId,
      quantity: item.quantity,
    }));

    const stripe = await this.stripePromise;

    this.http
      .post(`${apiUrl}/payment`, checkoutItems)
      .subscribe((data: any) => {
        if (stripe) {
          stripe.redirectToCheckout({
            sessionId: data.id,
          });
        }
      });
  }
}
