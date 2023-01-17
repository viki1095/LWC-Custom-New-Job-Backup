import { LightningElement,track,wire,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import fetchSpecificType from '@salesforce/schema/Job__c.Type__c';
import fetchStatus from '@salesforce/schema/Job__c.Status__c';
import fetchColor from '@salesforce/schema/Job__c.Color__c';
import fetchCreativeCoordinator from '@salesforce/schema/Job__c.Creative_Coordinator__c';
import fetchPOA from '@salesforce/schema/Job__c.POA_Type__c';

import getUserList from '@salesforce/apex/CreateJobWizardController.getUserList';
import fetchMarkets from '@salesforce/apex/CreateJobWizardController.fetchMarkets';
import fetchRegion from '@salesforce/apex/CreateJobWizardController.fetchRegion';
import fetchMasterJob from '@salesforce/apex/CreateJobWizardController.fetchMasterJob';
import fetchCampaign from '@salesforce/apex/CreateJobWizardController.fetchCampaign';

import saveJob from '@salesforce/apex/CreateJobWizardController.saveJob';

export default class CreateNewPrintJob extends NavigationMixin(LightningElement) {
    @track userOptions1=[];//to fetch users
    @track userOptions2=[];//to fetch users
    @track userOptions3=[];//to fetch users
    @track userOptions4=[];//to fetch users
    @track userOptions5=[];//to fetch users
    @track userOptions6=[];//to fetch users
    @track userOptions7=[];//to fetch users
    @track userOptions8=[];//to fetch users
    @track userOptions9=[];//to fetch users
    @track userOptions10=[];//to fetch users
    @track userOptions11=[];//to fetch users
    @track marketOptions=[];//to fetch market
    @track regionOptions=[];//to fetch regions

    @track masterJobOptions=[];//to fetch MasterJob
    @track campaignOptions=[];//to fetch Campaign Options
   
    selectedCommission = false;
    selectedNewLEDSignage = false;
    selectedNewPrintAd = false;
    selectedPrintRevise = false;
    selectedNewPOS = false;
    selectedNewspaper = false;
    selectedNewOutdoor = false;
    selectedBriefRequired = false;


    selectedUserTypePickList;
    selectedUserTypePickList1;
    selectedUserTypePickList2;
    selectedUserTypePickList3;
    selectedUserTypePickList4;
    selectedUserTypePickList5;
    selectedUserTypePickList6;
    selectedUserTypePickList7;
    selectedUserTypePickList8;
    selectedUserTypePickList9;
    selectedUserTypePickList10;
    selectedUserTypePickList11;
    UsersPickList1 = [];
    UsersPickList2 = [];
    UsersPickList3 = [];
    UsersPickList4 = [];
    UsersPickList5 = [];
    UsersPickList6 = [];
    UsersPickList7 = [];
    UsersPickList8 = [];
    UsersPickList9 = [];
    UsersPickList10 = [];
    UsersPickList11 = [];

    value = 'User';
    get UserTypePickList1() {
        return [
            { label: 'User', value: 'User' },
            { label: 'Partner User', value: 'Partner User' },
            { label: 'Customer Portal User', value: 'Customer Portal User' }
        ];
    }
    get UserTypePickList2() {
        return [
            { label: 'User', value: 'User' },
            { label: 'Partner User', value: 'Partner User' },
            { label: 'Customer Portal User', value: 'Customer Portal User' }
        ];
    }
    get UserTypePickList3() {
        return [
            { label: 'User', value: 'User' },
            { label: 'Partner User', value: 'Partner User' },
            { label: 'Customer Portal User', value: 'Customer Portal User' }
        ];
    }
    get UserTypePickList4() {
        return [
            { label: 'User', value: 'User' },
            { label: 'Partner User', value: 'Partner User' },
            { label: 'Customer Portal User', value: 'Customer Portal User' }
        ];
    }
    get UserTypePickList5() {
        return [
            { label: 'User', value: 'User' },
            { label: 'Partner User', value: 'Partner User' },
            { label: 'Customer Portal User', value: 'Customer Portal User' }
        ];
    }
    get UserTypePickList6() {
        return [
            { label: 'User', value: 'User' },
            { label: 'Partner User', value: 'Partner User' },
            { label: 'Customer Portal User', value: 'Customer Portal User' }
        ];
    }
    get UserTypePickList7() {
        return [
            { label: 'User', value: 'User' },
            { label: 'Partner User', value: 'Partner User' },
            { label: 'Customer Portal User', value: 'Customer Portal User' }
        ];
    }
    get UserTypePickList8() {
        return [
            { label: 'User', value: 'User' },
            { label: 'Partner User', value: 'Partner User' },
            { label: 'Customer Portal User', value: 'Customer Portal User' }
        ];
    }
    get UserTypePickList9() {
        return [
            { label: 'User', value: 'User' },
            { label: 'Partner User', value: 'Partner User' },
            { label: 'Customer Portal User', value: 'Customer Portal User' }
        ];
    }
    get UserTypePickList10() {
        return [
            { label: 'User', value: 'User' },
            { label: 'Partner User', value: 'Partner User' },
            { label: 'Customer Portal User', value: 'Customer Portal User' }
        ];
    }
    get UserTypePickList11() {
        return [
            { label: 'User', value: 'User' },
            { label: 'Partner User', value: 'Partner User' },
            { label: 'Customer Portal User', value: 'Customer Portal User' }
        ];
    }
    //To Fetch Job Type
    @wire(getPicklistValues,{
        recordTypeId: '012800000003WkAAAU',
        fieldApiName: fetchSpecificType
    })specificTypeValues;
    //To Fetch Creative coordinator Picklist
    @wire(getPicklistValues,{
        recordTypeId: '012000000000000AAA',
        fieldApiName: fetchCreativeCoordinator
    })CreativeCoordinatorValues;
   //To Fetch POA Picklist
    @wire(getPicklistValues,{
        recordTypeId: '012000000000000AAA',
        fieldApiName: fetchPOA
    })POATYPEValues;
    //To Fetch Status Picklist
    @wire(getPicklistValues,{
        recordTypeId: '012000000000000AAA',
        fieldApiName: fetchStatus
    })StatusValues;
    //To Fetch Color Picklist
    @wire(getPicklistValues,{
        recordTypeId: '012000000000000AAA',
        fieldApiName: fetchColor
    })ColorValues;
    //To Fetch Market Picklist
    @wire(fetchMarkets)
    wiredMarkets({ error, data }) {
        if (data) {
            console.log('data.length'+data.length);
            for(var i=0; i<data.length; i++)  {
                this.marketOptions = [...this.marketOptions ,{value: data[i].Id , label: data[i].Name} ];                                   
            } 
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.marketOptions = undefined;
        }
    }
    //To Fetch Region Picklist
    @wire(fetchRegion)
    wiredRegion({ error, data }) {
        if (data) {
            console.log('data.length'+data.length);
            for(var i=0; i<data.length; i++)  {
                this.regionOptions = [...this.regionOptions ,{value: data[i].Id , label: data[i].Name} ];                                   
            } 
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.regionOptions = undefined;
        }
    }
    //To Fetch Master Job Picklist
    @wire(fetchMasterJob)
    wiredMasterJob({ error, data }) {
        if (data) {
            console.log('data.length'+data.length);
            for(var i=0; i<data.length; i++)  {
                this.masterJobOptions = [...this.masterJobOptions ,{value: data[i].Id , label: data[i].Name} ];                                   
            } 
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.masterJobOptions = undefined;
        }
    }
    //To Fetch Campaign Picklist
    @wire(fetchCampaign)
    wiredCampaign({ error, data }) {
        if (data) {
            console.log('data.length'+data.length);
            for(var i=0; i<data.length; i++)  {
                this.campaignOptions = [...this.campaignOptions ,{value: data[i].Id , label: data[i].Name} ];                                   
            } 
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.campaignOptions = undefined;
        }
    }
    handleChange(event) {
        const field = event.target.name;

        if (field === 'FieldRUserType') {
            this.selectedUserTypePickList   = event.detail.value;
        }
        else if (field === 'OppsRUserType') {
            this.selectedUserTypePickList  = event.detail.value;
        }
        else if (field === 'ProducerUserType') {
            this.selectedUserTypePickList  = event.detail.value;
        }
        else if (field === 'ArtDirectorUserType') {
            this.selectedUserTypePickList  = event.detail.value;
        }
        else if (field === 'CopywriterUserType') {
            this.selectedUserTypePickList  = event.detail.value;
        }
        else if (field === 'ProductionUserType') {
            this.selectedUserTypePickList  = event.detail.value;
        }
        else if (field === 'CreativeDirectorUserType') {
            this.selectedUserTypePickList  = event.detail.value;
        }
        else if (field === 'Co-CreativeDirectorUserType') {
            this.selectedUserTypePickList  = event.detail.value;
        }
        else if (field === 'iMediaCoordinatorUserType') {
            this.selectedUserTypePickList  = event.detail.value;
        }
        else if (field === 'MediaLeadUserType') {
            this.selectedUserTypePickList  = event.detail.value;
        }
        else if (field === 'iMediaLeadUserType') {
            this.selectedUserTypePickList  = event.detail.value;
        }
        else if (field === 'Budget') {
            this.selectedBudget  = event.detail.value;
        }
        else if (field === 'Actual') {
            this.selectedActual  = event.detail.value;
        }
        else if (field === 'Commission') {
            this.selectedCommission = event.target.checked;
        }
        else if (field === 'NewLEDSignage') {
            this.selectedNewLEDSignage = event.target.checked;
        }
        else if (field === 'NewPrintAd') {
            this.selectedNewPrintAd  = event.target.checked;
        }
        else if (field === 'PrintRevise') {
            this.selectedPrintRevise = event.target.checked;
        }
        else if (field === 'NewPOS') {
            this.selectedNewPOS = event.target.checked;
        }
        else if (field === 'Newspaper') {
            this.selectedNewspaper = event.target.checked;
        }
        else if (field === 'NewOutdoor') {
            this.selectedNewOutdoor = event.target.checked;
        }
        else if (field === 'BriefRequired') {
            this.selectedBriefRequired = event.target.checked;
        }

        if (this.selectedUserTypePickList != null ){
            let optionsUsers = [];
            getUserList({
                typeOfUser : this.selectedUserTypePickList
            })
            .then(result => {
                //this.accounts = result;
                for (let i = 0 ; i < result.length ; i++)
                    {
                        console.log(result[i]);
                        optionsUsers.push({ label: result[i].Name, value: result[i].Id});
                    }
                    

                    if (field === 'FieldRUserType') {
                        this.UsersPickList1  = optionsUsers;
                    }
                    else if (field === 'OppsRUserType') {
                        this.UsersPickList2 = optionsUsers;
                    }
                    else if (field === 'ProducerUserType') {
                        this.UsersPickList3 = optionsUsers;
                    }
                    else if (field === 'ArtDirectorUserType') {
                        this.UsersPickList4 = optionsUsers;
                    }
                    else if (field === 'CopywriterUserType') {
                        this.UsersPickList5 = optionsUsers;
                    }
                    else if (field === 'ProductionUserType') {
                        this.UsersPickList6 = optionsUsers;
                    }
                    else if (field === 'CreativeDirectorUserType') {
                        this.UsersPickList7 = optionsUsers;
                    }
                    else if (field === 'Co-CreativeDirectorUserType') {
                        this.UsersPickList8 = optionsUsers;
                    }
                    else if (field === 'iMediaCoordinatorUserType') {
                        this.UsersPickList9 = optionsUsers;
                    }
                    else if (field === 'MediaLeadUserType') {
                        this.UsersPickList10 = optionsUsers;
                    }
                    else if (field === 'iMediaLeadUserType') {
                        this.UsersPickList11 = optionsUsers;
                    }

                    //this.baseObjectFieldOptions = optionsUsers1;
            })
            .catch(error => {
                this.error = error;
            });
        }   
    }
    // Save Function
    async saveNewPrintJob(){
        
        const inputFields = this.template.querySelectorAll('lightning-input');
        const allValid1 = this.checkFieldsValidity(inputFields);
/*
        const inputFields2 = this.template.querySelectorAll('lightning-input-rich-text');
        const allValid2 = this.checkFieldsValidity(inputFields2);

        const inputFields3 = this.template.querySelectorAll('lightning-textarea');
        const allValid3 = this.checkFieldsValidity(inputFields3);
*/
        const comboboxInputFields = this.template.querySelectorAll('lightning-combobox');
        const all_Compobox_Valid = this.checkFieldsValidity(comboboxInputFields);
       
        if(allValid1 && all_Compobox_Valid){
            this.isLoading = true;

            const jobRecordInfo = this.createJobRecord();

            saveJob({ newJob: jobRecordInfo }).then(accountId => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Job created, the Id is ' + accountId,
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
            
            this.isLoading = false;
        }

        // Validation
        let specifictypeClsCmp = this.template.querySelector(".specifictypeCls");
        let marketCmp = this.template.querySelector(".marketCls");
        let regionCmp = this.template.querySelector(".regionCls");
        let poaCmp = this.template.querySelector(".poaCls");
        let liveCmp = this.template.querySelector(".liveCls");

        if (!specifictypeClsCmp.value) {
            specifictypeClsCmp.setCustomValidity("Specific Type value is required");
        } else {
            specifictypeClsCmp.setCustomValidity(""); // clear previous value
        }
        specifictypeClsCmp.reportValidity();

        if (!marketCmp.value) {
            marketCmp.setCustomValidity("Market value is required");
        } else {
            marketCmp.setCustomValidity(""); // clear previous value
        }
        marketCmp.reportValidity();

        if (!regionCmp.value) {
            regionCmp.setCustomValidity("Region value is required");
        } else {
            regionCmp.setCustomValidity(""); // clear previous value
        }
        regionCmp.reportValidity();

        if (!poaCmp.value) {
            poaCmp.setCustomValidity("POA Type value is required");
        } else {
            poaCmp.setCustomValidity(""); // clear previous value
        }
        poaCmp.reportValidity();

        if (!liveCmp.value) {
            liveCmp.setCustomValidity("Live Date value is required");
        } else {
            liveCmp.setCustomValidity(""); // clear previous value
        }
        liveCmp.reportValidity();
    }

    checkFieldsValidity(fields){
        const allValid = [...fields].reduce((validSoFar, field) => {
            return validSoFar && field.reportValidity();
        }, true);

        return allValid;
    }

    createJobRecord() {
        const jobRecord = {};

        //  1 - Get current form input fields
        //     Loop the input list and get every input value and assign it to the desired field
        //     The field name is set on every input dataset as the attribute "field"
        let inputs = this.template.querySelectorAll('lightning-input');
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

        //Set field values for checkbox fields
        jobRecord.Commission__c  = this.selectedCommission;
        jobRecord.New_LED_Signage__c = this.selectedNewLEDSignage;
        jobRecord.New_Print_Ad__c = this.selectedNewPrintAd;
        jobRecord.Print_Revise__c = this.selectedPrintRevise;
        jobRecord.New_POS__c = this.selectedNewPOS;
        jobRecord.Newspaper__c = this.selectedNewspaper;
        jobRecord.New_Outdoor__c = this.selectedNewOutdoor;
        jobRecord.Brief_Required__c = this.selectedBriefRequired

        //NEW - PRINT RT 
        jobRecord.RecordTypeId ='012800000003WkAAAU';

        return jobRecord;
    }

    /**
     * Validates the form, checking for lightning-input errors and
     * controlling that wizard should advance to the next step
     * 
     */
     validate() {
        // 1 - Takes all the inputs from the step - "this" is bind to wizard-step component
        const allValid = [...this.querySelectorAll('lightning-input')]
            .reduce((validSoFar, inputCmp) => {
                inputCmp.setCustomValidity('');
                inputCmp.reportValidity();
                return validSoFar && inputCmp.checkValidity();
            }, true);

        // 2 - Calls an Apex Validation method to validate the Account Name.
        // If the method throws an exception, shows the message on the Input
        // Stops the wizard by returninng false.
        
        if(allValid) {
            
            /*let accountNameInput = this.querySelector('lightning-input[data-field-name="Name"]');

            if(accountNameInput) {
                try {
                     validateName({ accountName: accountNameInput.value });
                } catch(error) {
                    accountNameInput.setCustomValidity(error.body.message);
                    accountNameInput.reportValidity();

                    return false;
                }
            }*/

        }
        

        return allValid;
    }

     // Navigation to lightning component
     cancel() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Job__c',
                actionName: 'list'
            },
            state: {
                filterName: 'Recent'
            },
        });
        /* 
        var compDefinition = {
            componentDef: "c:createJobQA",
            attributes: {
                propertyValue: "500"
            }
        };
        // Base64 encode the compDefinition JS object
        var encodedCompDef = btoa(JSON.stringify(compDefinition));
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/one/one.app#' + encodedCompDef
            }
        });
        */
    }
}