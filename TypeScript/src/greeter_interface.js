function greeter_interface(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user2 = { firstName: "Jane", lastName: "User" };
document.body.innerHTML = greeter_interface(user2);
