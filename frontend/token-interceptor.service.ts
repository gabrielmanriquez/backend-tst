import { Injectable } from "@angular/core";
import { HttpHandler, HttpRequest, HttpInterceptor, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }


  intercept(req:HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem("token");
    const tokenizedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(tokenizedRequest).pipe(
      finalize( () =>  console.log("Solicitud enviada") )
    );
  }
}
