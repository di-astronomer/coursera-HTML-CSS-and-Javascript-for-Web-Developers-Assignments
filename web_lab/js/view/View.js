
export default class View {
    constructor(){
        this.htmlTable = "";
    }

    sendMessage(message){
        alert(message);
    }

    getText(message){
        return prompt(message);
    }

    printPersons(persons){
        if(window.Worker){
            this.htmlTable = `<table id = "main_table"><tr><th>Прізвище користувача</th><th>Номери користувача</th></tr>`;
            let worker = new Worker("js/view/webWorker.js");
            let clone_persons = persons.slice(0);
            worker.postMessage({"persons": clone_persons});
                worker.onmessage = function(e){
                    this.htmlTable += e.data + "</table>";
                    worker.terminate();
                    worker = undefined;
                    document.getElementById("main_table").innerHTML = this.htmlTable;
                }.bind(this);
        }else {
            document.getElementById("main_table").innerHTML = "<tr><td>Скачайте нормальний браузер, динозавре</td></tr>";
        }
    }

    clean_all_inputs(){
        document.getElementById('input_lastName').value = "";
        document.getElementById('input_numbers').value = "";
    }
}