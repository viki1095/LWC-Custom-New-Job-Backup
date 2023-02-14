import { LightningElement,track,api,wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import RECORDTYPE_FIELD from '@salesforce/schema/Job__c.RecordTypeId';
import TYPE_FIELD from '@salesforce/schema/Job__c.Type__c';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';
import fetchUsers from '@salesforce/apex/teamController.fetchUsers';
import getUserList from '@salesforce/apex/teamController.getUserList';

export default class PrintJobTest extends NavigationMixin(LightningElement) {

    displayDetails = true;
    displayDetails2 = false;

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
    UsersPickList12 = [];
    UsersPickList13 = [];
    UsersPickList14 = [];
    UsersPickList15 = [];
    UsersPickList16 = [];
    UsersPickList17 = [];

    @track userOptions = [];
    @api recordId;
    @api open;
    @api label;
    objectApiName = 'Job__c';
    @track PrintDetails = false;
    @track TVDetails = false;
    @track RadioDetails = false;
    @track MicrositeDetails = false;
    handleSubmit(event) {
        console.log('onsubmit event recordEditForm' + event.detail.fields);
    }
    handleSuccess(event) {
        console.log('onsuccess event recordEditForm', event.detail.id);
        const evt = new ShowToastEvent({
            title: "Success!",
            message: "The record has been successfully Cloned.",
            variant: "success",
        });
        this.dispatchEvent(evt);
    }
    handleError() {
        const evt = new ShowToastEvent({
            title: "Error!",
            message: "An error occurred while attempting to save the record.",
            variant: "error",
        });
        this.dispatchEvent(evt);
    }
    handleCancel() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: 'Job__c',
                actionName: 'view'
            }
        });
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

    Step1Submit(){
        this.handleClick2();
    }
    handleClick2() {
        this.displayDetails = false;
        this.displayDetails2 = true;
        this.displayDetails3 = false;
    }

    Step2Submit(){
        this.handleClick3();
    }
    handleClick3() {
        this.displayDetails = false;
        this.displayDetails2 = false;
        this.displayDetails3 = true;
    }

    backStep1Action(){
        this.initSection = true;
        this.displayDetails = false;
    }

    backStep2Action(){
        this.initSection = false;
        this.displayDetails = true;
        this.displayDetails2 = false;
    }

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
    get UserTypePickList12() {
        return [
            { label: 'User', value: 'User' },
            { label: 'Partner User', value: 'Partner User' },
            { label: 'Customer Portal User', value: 'Customer Portal User' }
        ];
    }
    get UserTypePickList13() {
        return [
            { label: 'User', value: 'User' },
            { label: 'Partner User', value: 'Partner User' },
            { label: 'Customer Portal User', value: 'Customer Portal User' }
        ];
    }
    get UserTypePickList14() {
        return [
            { label: 'User', value: 'User' },
            { label: 'Partner User', value: 'Partner User' },
            { label: 'Customer Portal User', value: 'Customer Portal User' }
        ];
    }
    get UserTypePickList15() {
        return [
            { label: 'User', value: 'User' },
            { label: 'Partner User', value: 'Partner User' },
            { label: 'Customer Portal User', value: 'Customer Portal User' }
        ];
    }
    get UserTypePickList16() {
        return [
            { label: 'User', value: 'User' },
            { label: 'Partner User', value: 'Partner User' },
            { label: 'Customer Portal User', value: 'Customer Portal User' }
        ];
    }
    get UserTypePickList17() {
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
            console.log('data.length' + data.length);
            for (var i = 0; i < data.length; i++) {
                this.userOptions = [...this.userOptions, { value: data[i].Id, label: data[i].Name }];
            }
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.userOptions = undefined;
        }
    }

    //getting all objects records count based on selected user
    handleChange(event) {
        const field = event.target.name;
        if (field === 'AccountUserType') {
            this.selectedUserTypePickList = event.detail.value;
        }
        else if (field === 'IOpUserType') {
            this.selectedUserTypePickList = event.detail.value;
        }
        else if (field === 'ECDUserType') {
            this.selectedUserTypePickList = event.detail.value;
        }
        else if (field === 'SupervisorUserType') {
            this.selectedUserTypePickList = event.detail.value;
        }
        else if (field === 'CDUserType') {
            this.selectedUserTypePickList = event.detail.value;
        }
        else if (field === 'COCDUserType') {
            this.selectedUserTypePickList = event.detail.value;
        }
        else if (field === 'AltADUserType') {
            this.selectedUserTypePickList = event.detail.value;
        }
        else if (field === 'CopyUserType') {
            this.selectedUserTypePickList = event.detail.value;
        }
        else if (field === 'ArtDirUserType') {
            this.selectedUserTypePickList = event.detail.value;
        }
        else if (field === 'DesignerUserType') {
            this.selectedUserTypePickList = event.detail.value;
        }
        else if (field === 'AltCopyUserType') {
            this.selectedUserTypePickList = event.detail.value;
        }
        else if (field === 'DigiProdUserType') {
            this.selectedUserTypePickList = event.detail.value;
        }
        else if (field === 'ProdUserType') {
            this.selectedUserTypePickList = event.detail.value;
        }
        else if (field === 'ProducnUserType') {
            this.selectedUserTypePickList = event.detail.value;
        }
        else if (field === 'FMLUserType') {
            this.selectedUserTypePickList = event.detail.value;
        }
        else if (field === 'ILType') {
            this.selectedUserTypePickList = event.detail.value;
        }
        else if (field === 'IMCType') {
            this.selectedUserTypePickList = event.detail.value;
        }

        if (this.selectedUserTypePickList != null) {
            let optionsUsers = [];
            getUserList({
                typeOfUser: this.selectedUserTypePickList
            })
                .then(result => {
                    //this.accounts = result;
                    for (let i = 0; i < result.length; i++) {
                        console.log(result[i]);
                        optionsUsers.push({ label: result[i].Name, value: result[i].Id });
                    }

                    if (field === 'AccountUserType') {
                        this.UsersPickList1 = optionsUsers;
                    }
                    else if (field === 'IOUserType') {
                        this.UsersPickList2 = optionsUsers;
                    }
                    else if (field === 'ECDUserType') {
                        this.UsersPickList3 = optionsUsers;
                    }
                    else if (field === 'SupervisorUserType') {
                        this.UsersPickList4 = optionsUsers;
                    }
                    else if (field === 'CDUserType') {
                        this.UsersPickList5 = optionsUsers;
                    }
                    else if (field === 'COCDUserType') {
                        this.UsersPickList6 = optionsUsers;
                    }
                    else if (field === 'AltADUserType') {
                        this.UsersPickList7 = optionsUsers;
                    }
                    else if (field === 'CopyUserType') {
                        this.UsersPickList8 = optionsUsers;
                    }
                    else if (field === 'ArtDirUserType') {
                        this.UsersPickList9 = optionsUsers;
                    }
                    else if (field === 'DesignerUserType') {
                        this.UsersPickList10 = optionsUsers;
                    }
                    else if (field === 'AltCopyUserType') {
                        this.UsersPickList11 = optionsUsers;
                    }
                    else if (field === 'DigiProdUserType') {
                        this.UsersPickList12 = optionsUsers;
                    }
                    else if (field === 'ProdUserType') {
                        this.UsersPickList13 = optionsUsers;
                    }
                    else if (field === 'ProducnUserType') {
                        this.UsersPickList14 = optionsUsers;
                    }
                    else if (field === 'FMLUserType') {
                        this.UsersPickList15 = optionsUsers;
                    }
                    else if (field === 'ILType') {
                        this.UsersPickList16 = optionsUsers;
                    }
                    else if (field === 'IMCType') {
                        this.UsersPickList17 = optionsUsers;
                    }
                })
                .catch(error => {
                    this.error = error;
                });
        }

    }

    AccountChange(event) {
        this.jobAccount = event.target.value;
    }
    IOChange(event) {
        this.jobIO = event.target.value;
    }
    ECDChange(event) {
        this.jobECD = event.target.value;
    }
    SUPChange(event) {
        this.jobSup = event.target.value;
    }
    CDChange(event) {
        this.jobCD = event.target.value;
    }
    COCDChange(event) {
        this.jobCOCD = event.target.value;
    }
    AltADChange(event) {
        this.jobAltAD = event.target.value;
    }
    CopyChange(event) {
        this.jobCopy = event.target.value;
    }
    ArtDirChange(event) {
        this.jobArtDir = event.target.value;
    }
    DesChange(event) {
        this.jobDes = event.target.value;
    }
    AltCopyChange(event) {
        this.jobAltCopy = event.target.value;
    }
    DigiProdChange(event) {
        this.jobDigiProd = event.target.value;
    }
    ProdChange(event) {
        this.jobProd = event.target.value;
    }
    ProducnChange(event) {
        this.jobProducn = event.target.value;
    }
    FMLChange(event) {
        this.jobFML = event.target.value;
    }
    ILChange(event) {
        this.jobIL = event.target.value;
    }
    IMCChange(event) {
        this.jobIMC = event.target.value;
    }

    

    
}