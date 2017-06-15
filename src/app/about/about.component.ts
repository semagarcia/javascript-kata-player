import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

    // {name:string, contribution:string, pic:string, bio:string}
    contributors: Array<any>;

    constructor() { }

    ngOnInit() {
        this.contributors = [
            { 
                name: 'Sema García', 
                contribution: 'Creator of KataPlayer & Contributor', 
                pic: 'https://avatars2.githubusercontent.com/u/10792397?v=3&s=300', 
                bio: 'Lorem ipsum...',
                twitter: '',
                linkedin: '' 
            },
            { 
                name: 'Adrián Ferreres Esteller', 
                contribution: 'Full-stack Contributor', 
                pic: 'https://avatars0.githubusercontent.com/u/3256924?v=3&s=300', 
                bio: 'Lorem ipsum...',
                twitter: '',
                linkedin: '' 
            },
            { 
                name: 'The next contributor', 
                contribution: 'The next one could be you', 
                pic: '/assets/images/female_contributor.png', 
                bio: 'Lorem ipsum...',
                twitter: '',
                linkedin: '' 
            }
        ];
    }

}
