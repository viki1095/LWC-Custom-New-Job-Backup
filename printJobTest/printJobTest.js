import { LightningElement,track,api,wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import RECORDTYPE_FIELD from '@salesforce/schema/Job__c.RecordTypeId';
import TYPE_FIELD from '@salesforce/schema/Job__c.Type__c';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';

import { getRelatedListRecords } from 'lightning/uiRelatedListApi';

const COLUMNS = [   
    { label: 'Name', fieldName: 'Name' },
    { label: 'Type', fieldName: 'Type__c' }
];

export default class PrintJobTest extends NavigationMixin(LightningElement) {

    recordCount;
    error;
    records;
    columns = COLUMNS;

    displayDetails = true;
    accountId;
    @api recordId;
    @track PrintDetails = false;
    @track TVDetails = false;
    @track RadioDetails = false;
    @track MicrositeDetails = false;
  
    handleSuccess(event) {
        this.accountId = event.detail.id;
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

    @wire( getRelatedListRecords, {
        parentRecordId: 'a088A000005RbvCQAS',
        relatedListId: 'Job__c',
        fields: [ 'Job__c.Id', 'Job__c.Name', 'Job__c.Type__c' ]
    } )listInfo( { error, data } ) {
        if ( data ) {
            console.log( 'Data is', JSON.stringify( data ) );
            let tempRecords = [];
            data.records.forEach( obj => {
                console.log( 'obj is', JSON.stringify( obj ) );
                let tempRecord = {};
                tempRecord.Id = obj.fields.Id.value;
                tempRecord.Name = obj.fields.Name.value;
                tempRecord.Type__c = obj.fields.Type__c.value;
                tempRecords.push( tempRecord );
            } );
            this.records = tempRecords;
            this.recordCount = data.count;
            console.log( 'Records are ' + JSON.stringify( this.records ) );
        } else if (error) {
            this.records = undefined;
        }
    }

    
}