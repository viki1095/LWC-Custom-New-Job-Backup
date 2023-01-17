import { LightningElement,track,api,wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import fetchUsers from '@salesforce/apex/teamController.fetchUsers';
import getUserList from '@salesforce/apex/teamController.getUserList';
import updateJobRecord from '@salesforce/apex/teamController.updateJobRecord';

export default class Team extends LightningElement {
@api recordId;
@api open;
@api label;
objectApiName = 'Job__c';
@track showSection1 = false;
@track showSection2 = false;

@track userOptions1=[];
@track userOptions2=[];
@track userOptions3=[];
@track userOptions4=[];
@track userOptions5=[];
@track userOptions6=[];
@track userOptions7=[];
@track userOptions8=[];
@track userOptions9=[];
@track userOptions10=[];
@track userOptions11=[];
@track userOptions12=[];
@track userOptions13=[];
@track userOptions14=[];
@track userOptions15=[];
@track userOptions16=[];
@track userOptions17=[];

disabled = false;
@track error;

jobID;
jobAccount;
jobIO;

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
get UserTypePickList3() {
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

    //getting all objects records count based on selected user
    handleChange(event) {
        const field = event.target.name;
        if (field === 'AccountpUserType') {
            this.selectedUserTypePickList = event.detail.value;

        }
        else if (field === 'IOpUserType') {
            this.selectedUserTypePickList = event.detail.value;

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

                    if (field === 'AccountpUserType') {
                        this.UsersPickList1  = optionsUsers;
                    }
                    else if (field === 'IOUserType') {
                        this.UsersPickList2  = optionsUsers;
                    }
            })
            .catch(error => {
                this.error = error;
            });
        }   

    }

    AccountChange(event){
         this.jobAccount = event.target.value;
    }
    IOChange(event){
        this.jobIO = event.target.value;
   }
    updateJob(){

        updateJobRecord({jobID:this.recordId, jobAccount:this.jobAccount,jobIO:this.jobIO})
        .then(jobDetails => {
            console.log("jobDetails==>"+JSON.stringify(jobDetails))
        })
        .catch(error=>{
            console.log("Error==>"+JSON.stringify(error)) 
        })
    }
    
handleSubmit(event) {
console.log('onsubmit event recordEditForm'+ event.detail.fields);
}

handleSuccess(event) {
console.log('onsuccess event recordEditForm', event.detail.id);
    this.showSection1 = false;
    this.showSection2 = false;
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

handleCancel1(){
    this.showSection1 = false;   
    }

handleCancel2(){
     this.showSection2 = false;   
    }

SectionEnable1() {
    if(!this.showSection1) {
        this.showSection1 = true;
    }
 }

 SectionEnable2() {
    if(!this.showSection2) {
        this.showSection2 = true;
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