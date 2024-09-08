import { LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
import GET_BOAT from '@salesforce/apex/BoatDataService.getBoat';

export default class BoatSearch extends NavigationMixin(LightningElement) {
    isLoading = false;
    boatTypeId;
  
    // Handles loading event
    handleLoading() { 
       this.isLoading= !this.isLoading;
    }
    
    // Handles done loading event
    handleDoneLoading() {
        this.handleLoading();
     }
    
    // Handles search boat event
    // This custom event comes from the form
    searchBoats(event) {
        this.handleLoading();
        this.boatTypeId=event.detail.boatTypeId;
        this.template.querySelector('c-boat-search-results').searchBoats(this.boatTypeId);
        this.handleDoneLoading();
     }
    
    //Handles create new Boat functionality add using lightning-button
    createNewBoat() {
        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',
            attributes:{
                objectApiName:'Boat__c',
                actionName:'new',
            },
        })
     }
}