import { animate, state, style, transition, trigger } from '@angular/core';

export const KATA_PLAYER_ANIMATIONS = [
    trigger('startKata', [
        transition(':enter', [
            style({ opacity: 0 })
        ]),
        state('reading', style({
            opacity: 0
        })),
        state('writing', style({
            opacity: 1
        })),
        transition('* => *', animate('400ms ease-in-out'))
    ]),
    trigger('unitTestCase', [
        state('null', style({
            display: 'none',
            height: 0
        })),
        state('closed', style({
            display: 'none',
            height: 0
        })),
        state('opened', style({
            display: 'block',
            height: '*'
        })),
        transition('null => closed', animate('400ms ease-in')),
        transition('opened => closed', animate('400ms ease-in')),
        transition('closed => opened', animate('400ms ease-out'))
    ])
];