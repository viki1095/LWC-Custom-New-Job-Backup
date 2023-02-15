import { LightningElement } from 'lwc';


export default class CloneCampaign extends LightningElement {

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