import { LightningElement,wire } from 'lwc';
import {reduceErrors} from 'c/ldsUtils';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import FIRST_NAME from '@salesforce/schema/Contact.FirstName';
import LAST_NAME from '@salesforce/schema/Contact.LastName';
import EMAIL from '@salesforce/schema/Contact.Email';

const COLUMNS=[
    {label:'FirstName', fieldName: FIRST_NAME.fieldApiName, type:'text'},
    {label:'LastName', fieldName:LAST_NAME.fieldApiName, type:'text'},
    {label:'Email', fieldName:EMAIL.fieldApiName, type:'email'}
]

export default class ContactList extends LightningElement {
    columns=COLUMNS;
    contactData;

    @wire(getContacts)
    contactData;

    get errors(){
        return this.contactData.error? reduceErrors(this.contactData.error):[];
    }
    
}