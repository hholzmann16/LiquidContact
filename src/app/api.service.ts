import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { ContactForm } from "./contact/contactForm";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private http: HttpClient) {}

  postContact(contactForm: ContactForm) {
    return this.http.post(
      "http://interview-contact-submit-api-lb-1009699934.us-east-1.elb.amazonaws.com/contact-us/send",
      contactForm
    );
  }
}
