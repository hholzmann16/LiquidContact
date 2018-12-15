import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.sass"]
})
export class ContactComponent implements OnInit {
  messageForm: FormGroup;
  submitted: boolean = false;
  success: boolean = false;

  constructor(private api: ApiService, private formBuilder: FormBuilder) {
    this.messageForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      subject: ["", Validators.required],
      message: ["", Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.messageForm.invalid) {
      return;
    }

    this.success = true;
  }

  ngOnInit() {}
}
