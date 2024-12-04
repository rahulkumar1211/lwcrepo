public with sharing class dataController {
    
    public static List<Account> getAccounts(){
        return [Select FirstName, LastName, Phone, Email from Account LIMIT 10];
    }
}