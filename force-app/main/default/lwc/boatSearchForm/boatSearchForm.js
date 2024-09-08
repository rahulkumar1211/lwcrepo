import { LightningElement,wire } from 'lwc';
import getBoatTypes from '@salesforce/apex/BoatDataService.getBoatTypes';

export default class BoatSearchForm extends LightningElement {
    selectedBoatTypeId;
    searchOptions;
    error;
  
    @wire(getBoatTypes)
    getBoat({data,error}){
        if(data){
            this.searchOptions=data.map(type=>{
                return {label:type.Name, value:type.Id};
            })
            this.searchOptions.unshift({label:'All Types', value:''});
        }
        else if(error){
            this.searchOptions=undefined;
            this.error=error;
        }
    }


    handleSearchOptionChange(event){
        this.selectedBoatTypeId=event.detail.value;
        console.log('selected boat type id: ', this.selectedBoatTypeId)
        const searchEvent=new CustomEvent('search',{
            detail:{
                boatTypeId:this.selectedBoatTypeId
            }
        })
        this.dispatchEvent(searchEvent);
    }
}