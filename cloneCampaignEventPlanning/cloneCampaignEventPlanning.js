import { LightningElement, track, api, wire } from 'lwc';
import fetchSobject from '@salesforce/apex/CloneCampaignEventPlanningCtrl.fetchSobject';
import cloneJob from '@salesforce/apex/CloneCampaignEventPlanningCtrl.cloneJob';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class CloneCampaignEventPlanning extends NavigationMixin(LightningElement) {
    @api recordId;
    
    @track CampaignName = '';
    @track CampaignType = '';

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
        if (event.target.name === 'CampaignName') {
            this.CampaignName = event.detail.value;
        }
        if (event.target.name === 'CampaignType') {
            this.CampaignType = event.detail.value;
        }
         
    }
    handleCampaignNameChange(event){
        this.CampaignName = event.target.value;
    } 

    handleCampaignTypeChange(event){
        this.CampaignType = event.target.value;
    }
    handleOnload(){
        this.CampaignName = this.template.querySelector('.name').value;
        this.CampaignType = this.template.querySelector('.type').value;
    }

    handleSubmit(event){
        // stop the form from submitting
        event.preventDefault();       
    }

    cloneJob(event) {
        if (this.isEmpty(this.CampaignName) || this.isEmpty(this.CampaignType))
        {
           this.showToastMessage('Error', 'warning', 'Please enter mandatory fields');
        }
        else
        {
            const jobRecordInfo = this.createJobRecord();
            jobRecordInfo.Id = null;
            jobRecordInfo.Name = this.CampaignName;
            jobRecordInfo.Type = this.CampaignType;
            console.log('jobRecordInfo ..2' + jobRecordInfo)
            
            cloneJob({ 
                newJob: jobRecordInfo,
                oldRecord: this.recordId
               
                }).then(accountId => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: `Campaign Event Planning Record Cloned, the Id is ${accountId}`,
                            variant: 'success',
                        }),
                    );

                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: accountId,
                        objectApiName: 'CampaignEventPlanning__c',
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
        
        //  1 - Get current form input fields
        //     Loop the input list and get every input value and assign it to the desired field
        //     The field name is set on every input dataset as the attribute "field"
        let inputs = this.template.querySelectorAll('lightning-input-field');
        inputs.forEach(input => {
            jobRecord[input.dataset.fieldName] = input.value;
        });

        // 2- Get current form rich text fields
        //     Loop the input list and get every input value and assign it to the desired field
        //     The field name is set on every input dataset as the attribute "field"
        let inputs2 = this.template.querySelectorAll('lightning-input-rich-text');
        inputs2.forEach(input => {
            jobRecord[input.dataset.fieldName] = input.value;
        });

        //  3 - Get current form textarea fields
        //     Loop the input list and get every input value and assign it to the desired field
        //     The field name is set on every input dataset as the attribute "field"
        let inputs3 = this.template.querySelectorAll('lightning-textarea');
        inputs3.forEach(input => {
            jobRecord[input.dataset.fieldName] = input.value;
        });

        //  3 - Get current form combobox fields
        //     Loop the input list and get every input value and assign it to the desired field
        //     The field name is set on every input dataset as the attribute "field"
        let inputs4 = this.template.querySelectorAll('lightning-combobox');
        inputs4.forEach(input => {
            jobRecord[input.dataset.fieldName] = input.value;
        });

        //New Interactive  RT
        //jobRecord.recordTypeId ='012800000003WkFAAU';

        return jobRecord;
    }

     
    // Navigation to Record Page
    cancel() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: 'CampaignEventPlanning__c',
                actionName: 'view'
            },
        });
    }
        

}