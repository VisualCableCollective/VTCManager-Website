export default class User {
    static ID = 0;
    static bank_balance = null;
    static company_data = [];
    static isOwnerOfCompany() { 
        let resp = this.ID === this.company_data["owner_id"];
        return resp;
    }
}