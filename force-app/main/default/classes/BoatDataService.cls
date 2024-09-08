public with sharing class BoatDataService {

    @AuraEnabled(cacheable=true)
    public static List<BoatType__c> getBoatTypes(){ 
        return [Select Name from BoatType__c];  
    }

    @AuraEnabled(cacheable=true)
    public static List<Boat__c> getBoat(String boatTypeId){
        try{
            if(String.isEmpty(boatTypeId)){
                return [Select Name, Picture__c, Length__c, BoatType__c, Description__c, Contact__c, Geolocation__c, Price__c from Boat__c];
            }
            else {
                return [Select Name, Picture__c, Length__c, BoatType__c, Description__c, Contact__c, Geolocation__c, Price__c from Boat__c where BoatType__c =:boatTypeId];
            }
        }
        catch(Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Boat__c> getBoats(){
        try{
            return [Select Name, Picture__c, Length__c, BoatType__c, Description__c, Contact__c, Geolocation__c, Price__c from Boat__c];
        }
        catch(Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }

    @AuraEnabled
    public static void updateBoatList(List<Boat__c> boats){
        try{
            update boats;
        }
        catch(Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }

    private static Date getStartingDate(Date startDate){
        Date dT=startDate;
        DateTime dTime=DateTime.newInstance(dT.year(), dT.month(), dT.day());
        String dayString= dTime.format('EEE');
        System.debug(dayString);
    }
}