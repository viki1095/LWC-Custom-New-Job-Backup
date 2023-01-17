import { LightningElement,api,track,wire } from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';
import { getRecord,getFieldValue  } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import modal from "@salesforce/resourceUrl/CustomStyle";
import { loadStyle } from "lightning/platformResourceLoader";
import { NavigationMixin } from 'lightning/navigation';


export default class createJobQA extends NavigationMixin(LightningElement) {


    connectedCallback() {
        loadStyle(this, modal);
      }

    @track showNewPrintJobComponent = false;
    @track showNewTVJobComponent = false;
    @track showNewRadioComponent = false;
    @track showNewBillingComponent = false;

    @track showNewBannerJobComponent = false;
    @track showNewEmailJobComponent = false;
    @track showNewKeywordJobComponent = false;
    @track showNewMicrositeJobComponent = false;

    @track showNewOtherJobComponent = false;
   

    @track initSection = false;
    @track selectedOption='';
    @track selectedOptionInteractive='';
    //@track selectedValueOther;
    @track bypassExecuting = true;

     //Default to false
     displayDetails = true;
     displayDetails2 = false;
     displayDetails3 = false;

     value = '';

     get options() {
        return [
            { label: 'New Interactive Job', value: 'New Interaction Job' },
            { label: 'New Print Job', value: 'New Print Job' },
            { label: 'New TV Job', value: 'New TV Job' },
            { label: 'New Radio Job', value: 'New Radio Job' },
            { label: 'New Billing Job', value: 'New Billing Job' }
        ];
    }

    get optionsInteractive() {
        return [
            { label: 'Banner', value: 'Banner' },
            { label: 'Email', value: 'Email'},
            { label: 'Keyword', value: 'Keyword' },
            { label: 'Microsite', value: 'Microsite' },
            { label: 'Other', value: 'Other' }
        ];
    }

    closeAction(){
        this.dispatchEvent(new CloseActionScreenEvent());
    }

    handleRadioChangeJobType(event) {
        this.selectedOption = event.detail.value;
    }

    handleRadioChangeInteractive(event) {
        this.selectedOptionInteractive = event.detail.value;
    }

    Step1Submit() {
        if (this.selectedOption == "New Interaction Job")
            this.handleClick2();
        else if (this.selectedOption == "New Print Job" || this.selectedOption == "New TV Job" || this.selectedOption == "New Print Job" || 
            this.selectedOption == "New Radio Job" || this.selectedOption == "New Billing Job")
            {
                this.handleClick3();
            }

    }

    Step2Submit() { 
        /*if (this.selectedOptionInteractive == "Other")
            this.handleClick5();
        else*/ 
        if (this.selectedOptionInteractive == "Other" || this.selectedOptionInteractive == "Banner" || this.selectedOptionInteractive == "Email" || this.selectedOptionInteractive == "Keyword" || 
        this.selectedOptionInteractive == "Microsite")
        {
            this.handleClick3();
        }
    }

    Step3Submit() { 
        this.handleClick3();            
    }

     handleClick() {
         this.initSection = false;
         this.displayDetails = true;
         this.displayDetails2 = false ;
         this.displayDetails3 = false;
     }

     handleClick2() {
        this.displayDetails = false;
        this.displayDetails2 = true;
        this.displayDetails3 = false ;
    }
    handleClick3() {
        //alert(this.selectedOption);
        this.displayDetails =false;
        this.displayDetails2 =false;
        this.displayDetails3 =false;
        //this.showWizardComponent = true;

        if (this.selectedOption == 'New Print Job')
            this.showNewPrintJobComponent = true;
        else if (this.selectedOption == 'New TV Job')
            this.showNewTVJobComponent = true;
        else if (this.selectedOption == 'New Radio Job')
            this.showNewRadioComponent = true;
        else if (this.selectedOption == 'New Billing Job')
            this.showNewBillingComponent = true;
        else if (this.selectedOption == 'New Interaction Job')
        {
            if (this.selectedOptionInteractive == 'Banner')
            {
                this.showNewBannerJobComponent = true;

                this.showNewEmailJobComponent = false;
                this.showNewKeywordJobComponent = false;
                this.showNewMicrositeJobComponent = false;
                this.showNewOtherJobComponent = false;

            }
            else if (this.selectedOptionInteractive == 'Email')
            {
                this.showNewEmailJobComponent = true;

                this.showNewBannerJobComponent = false;
                this.showNewKeywordJobComponent = false;
                this.showNewMicrositeJobComponent = false;
                this.showNewOtherJobComponent = false;
            }
            else if (this.selectedOptionInteractive == 'Keyword')
            {
                this.showNewKeywordJobComponent = true;

                this.showNewBannerJobComponent = false;
                this.showNewEmailJobComponent = false;
                this.showNewMicrositeJobComponent = false;
                this.showNewOtherJobComponent = false;
            }
            else if (this.selectedOptionInteractive == 'Microsite')
            {
                this.showNewMicrositeJobComponent = true;

                this.showNewBannerJobComponent = false;
                this.showNewEmailJobComponent = false;
                this.showNewKeywordJobComponent = false;
                this.showNewOtherJobComponent = false;
            }
                else if (this.selectedOptionInteractive == 'Other')
            {
                this.showNewOtherJobComponent  = true;

                this.showNewBannerJobComponent = false;
                this.showNewEmailJobComponent = false;
                this.showNewKeywordJobComponent = false;
                this.showNewMicrositeJobComponent = false;
            }
        }

    } 
    handleClick4() {
        this.displayDetails2 =false;
        this.displayDetails3 = false;
    }
    handleClick5() {
        this.displayDetails =false;
        this.displayDetails2 =false;
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

    backStep3Action(){
        this.initSection = false;
        this.displayDetails = false;
        this.displayDetails2 = true;
        this.displayDetails3 = false;
    }
    
    removeRow(event) {
        if (this.itemList.length >= 2) {
            this.handleRowDeselect(event.target.accessKey);
            this.itemList = this.itemList.filter((element)=>{
                return element.id !== event.target.accessKey;
            });
        }
    }
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
    }
}