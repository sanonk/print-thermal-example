import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "Example3";
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}
  onButtonClicked() {
    this.http
      .get("assets/sample.pdf", { responseType: "arraybuffer" })
      .subscribe(arrayBuffer => {
        var base64String = btoa(
          String.fromCharCode.apply(null, new Uint8Array(arrayBuffer))
        );

        let formData: FormData = new FormData();
        formData.append("base64", base64String);

        this.http
          .post("http://192.168.1.34/api/pdf2thermal", formData, {
            responseType: "arraybuffer"
          })
          .subscribe(
            data => {
              console.log(data);
            },
            error => {
              console.log(error);
            }
          );
      });
  }
}
