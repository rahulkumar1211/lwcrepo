import { LightningElement,api,wire } from 'lwc';
import GET_BOAT from '@salesforce/apex/BoatDataService.getBoat';
import GET_BOATS from '@salesforce/apex/BoatDataService.getBoats';
import UPDATE_BOATS from '@salesforce/apex/BoatDataService.updateBoatList';
import refreshApex from '@salesforce/apex';

const COLUMNS=[
    {label:'Name', fieldName:'Name', editable:'true'},
    {label:'Price', fieldName:'Price__c', editable:'true'},
    {label:'Length', fieldName:'Length__c', editable:'true'},
    {label:'Description', fieldName:'Description__c', editable:'true'}
]
export default class BoatSearchResults extends LightningElement {
    boats; //property to store the lists of boats coming GET_BOAT apex method
    error; //any error encountered from apex.
    columns=COLUMNS;

    @wire
    (GET_BOATS)
    wiredBoats({data,error}){
        if(data){
            this.boats=data;
            this.error=undefined;
        }
        else if(error){
            this.error=JSON.stringify(JSON.parse(error));
            this.boats=undefined;
        }
    }


    @api 
    searchBoats(boatTypeId){
        GET_BOAT({boatTypeId: boatTypeId})
        .then(result=>{
            this.boats=result;
        })
        .catch(error=>{
            console.log('Error : ', error);
        })
    }
    //function will fire on custom event from boatTile component
    //It will show the selected boat in the gallery
    updateSelectedTile(event){
        console.log('Id of the selected boat', event.detail.boatId);
        console.log('Information of the selected boat ',JSON.stringify(event.detail.boat));
    }

    handleSave(event){
        console.log('value after being changed is: ', event.detail.draftValues);
        const boatLists=event.detail.draftValues;
        UPDATE_BOATS({boats:boatLists})
        .then(()=>{
            console.log('successfully updated');
            this.refreshData();
        })
        .catch(error=>{
            console.log(error);
        })
    }

    refreshData(){
        refreshApex(this.wiredBoats);
        refreshApex(this.searchBoats);
    }
}