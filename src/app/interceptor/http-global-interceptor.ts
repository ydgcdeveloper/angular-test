import { CommonService } from './../service/common/common.service';
import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable()
export class GlobalHttpInterceptorService implements HttpInterceptor {

    constructor(
        public router: Router,
        private commonService: CommonService
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
            catchError((error) => {
                if (error instanceof HttpErrorResponse) {
                    if (error.error instanceof ErrorEvent) {
                        console.error("Error Event");
                    } else {
                        // console.log(`error status : ${error.status} ${error.statusText}`);
                        switch (error.status) {
                            case 401:      //login
                                if ((error.statusText as string).toLowerCase() == 'unauthorized') {
                                    // console.log('Error 401', error.error.message);
                                    this.commonService.showNotification('noti-error', error.error.message);
                                }
                                break;
                            case 400:
                                if (error.error.status == 'error_form') {
                                    if (Object.keys(error.error.form_errors).includes('firstName')) {
                                        this.commonService.showNotification('noti-error', error.error.form_errors.firstName);
                                    }
                                    if (Object.keys(error.error.form_errors).includes('lastName')) {
                                        this.commonService.showNotification('noti-error', error.error.form_errors.lastName);
                                    }
                                    if (Object.keys(error.error.form_errors).includes('email')) {
                                        this.commonService.showNotification('noti-error', error.error.form_errors.email);
                                    }
                                    if (Object.keys(error.error.form_errors).includes('plainPassword')) {
                                        this.commonService.showNotification('noti-error', error.error.form_errors.plainPassword.data[0]);
                                    }
                                    if (Object.keys(error.error.form_errors).includes('username')) {
                                        this.commonService.showNotification('noti-error', error.error.form_errors.username);
                                    }
                                }

                                if(error.error.status == 'error') {
                                    this.commonService.showNotification('noti-error', error.error.message);
                                }
                                break;
                            case 502:
                                this.commonService.showNotification('noti-error', 'Unknown error, try again later');
                                break;
                        }
                    }
                } else {
                    console.error("some thing else happened");
                }
                return throwError(error);
            })
        )
    }
}