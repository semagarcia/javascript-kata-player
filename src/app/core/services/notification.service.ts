import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {

    constructor() {}

    /**
     * Method to send and show a notification 
     * @param title 
     * @param body 
     */
    sendNotification(title: string, body: string) {
        Notification.requestPermission().then(function(result) {
            new Notification(title, {
                body: body,
                icon: './../../assets/images/logo_javascript.png'
            });
        }); 
    }

}