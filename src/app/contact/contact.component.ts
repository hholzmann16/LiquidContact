import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.sass"]
})
export class ContactComponent implements OnInit {
  messageForm: FormGroup;
  success: boolean = false;
  badRequest: boolean = false;

  constructor(private api: ApiService, private formBuilder: FormBuilder) {
    this.messageForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      subject: ["", Validators.required],
      body: ["", Validators.required]
    });
  }

  onSubmit() {
    this.badRequest = false;
    this.success = false;

    this.api
      .postContact(this.messageForm.value)
      .pipe(
        catchError(() => {
          this.badRequest = true;
          throw new Error("This error is logged!.... or should be at least.");
        })
      )
      .subscribe(contact => {
        this.success = true;
        // angular.element("messageModal").
      });
  }

  ngOnInit() {}
}
