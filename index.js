// PROFILE SHAPE SWITCHER
const shapes = {
    slanted: "polygon(20% 0%, 40% 0%, 100% 0%, 80% 100%, 0% 100%)",
    square: "inset(0 0 0 0)",
    circle: "circle(50% at 50% 50%)"
};

function setShape(type) {
    // For the image shape
    document.documentElement.style.setProperty('--shape', shapes[type]);

    // Determine border-radius for inputs/buttons
    let radius = 5; // default slanted
    if (type === 'square') radius = 10;
    else if (type === 'circle') radius = 20;

    // Apply border-radius dynamically
    const inputs = document.querySelectorAll("input, button");
    inputs.forEach(el => {
        el.style.borderRadius = radius + "px";
    });

     // Apply border-radius to the profile wrapper
    const profileWrapper = document.querySelector(".profile-wrapper");
    profileWrapper.style.borderRadius = radius + "px";

    // Apply border-radius to the photo directly
    const profilePic = document.querySelector(".profile-pic");

    if (type === 'slanted') {
        // Keep polygon clip-path for slanted
        profilePic.style.clipPath = shapes.slanted;
        profilePic.style.borderRadius = "5px";
        document.documentElement.style.setProperty('--radius', radius + "px");
    } else if (type === 'square') {
        profilePic.style.clipPath = "none"; // remove clip-path
        profilePic.style.borderRadius = radius + "px";
        document.documentElement.style.setProperty('--radius', radius + "px");
    } else if (type === 'circle') {
        profilePic.style.clipPath = "none"; // remove clip-path
        profilePic.style.borderRadius = "50%"; // full circle
        document.documentElement.style.setProperty('--radius', radius + "px");
    }

}

// SAVE LEADS CHROME EXTENSION
/*
You can deploy the app below as chrome extension

Chrome Extension Deployment:
chrome://extensions/

ref: https://www.youtube.com/watch?v=LzMnsfqjzkA&t=39188s
at: 12:05:00
*/

let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl =document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    renderLeads()
}

tabBtn.addEventListener("click", function() {
    // chrome.tabs.query ONLY works inside extension context, not regular browser page
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        renderLeads(myLeads)
    })
})

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    renderLeads()
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    renderLeads()
})

function renderLeads() {
    let listItems = ""
    for (let i = 0; i < myLeads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${myLeads[i]}'>${myLeads[i]}</a>
            </li>
        `
    }

    ulEl.innerHTML = listItems
}

/*
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    renderLeads()
})

function saveInput() {
    // this is not performant but it is usefull when you want to preserve the element even after browser refresh even without the localStorage function
    for (let i = 0; i < myLeads.length; i++) {
        listItems += "<li>" + myLeads[i] + "</li>"
    }

    // Another way is to use the createElement
    const li = document.createElement("li")
    li.textContent = myLeads[i]
    ulEl.append(li)
}
*/

// ADVANCE FOUNDATIONS
/*
Ternary Operator
Switch Statement
Object Destructuring
setTimeout and setInterval
Event Loop
Scope
Hoisting
Import/Export
Date Constructor
Error Constructor
Pre-increment and Post-increment
bigint
Numeric Separators

Use the above advance foundations when building real world projects using Vanilla JavaScript. You can also use them in your React projects as well.
ref: https://www.youtube.com/watch?v=LzMnsfqjzkA&t=88697s
at: 15:14:00
*/

 // Ternary Operator
 const age = 18
 const canDrive = age < 18 ? "No, too young to drive" : age >= 70 ? "No, too old to drive" :  "Yes, can drive"
 console.log(canDrive) // Output: Yes, can drive

// switch statement
const day = "Monday"

switch (day) {
    case "Monday":
        console.log("Start of the week")
        break
    case "Friday":
        console.log("End of the week")
        break
    default:
        console.log("Midweek day")
}   // Output: Start of the week

// Object Destructuring and Currency Formatting
const employees = {
    employee: "Alice",
    salary: 3000,
    position: "Software Engineer",
}

const { employee, salary, position } = employees;
const formattedSalary = salary.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
console.log(`${employee} is a ${position} earning ${formattedSalary}`); // Output: Alice is a Software Engineer earning $3,000.00
// if salary is not formatted to US currency, use $${salary} instead of ${formattedSalary} in the console.log statement because the formattedSalary automatically adds the $ sign and formats the number with commas and decimal points according to US currency standards.

// setTimeout with Param
function displayTrafficLight(light) {
    console.log(light);
}

displayTrafficLight('🔴'); // Output: 🔴

setTimeout(displayTrafficLight, 2000, '🟡'); // Output after 2 seconds: 🟡
setTimeout(displayTrafficLight, 4000, '🟢'); // Output after 4 seconds: 🟢
// you can also use setTimeout(() => displayTrafficLight('🟡'), 2000); but the simpler above is already fine without additional logic

// use arrow function when you need additional action
setTimeout(() => {
    displayTrafficLight('🔴');
    console.log('Red light - Stop!');
}, 6000);

// FUNCTIONS AND PARAMETERS

// ASYNCHRONOUS JAVASCRIPT AND APIs
/*
Asynchronous Functions Evolution (from classic to modern):
Ajax - jQuery - Fetch

Fetch Evolution:
.then and .catch - Async/Await
*/