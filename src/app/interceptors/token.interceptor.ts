import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
    Router
} from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    token:string = '';
    protected url   = '';
    protected debug = true;

    constructor(private router: Router,
        private storage: Storage,
        public toastController: ToastController,
        private alertController: AlertController,) { }

        intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

            // YOU CAN ALSO DO THIS
            // const token = this.authenticationService.getToke()
    
            return from(this.storage.get('wago_token'))
                .pipe(
                    switchMap(token => {
                        if (token) {
                            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
                        }
    
                        if (!request.headers.has('Content-Type')) {
                            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
                        }
    
                        if (this.debug) {
                            request = request.clone({ url: this.url + request.url + '?XDEBUG_SESSION_START=1'});
                        }
    
                        return next.handle(request).pipe(
                            map((event: HttpEvent<any>) => {
                                if (event instanceof HttpResponse) {
                                    // do nothing for now
                                }
                                return event;
                            }),
                            catchError((error: HttpErrorResponse) => {
                                const status =  error.status;
                                const reason = error && error.error.reason ? error.error.reason : '';
    
                                this.presentAlert(status, reason);
                                return throwError(error);
                            })
                        );
                    })
                );
    
    
        }
    
        async presentAlert(status, reason) {
            const alert = await this.alertController.create({
                header: status + ' Error',
                subHeader: 'Subtitle',
                message: reason,
                buttons: ['OK']
            });
    
            await alert.present();
        }

}