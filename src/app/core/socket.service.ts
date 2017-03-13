import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {

    url: string;
    socket: SocketIOClient.Socket;
    
    constructor() {
        this.url = `${window.location.protocol}//${window.location.hostname}:5000`;

        /*this.socket = io.connect(this.url);
        this.socket.on("connect", () => console.log('connect: '+this.socket.id));
        this.socket.on("disconnect", () => console.log('d'));
        this.socket.on('error', (error: string) => {
            console.log(`ERROR: "${error}" (${this.url})`);
        });*/

        this.socket = io.connect(this.url);
        let listener = Observable.fromEvent(this.socket, 'msg')
            .subscribe((payload) => { console.log('MSG: ', payload); });
        /*let listener2 = Observable.fromEvent(this.socket, 'code')
            .subscribe((payload) => { console.log('Payload2: ', payload); });*/
        
        /*let obs = new Observable(observer => {
            this.socket = io.connect(this.url);
            this.socket.on('msg', (payload) => { observer.next(payload) });
            this.socket.on('msg2', (payload) => { observer.next(payload) });
            return () => { this.socket.disconnect(); };
        });
        obs.subscribe((data) => { console.log('>> ', data); });*/
    }

    getSocketId(): string {
        return (this.socket) ? this.socket.id : '';
    }

    connectToStreaming() {
        return Observable.fromEvent(this.socket, 'code');
    }

    /*get(): Observable<any> {
        return Observable.create((observer: any) => {
            this.socket.on('msg', (item: any) => { console.log('Msg received: ', item); });
            return () => this.socket.close();
        });
    }*/

    sendMessage(type, payload) {
        //this.socket.send(type, payload);
        this.socket.emit(type, payload);
    }

}