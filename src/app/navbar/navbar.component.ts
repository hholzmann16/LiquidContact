import { Component, NgModule, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.sass"]
})
export class NavbarComponent implements OnInit {
  company: string = "Liquid Contact";

  constructor(private router: Router) {}

  ngOnInit() {}
}
