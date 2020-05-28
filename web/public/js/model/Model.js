export default class Model {
  constructor() {
    this.persons = [];
  }

  async addPerson(lastName, numbers) {
    let id =
      this.persons.length == 0
        ? 1
        : this.persons[this.persons.length - 1].id + 1;
    let newPerson = { id: id, lastName: lastName, numbers: numbers };
    this.persons.push(newPerson);
    this.persons = await fetch(`http://localhost:3000/user/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    }).then((res) => res.json());
  }

  async delPerson(id) {
    const personIndex = this.persons.findIndex(
      (person) => parseInt(person.id) === parseInt(id)
    );
    this.persons = await fetch(
      `http://localhost:3000/user/delete?personIndex=${personIndex}`
    ).then((res) => res.json());
    this.rewriteId();
  }
  async init() {
    this.persons = await fetch(`http://localhost:3000/user`).then((res) =>
      res.json()
    );
  }
  rewriteId() {
    for (let i = 0; i < this.persons.length; i++) {
      this.persons[i].id = i + 1;
    }
  }

  async editPersonName(id, newName) {
    const personIndex = this.persons.findIndex(
      (person) => parseInt(person.id) === parseInt(id)
    );
    this.persons = await fetch(
      `http://localhost:3000/user/edit?personIndex=${personIndex}&newName=${newName}`
    ).then((res) => res.json());
  }

  async editNamber(id, numberId, newNumber) {
    const personIndex = this.persons.findIndex(
      (person) => parseInt(person.id) === parseInt(id)
    );
    this.persons = await fetch(
      `http://localhost:3000/user/editn?personIndex=${personIndex}&newNumber=${newNumber}&numberId=${numberId}`
    ).then((res) => res.json());
  }

  async sortPerson() {
    this.persons = await fetch(`http://localhost:3000/user/sort`).then((res) =>
      res.json()
    );
  }
}
