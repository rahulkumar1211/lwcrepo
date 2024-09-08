import { LightningElement,api, track } from 'lwc';

const TILE_WRAPPER_SELECTED_CLASS='tile-wrapper selected';
const TILE_WRAPPER_UNSELECTED_CLASS='tile-wrapper';

    // imports
export default class BoatTile extends LightningElement {
    @api boat;
    @track selectedBoatId;//will track the Id of the selected boat

    connectedCallback(){
        this.selectedBoatId=null;
    }
    
    // Getter for dynamically setting the background image for the picture
    get backgroundStyle() { 
        return `background-image: url(${this.boat.Picture__c})`;
    }
    
    // Getter for dynamically setting the tile class based on whether the
    // current boat is selected
    get tileClass() {
        return this.selectedBoatId===this.boat.Id? TILE_WRAPPER_SELECTED_CLASS:TILE_WRAPPER_UNSELECTED_CLASS;
     }
    
    // Fires event with the Id of the boat that has been selected.
    selectBoat() { 
        this.selectedBoatId=this.boat.Id;
       // console.log('Selected boat Id & Name: ', this.selectedBoatId, ' and Name: ', this.boat.Name);
        const boatSelectEvent=new CustomEvent('boatselect',{
            detail:{
                boatId:this.boat.Id,
                boat:this.boat
            }
        })
        this.dispatchEvent(boatSelectEvent);
    }
 
}
  
