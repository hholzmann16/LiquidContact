import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";

import { ContactComponent } from "./contact.component";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { HttpErrorResponse } from "@angular/common/http";
import { ApiService } from "../api.service";

describe("ContactComponent", () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  const mockFailureTests = [
    {
      expectedStatus: 400,
      expectedMessage: "Request body did not include required field: email",
      value: {}
    },
    {
      expectedStatus: 400,
      expectedMessage: "Request body did not include required field: email",
      value: {
        email: "",
        subject: ""
      }
    },
    {
      expectedStatus: 400,
      expectedMessage: "Request body did not include required field: email",
      value: {
        email: "",
        subject: "",
        body: ""
      }
    },
    {
      expectedStatus: 400,
      expectedMessage: "Request body did not include required field: subject",
      value: {
        email: "test@example.com",
        subject: "",
        body: ""
      }
    },
    {
      expectedStatus: 400,
      expectedMessage: "Request body did not include required field: body",
      value: {
        email: "test@example.com",
        subject: "this is a subject",
        body: ""
      }
    }
  ];

  const mockSuccessTests = [
    {
      expectedMessage: "Success",
      value: {
        email: "test@example.com",
        subject: "This is a test",
        body: "I love using Liquid Contact!"
      }
    },
    // Bad email is not caught on API, but front-end validator catches this
    {
      expectedMessage: "Success",
      value: {
        email: "bademail",
        subject: "subject",
        body: "message"
      }
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [ApiService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should fail the mock failure tests", () => {
    const apiService = TestBed.get(ApiService);

    mockFailureTests.forEach(test => {
      apiService.postContact(test.value).subscribe(
        () => {
          console.log("Bad data came back with a good response");
          expect(true).toBe(false);
        },
        (err: HttpErrorResponse) => {
          expect(err.status).toEqual(test.expectedStatus);
          expect(err.message).toEqual(test.expectedMessage);
        }
      );
    });
  });

  it("should pass the mock success tests", () => {
    const apiService = TestBed.get(ApiService);

    mockSuccessTests.forEach(test => {
      apiService.postContact(test.value).subscribe(
        data => {
          expect(data.message).toEqual(test.expectedMessage);
        },
        (err: HttpErrorResponse) => {
          console.log("Good data came back with an error response");
          expect(true).toBe(false);
        }
      );
    });
  });
});
