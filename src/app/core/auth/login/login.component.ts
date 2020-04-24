import { PatternValidation } from "./../../../shared/helpers/custom-validation";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  signInForm;
  hide: boolean = true;
  constructor(private formbuilder: FormBuilder) {}

  ngOnInit() {
    this.signInForm = this.formbuilder.group({
      email: [
        "",
        [
          Validators.required,
          PatternValidation.patternValidator(
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            { hasEmail: true }
          ),
        ],
      ],
      password: ["", [Validators.required]],
    });
    this.onChanges();
  }

  get email() {
    return this.signInForm.get("email");
  }

  get password() {
    return this.signInForm.get("password");
  }

  onChanges() {
    this.signInForm.valueChanges.subscribe((data) => console.log(data));
  }
}