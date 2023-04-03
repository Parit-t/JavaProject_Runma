import { PaymentService } from './../../../services/payment.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-payment',
  templateUrl: './post-payment.component.html',
  styleUrls: ['./post-payment.component.css'],
})
export class PostPaymentComponent {
  paymentForm!: FormGroup;
  ticketId: number = 0;

  constructor(
    private payment: FormBuilder,
    private payMentService: PaymentService,
    private activeatedRoute: ActivatedRoute
  ) {
    this.paymentForm = new FormGroup({});
    this.createForm();
  }

  ngOnInit(): void {
    this.ticketId = this.activeatedRoute.snapshot.params['id'];
  }

  createForm() {
    this.paymentForm = this.payment.group({
      ticketId: [this.ticketId],
      bankName: ['', [Validators.required]],
      paidDate: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      imageProof: ['', [Validators.required]],
      status: ['paid'],
    });
  }

  onSubmit() {
    this.payMentService
      .addPayment(this.ticketId, this.paymentForm.value)
      .subscribe((req) => {
        console.log(req);
      });
  }
}
