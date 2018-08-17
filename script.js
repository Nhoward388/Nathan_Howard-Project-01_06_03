//Project 01_06_03
//Author: Nathan Howard
//Date: 8.15.18

"use strict";

var formValidity = true;

//function to move the focus to the next SSN box
function advanceSsn() {
    var ssnFields = document.getElementsByClassName("ssn");
    var currentField = document.activeElement;
    if (currentField.value.length === currentField.maxLength) {
        if (currentField === ssnFields[0]) {
            ssnFields[1].focus();
        }
        if (currentField === ssnFields[1]) {
            ssnFields[2].focus();
        }
        if (currentField === ssnFields[2]) {
            document.getElementById("submitBtn").focus();
        }
    }
}

//remove fallback placeholder text
function zeroPlaceholder() {
    var addressBox = document.getElementById("addrinput");
    addressBox.style.color = "black";
    if (addressBox.value === addressBox.placeholder) {
        addressBox.value = "";
    }
}

//restore placeholder text if box contains no user entry
function checkPlaceholder() {
    var addressBox = document.getElementById("addrinput");
    if (addressBox.value === "") {
        addressBox.style.color = "rgb(178, 184, 183)";
        addressBox.value = addressBox.placeholder;
    }
}

//add placeholder text for browsers that don't support placeholder
function generatePlaceholder() {
    if (!Modernizr.input.placeholder) {
        var addressBox = document.getElementById("addrinput");
        addressBox.value = addressBox.placeholder;
        addressBox.style.color = "rgb(178, 184, 183)"
        if (addressBox.addEventListener) {
            addressBox.addEventListener("focus", zeroPlaceholder, false);
            addressBox.addEventListener("blur", checkPlaceholder, false);
        }
        else if (addressBox.attachEvent) {
            addressBox.attachEvent("onfocus", zeroPlaceholder);
            addressBox.attachEvent("blur", zeroPlaceholder);
        }
    }
}

//function to validate required inputs
function validateRequired() {
    var inputs = document.querySelectorAll("#contactinfo input");
    var errorSpace = document.getElementById("errorText");
    var fieldSetValidity = true;
    try {
        for (var i = 0; i < inputs.length; i++) {
            var currentElement = inputs[i];
            if (currentElement.value === "") {
                currentElement.style.background = "rgb(255, 233, 233)";
                fieldSetValidity = false;
            } 
            else {
                currentElement.style.background = "white";
                errorSpace.style.display = "none";
            }
        }
        if (fieldSetValidity === false) {
            throw "Please complete the required fields."
        }
        else {
            formValidity = true;
        }
    }
    catch (msg) {
        errorSpace.style.display = "block";
        errorSpace.innerHTML = msg;
        formValidity = false;
    }
}

//function to validate form
function validateForm(evt) {
    validateRequired();
    if (evt.preventDefault) {
        evt.preventDefault();
    }
    else {
        evt.returnValue = false;
    }
    var form = document.querySelectorAll("form")[0];
    if (formValidity === true) {
          form.submit();  
    } 
    else {
    }
}

//function to set up page
function setUpPage() {
    createEventListeners();
    generatePlaceholder();
}

//function to load in eventlisteners
function createEventListeners() {
    var ssnFields = document.getElementsByClassName("ssn");
    for (var i = 0; i < ssnFields.length; i++) {
        if (ssnFields[i].addEventListener) {
            ssnFields[i].addEventListener("input", advanceSsn, false);
        }
        else if (ssnFields[i].attachEvent) {
            ssnFields[i].attachEvent("oninput", advanceSsn);
        }
    }
    if (window.addEventListener) {
    window.addEventListener("submit", validateForm, false);
    } else if (window.attachEvent) {
    window.attachEvent("onsubmit", validateForm);
}
}

if (window.addEventListener) {
    window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", setUpPage);
}