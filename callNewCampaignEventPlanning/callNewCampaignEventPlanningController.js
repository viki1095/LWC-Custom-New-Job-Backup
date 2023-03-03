({
    onclick : function (component, event, helper) {
    var homeEvent = $A.get("e.force:navigateToObjectHome");
    homeEvent.setParams({
        "scope": "CampaignEventPlanning__c"
    });
    homeEvent.fire();
}
})