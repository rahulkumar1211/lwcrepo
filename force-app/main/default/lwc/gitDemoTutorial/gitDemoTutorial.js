import { LightningElement } from 'lwc';

export default class GitDemoTutorial extends LightningElement {
    a=10
    b=20
    
    getSum(){
        return this.a+this.b;
    }
}