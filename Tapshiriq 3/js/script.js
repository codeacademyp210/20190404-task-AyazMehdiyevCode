'use strict'
const inputManufacturer = document.querySelector("#manufactrer")
const inputModel = document.querySelector("#model")
const inputReleaseYear = document.querySelector("#releaseYear")
const ulElement = document.querySelector("#ulElement")
const letterPatt = /^[a-zA-Z]*$/;
const yearPatt = /[0-9]{4}/;
let carsArr = [];
function Car(manufacturer, model, release, id) {
    this.id = id;
    this.manufacturer = manufacturer;
    this.model = model;
    this.release = release;
};
//idCounter copy>paste 
let idCounter = (function () {
    let counter = 0;
    return function () {
        return counter += 1;
    }
})();
function checkValidation() {
    if (inputManufacturer.value == "" || inputModel.value == "" || inputReleaseYear.value == "") {
        alert("Please do not keep the input blank")
        return false
    };
    if (!letterPatt.test(inputManufacturer.value)) {
        alert("Manufacture input must be latters")
        return false
    };
    if (!yearPatt.test(inputReleaseYear.value)) {
        alert("Release year input must be numbers, like '2002'")
        return false
    };
    newCarFunction();
    empityInputs();
    let jsonCars = JSON.stringify(carsArr);
    localStorage.setItem("strogedArr", jsonCars);
    createLiItems();
    return false
}
function newCarFunction(){
    let newCar = new Car(inputManufacturer.value, inputModel.value, inputReleaseYear.value, idCounter());
    carsArr.push(newCar);   
}
function empityInputs(){
        inputManufacturer.value = "";
        inputModel.value = "";
        inputReleaseYear.value = "";
    }

function createLiItems(){
    let lStroge = localStorage.getItem("strogedArr");
    let strogeObject = JSON.parse(lStroge);
    let text = strogeObject[strogeObject.length-1].id + "." + strogeObject[strogeObject.length-1].manufacturer + " " +strogeObject[strogeObject.length-1].model +" - " + strogeObject[strogeObject.length-1].release;
    let liElemetn = document.createElement("li");
    let liText = document.createTextNode(text);
    liElemetn.classList.add("list-group-item", "d-flex", "justify-content-between")
    liElemetn.appendChild(liText);
    let iElement = document.createElement("i");
    iElement.classList.add("fas", "fa-trash-alt", "text-danger", "self-align-end") 
    iElement.addEventListener("click",RemoveLi)
    ulElement.appendChild(liElemetn);
    liElemetn.appendChild(iElement)

}

function RemoveLi(){
    let selectedIElement = this
    selectedIElement.parentNode.parentNode.removeChild(selectedIElement.parentNode)
}
let lStroge = localStorage.getItem("strogedArr");
let strogeObject = JSON.parse(lStroge);

if(localStorage !== undefined){

    for(let i = 0 ; i<strogeObject.length;i++){
        let text = strogeObject[i].id + "." + strogeObject[i].manufacturer + " " +strogeObject[i].model +" - " + strogeObject[i].release;
        let liElemetn = document.createElement("li");
        let liText = document.createTextNode(text);
        liElemetn.classList.add("list-group-item", "d-flex", "justify-content-between")
        liElemetn.appendChild(liText);
        let iElement = document.createElement("i");
        iElement.classList.add("fas", "fa-trash-alt", "text-danger", "self-align-end") 
        iElement.addEventListener("click",RemoveLi)
        ulElement.appendChild(liElemetn);
        liElemetn.appendChild(iElement)
    }
}