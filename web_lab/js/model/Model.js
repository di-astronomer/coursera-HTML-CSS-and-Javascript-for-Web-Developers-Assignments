
export default class Model {
    constructor(){
        this.persons = [];
    }

    addPerson(lastName, numbers){
        let id = (this.persons.length == 0 ? 1: this.persons[this.persons.length - 1].id + 1);
        let newPerson = {"id": id, "lastName": lastName, "numbers":numbers};
        this.persons.push(newPerson);
    }

    delPerson(id){
        const personIndex = this.persons.findIndex((person) => parseInt(person.id) === parseInt(id));
        this.persons.splice(personIndex, 1);
        this.rewriteId();
    }

    rewriteId(){
        for(let i = 0; i < this.persons.length; i++){
            this.persons[i].id = i + 1;
        }
    }

    editPersonName(id, newName){
        const personIndex = this.persons.findIndex((person) => parseInt(person.id) === parseInt(id));
        this.persons[personIndex].lastName = newName;
    }

    editNamber(id, numberId, newNumber){
        const personIndex = this.persons.findIndex((person) => parseInt(person.id) === parseInt(id));
        this.persons[personIndex].numbers[numberId] = newNumber;
    }

    sortPerson(){
        this.persons.sort(function (a, b) {
            if (a.lastName > b.lastName) {
              return 1;
            }
            if (a.lastName < b.lastName) {
              return -1;
            }
            return 0;
          });
    }
}