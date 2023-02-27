import { LightningElement,track,api,wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import RECORDTYPE_FIELD from '@salesforce/schema/Job__c.RecordTypeId';
import TYPE_FIELD from '@salesforce/schema/Job__c.Type__c';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';

import fetchSobject from '@salesforce/apex/cloneJobCtrl.fetchSobject';
import cloneJob from '@salesforce/apex/cloneJobCtrl.cloneJob';


export default class PrintJobTest extends NavigationMixin(LightningElement) {

accountId;
@api recordId;
@track PrintDetails = false;
@track TVDetails = false;
@track RadioDetails = false;
@track MicrositeDetails = false;

@track JobName = '';
@track JobType = '';
@track JobMarket = '';
@track JobRegion = '';
@track JobPOAType = '';
@track JobLiveDate = '';

JobRec; 
JobColumns = [];

@wire(fetchSobject,{
    RecordId : '$recordId'
})lstObjects({error,data}){
    if(data){
    var conCol=[];

    console.log('data===> ' + JSON.stringify(data));
    let lstSobject = JSON.parse(JSON.stringify(data));
    var lstJob =  lstSobject.lstJob;
    for(let Rec in lstJob[0])
    {
        conCol.push( { label: Rec, fieldName: Rec });
    }
        this.JobColumns = conCol;
        this.JobRec = lstJob;
    }
    else if(error){
        console.log('error===> ' + JSON.stringify(error));
    }
}

 //To show Sections Based on Job Type and RecordTypeId
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


showToastMessage(Title, Variant, exMessage) {
    const toastEvent = new ShowToastEvent({
        title: Title,
        variant: Variant,
        message: exMessage
    });
    this.dispatchEvent(toastEvent);
}

// Utility Function to check whether a given string is empty/null
isEmpty(str) {
    return (!str || 0 === str.length || str === null || str === '' || str === undefined);
}

genericChange(event) {
    //this[event.target.name] = event.detail.value; 
    alert(event.target.name + event.detail.value);
    if (event.target.name === 'JobName') {
        this.JobName = event.detail.value;
    }
    if (event.target.name === 'JobType') {
        this.JobType = event.detail.value;
    }
    if (event.target.name === 'JobMarket') {
        this.JobMarket = event.detail.value;
    }
    if (event.target.name === 'JobRegion') {
        this.JobRegion = event.detail.value;
    }
    if (event.target.name === 'JobPOAType') {
        this.JobPOAType = event.detail.value;
    }
    if (event.target.name === 'JobLiveDate') {
        this.JobLiveDate = event.detail.value;
    }
        
}

handleJobNameChange(event){
    this.JobName = event.target.value;
} 
handleJobTypeChange(event){
    this.JobType = event.target.value;
}
handleJobMarketChange(event){
    this.JobMarket = event.target.value;
}
handleJobRegionChange(event){
    this.JobRegion = event.target.value;
} 
handleJobPOATypeChange(event){
    this.JobPOAType = event.target.value;
}
handleJobLiveDateChange(event){
    this.JobLiveDate = event.target.value;
}
handleOnload(){
    this.JobName = this.template.querySelector('.name').value;
    this.JobType = this.template.querySelector('.type').value;
    this.JobMarket = this.template.querySelector('.market').value;
    this.JobRegion = this.template.querySelector('.region').value;
    this.JobPOAType = this.template.querySelector('.poa').value;
    this.JobLiveDate = this.template.querySelector('.live').value;
}
handleSubmit(event){
    // stop the form from submitting
    event.preventDefault();       
}

cloneJob(event) {
    if (this.isEmpty(this.JobName) || this.isEmpty(this.JobType) || this.isEmpty(this.JobMarket) || this.isEmpty(this.JobRegion) || this.isEmpty(this.JobPOAType) || this.isEmpty(this.JobLiveDate))
    {
        this.showToastMessage('Error', 'warning', 'Please enter mandatory fields');
    }
    else
    {
        const jobRecordInfo = this.createJobRecord();
        jobRecordInfo.Id = null;
        jobRecordInfo.Name = this.JobName;
        jobRecordInfo.Type = this.JobType;
        jobRecordInfo.Market = this.JobMarket;
        jobRecordInfo.Region = this.JobName;
        jobRecordInfo.POA = this.JobType;
        jobRecordInfo.Live = this.JobMarket;
        console.log('jobRecordInfo ..2' + jobRecordInfo)
        
        cloneJob({ 
            newJob: jobRecordInfo,
            oldRecord: this.recordId
            
            }).then(accountId => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: `Job Cloned, the Id is ${accountId}`,
                        variant: 'success',
                    }),
                );

            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: accountId,
                    objectApiName: 'Job__c',
                    actionName: 'view'

                }
            });
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.body.message,
                    variant: 'error',
                })
            );
        });
    
    }
}

createJobRecord() {
    const jobRecord = {};
    let inputs = this.template.querySelectorAll('lightning-input-field');
    inputs.forEach(input => {
    jobRecord[input.dataset.fieldName] = input.value;
    });
    let inputs2 = this.template.querySelectorAll('lightning-input-rich-text');
    inputs2.forEach(input => {
    jobRecord[input.dataset.fieldName] = input.value;
    });
    let inputs3 = this.template.querySelectorAll('lightning-textarea');
    inputs3.forEach(input => {
    jobRecord[input.dataset.fieldName] = input.value;
    });
    let inputs4 = this.template.querySelectorAll('lightning-combobox');
    inputs4.forEach(input => {
    jobRecord[input.dataset.fieldName] = input.value;
    });
    // Save Job Records based on Job Type and RecordTypeId
    if (jobRecord.Type__c === 'Newspaper'||jobRecord.Type__c === 'Magazine'||jobRecord.Type__c === 'Out of Home'||jobRecord.Type__c === 'POS'){
    jobRecord.RecordTypeId = '012800000003WkAAAU';
    }else if (jobRecord.Type__c === 'TV'||jobRecord.Type__c === 'Pre-roll'||jobRecord.Type__c === 'Web Video'||jobRecord.Type__c === 'Banner Video'||jobRecord.Type__c === 'Presentation Video'||jobRecord.Type__c === 'Demo Video') {
    jobRecord.RecordTypeId = '012800000003Wk5AAE';
    }else if (jobRecord.Type__c === 'Radio') {
    jobRecord.RecordTypeId = '012800000003WkBAAU';
    }else if (jobRecord.Type__c === 'Microsite') {
    jobRecord.RecordTypeId = '012800000003WkFAAU';
    }
    return jobRecord;
    }
// Navigation to Record Page
cancel() {
    this[NavigationMixin.Navigate]({
        type: 'standard__recordPage',
        attributes: {
            recordId: this.recordId,
            objectApiName: 'Job__c',
            actionName: 'view'
        },
    });
}


}