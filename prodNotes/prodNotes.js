import { LightningElement,track,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ProdNotes extends LightningElement {
@api recordId;
@api open;
@api label;
objectApiName = 'Job__c';
@track showSection = false;
handleSubmit(event) {
console.log('onsubmit event recordEditForm'+ event.detail.fields);
}
handleSuccess(event) {
console.log('onsuccess event recordEditForm', event.detail.id);
    this.showSection = false;
    const evt = new ShowToastEvent({
        title: "Success!",
        message: "The record has been successfully saved.",
        variant: "success",
    });
    this.dispatchEvent(evt);
    this.editMode = false;
}
handleError() {
    const evt = new ShowToastEvent({
        title: "Error!",
        message: "An error occurred while attempting to save the record.",
        variant: "error",
    });
    this.dispatchEvent(evt);
    this.editMode = false;
}
   handleCancel(){
    this.showSection = false;   
    }
SectionEnable() {
    if(!this.showSection) {
        this.showSection = true;
    }
}
get sectionClass() {
    return this.open ? 'slds-section' : 'slds-section slds-is-open';
}

connectedCallback() {
    if (typeof this.open === 'undefined') this.open = true;
}

handleClick() {
    this.open = !this.open;
}
}