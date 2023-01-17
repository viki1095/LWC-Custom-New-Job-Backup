import { LightningElement,track,api,wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import RECORDTYPE_FIELD from '@salesforce/schema/Job__c.RecordTypeId';
import TYPE_FIELD from '@salesforce/schema/Job__c.Type__c';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

export default class JobDetails extends LightningElement {
    @api recordId;
    @api open;
    @api label;
    objectApiName = 'Job__c';
    @track showSection = false;
    @track PrintDetails = false;
    @track TVDetails = false;
    @track RadioDetails = false;
    @track MicrositeDetails = false;
    handleSubmit(event) {
        console.log('onsubmit event recordEditForm' + event.detail.fields);
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
    handleCancel() {
        this.showSection = false;
    }
    SectionEnable() {
        if (!this.showSection) {
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
    validateFields() {
        this.template.querySelectorAll('lightning-input-field').forEach(element => {
            element.reportValidity();
        });
    }
    @wire(getRecord, { recordId: '$recordId', fields: [RECORDTYPE_FIELD,TYPE_FIELD] })
    userDetails({ error, data }) {
        if (error) {
            this.error = error;
        } else if (data) {
            if (data.fields.RecordTypeId.value =='012800000003WkAAAU') {
                this.PrintDetails = true;
                console.log(getFieldValue(data,RECORDTYPE_FIELD));
            }
           else if (data.fields.RecordTypeId.value =='012800000003Wk5AAE') {
                this.TVDetails = true;
                console.log(getFieldValue(data,RECORDTYPE_FIELD));
            }
            else if (data.fields.RecordTypeId.value =='012800000003WkBAAU') {
                this.RadioDetails = true;
                console.log(getFieldValue(data,RECORDTYPE_FIELD));
            }
            else if (data.fields.RecordTypeId.value =='012800000003WkFAAU' && data.fields.Type__c.value =='Microsite') {
                this.MicrositeDetails = true;
                console.log(getFieldValue(data,RECORDTYPE_FIELD,TYPE_FIELD));
            }
        }
    }
}