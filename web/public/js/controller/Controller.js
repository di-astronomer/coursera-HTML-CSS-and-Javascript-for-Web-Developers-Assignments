export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    document
      .querySelector("#add_person")
      .addEventListener("click", (e) => this.addPerson(e));
    document
      .querySelector("#sort_person")
      .addEventListener("click", (e) => this.sortPerson(e));
    document
      .querySelector("#main_table")
      .addEventListener("click", (e) => this.editPerson(e));
  }
  async init() {
    await this.model.init();
    this.view.printPersons(this.model.persons);
  }
  addPerson(event) {
    let lastName = document.querySelector("#input_lastName").value;
    if (lastName == "") {
      this.view.sendMessage("Прізвище не може бути пустим");
      return;
    }

    let numbers = document.querySelector("#input_numbers").value;
    numbers = numbers.split("\n");
    numbers = numbers.filter((number) => number.length > 0);
    if (numbers.lenght == 0) {
      this.view.sendMessage("Номери не можуть бути пустими");
      return;
    }
    this.model.addPerson(lastName, numbers);
    this.view.printPersons(this.model.persons);
    this.view.clean_all_inputs();
  }

  async sortPerson(e) {
    await this.model.sortPerson();
    this.view.printPersons(this.model.persons);
  }

  async editPerson(e) {
    e = e || window.event;
    let target = e.target || e.srcElement;

    if (target.id == "del_person") {
      let id = target.name;
      await this.model.delPerson(id);
      this.view.printPersons(this.model.persons);
    } else if (target.id == "edit_person") {
      let id = target.name;
      await this.model.editPersonName(
        id,
        this.view.getText("get new Last Name")
      );
      this.view.printPersons(this.model.persons);
    } else if ((target.id = "edit_number")) {
      await this.model.editNamber(
        target.name[0],
        parseInt(target.name[1]),
        this.view.getText("get new number")
      );
      this.view.printPersons(this.model.persons);
    } else {
      return;
    }
  }
}
