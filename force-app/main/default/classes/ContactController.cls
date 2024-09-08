public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(){
        try{
            return [Select FirstName, LastName, Email from Contact With SECURITY_ENFORCED];
        }
        catch(Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
        
    }
}