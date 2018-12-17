import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.sass"]
})
export class ContactComponent implements OnInit {
  messageForm: FormGroup;
  submitted: boolean = false; // Toggled when form is submitted
  success: boolean = false; // Toggled on a successful post request
  badRequest: boolean = false; // Toggled on a failed post request

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
    // Creating message form with validators
    this.messageForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      subject: ["", Validators.required],
      body: ["", Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.badRequest = false;
    this.success = false;

    // Checks validators before sending API request
    if (this.messageForm.invalid) {
      return;
    }

    this.api.postContact(this.messageForm.value).subscribe(
      () => {
        this.success = true;

        const modal = this.modalService.open(ModalComponent);
        modal.componentInstance.title = "Great success!";
        modal.componentInstance.success = this.success;
      },
      err => {
        console.log("Error occurred posting contact information", err);
        this.badRequest = true;

        const modal = this.modalService.open(ModalComponent);
        modal.componentInstance.title = "Uh oh!";
        modal.componentInstance.badRequest = this.badRequest;
      }
    );
  }

  ngOnInit() {}
}
