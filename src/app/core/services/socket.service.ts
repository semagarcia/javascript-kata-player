import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {

    url: string;
    socket: SocketIOClient.Socket;
    
    constructor() {
        if(environment.production) {
            this.socket = io.connect();
        } else {
            this.url = `${window.location.protocol}//${window.location.hostname}:3000`;
            this.socket = io.connect(this.url);
            this.sendMessage('message', {message: 'hello'});
        }
    }

    getSocketId(): string {
        return (this.socket) ? this.socket.id : '';
    }

    connectToStreaming(socketEventName) {
        return Observable.fromEvent(this.socket, socketEventName);
    }

    sendMessage(type: string, payload: object) {
        this.socket.emit(type, payload);
    }

}