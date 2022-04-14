// Sub Classes

// ES5
function PersonES5(firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
}

PersonES5.prototype.sayHi = function(){
    return `Hello I'm ${this.firstName} ${this.lastName}`; 
}

function CustomerES5(firstName, lastName, phone, username){
    PersonES5.call(this,firstName,lastName);
    this.phone = phone;
    this.username = username;
}

CustomerES5.prototype = Object.create(PersonES5.prototype);

var customer1 = new CustomerES5("Sena", "Turan", "1234567", "SenaTuran");

console.log(customer1.sayHi());
console.log(customer1);

// ES6

class PersonES6{
    constructor(firstName, lastName){
        this.firstName = firstName;
        this.lastName = lastName;
    }

    sayHi(){
        return `Hello I'm ${this.firstName} ${this.lastName}`; 
    }
}

class CustomerES6 extends PersonES6{
    constructor(firstName, lastName, phone, username){
        super(firstName, lastName);
        this.phone = phone;
        this.username = username;
    }

    static getTotal(){
        return 1000;
    }
}

let customer2 = new CustomerES6("Volkan", "Yükselen", "134567", "VolkanYukselen");

console.log(customer2.sayHi());
console.log(customer2);
console.log(CustomerES6.getTotal());