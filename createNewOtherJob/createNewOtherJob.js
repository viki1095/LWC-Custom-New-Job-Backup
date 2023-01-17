import { LightningElement ,wire,track} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import fetchUsers from '@salesforce/apex/CreateJobWizardController.fetchUsers';
import fetchMarkets from '@salesforce/apex/CreateJobWizardController.fetchMarkets';
import fetchRegion from '@salesforce/apex/CreateJobWizardController.fetchRegion';
import fetchTDA from '@salesforce/apex/CreateJobWizardController.fetchTDA';
import getUserList from '@salesforce/apex/CreateJobWizardController.getUserList';

import saveNewOtherJob from '@salesforce/apex/CreateJobWizardController.saveJob';



export default class CreateNewOtherJob extends NavigationMixin(LightningElement) {
    @track userOptions1=[];//to fetch users
    @track userOptions2=[];//to fetch users
    @track userOptions3=[];//to fetch users
    @track marketOptions=[];//to fetch market
    @track regionOptions=[]//to fetch regions
    @track TDAOptions=[]//to fetch TDA

    @track selectedTypeOther='';

    selectedUserTypePickList;
    UsersPickList1 = [];
    UsersPickList2 = [];
    UsersPickList3 = [];
    
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


    //getting all users in the org
    @wire(fetchUsers)
    wiredUsers({ error, data }) {
        if (data) {
            console.log('data.length'+data.length);
            for(var i=0; i<data.length; i++)  {
                this.userOptions1 = [...this.userOptions1 ,{value: data[i].Id , label: data[i].Name} ];                                   
            } 
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.userOptions1 = undefined;
        }
    }

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
    @wire(fetchTDA)
    wiredTDA({ error, data }) {
        if (data) {
            console.log('data.length'+data.length);
            for(var i=0; i<data.length; i++)  {
                this.TDAOptions = [...this.TDAOptions ,{value: data[i].Id , label: data[i].Name} ];                                   
            } 
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.TDAOptions = undefined;
        }
    }
    //getting all objects records count based on selected user
    handleChange(event) {
        const field = event.target.name;
         
        if (field === 'FieldRepUserType') {
            this.selectedUserTypePickList  = event.detail.value;
        }
        else if (field === 'OppsRepUserType') {
            this.selectedUserTypePickList  = event.detail.value;
        }
        else if (field === 'ProducerUserType') {
            this.selectedUserTypePickList  = event.detail.value;
        }
        else if (field === 'TypeOther') {
            this.selectedTypeOther= event.detail.value;
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
                    /*
                    this.UsersPickList1  = optionsUsers;
                    this.UsersPickList2 = optionsUsers;
                    this.UsersPickList3  = optionsUsers;
                    */

                    if (field === 'FieldRepUserType') {
                        this.UsersPickList1  = optionsUsers;
                    }
                    else if (field === 'OppsRepUserType') {
                        this.UsersPickList2 = optionsUsers;
                    }
                    else if (field === 'ProducerUserType') {
                        this.UsersPickList3 = optionsUsers;
                    }

                    //this.baseObjectFieldOptions = optionsUsers1;
            })
            .catch(error => {
                this.error = error;
            });
        }   

        //this.getallObjects(this.selectedUser);
    }
 

    
    async saveNewOtherJob(){
        
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

            saveNewOtherJob({ newJob: jobRecordInfo }).then(accountId => {
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

        //NEW - Interactive RT 
        jobRecord.RecordTypeId ='012800000003WkFAAU';
        jobRecord.Type__c = 'Other';

        return jobRecord;
    }


    async validate() {
        // 1 - Takes all the inputs from the step - "this" is bind to wizard-step component
        const allValid = [...this.querySelectorAll('lightning-input, lightning-combobox')]
            .reduce((validSoFar, inputCmp) => {
                inputCmp.setCustomValidity('');
                inputCmp.reportValidity();
                return validSoFar && inputCmp.checkValidity();
            }, true);

        
        // 2 - Calls an Apex Validation method to validate the Account Name.
        // If the method throws an exception, shows the message on the Input
        // Stops the wizard by returninng false.
        if(allValid) {
                /*

            let accountNameInput = this.querySelector('lightning-input[data-field-name="Name"]');

            if(accountNameInput) {
                try {
                    await validateName({ accountName: accountNameInput.value });
                } catch(error) {
                    accountNameInput.setCustomValidity(error.body.message);
                    accountNameInput.reportValidity();

                    return false;
                }
            }

            */

        }

        return allValid;
    }
}