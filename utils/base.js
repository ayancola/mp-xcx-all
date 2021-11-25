class Base {
    constructor() {
        "use strict";
        this.client_id = ""
    }
    setClientId(client_id){
        this.client_id = client_id;
    }
    checkClientId(){
        if (!this.client_id || this.client_id==""){return false;}
        return true;
    }
};

export {Base};
