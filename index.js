// These are simple playground going back to basics of JavaScript
// Check the js-fullstack-path project/repo for the application or continuation of the roadmap

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
Inbuilt Constructor: Date Constructor, Error Constructor
Numeric Separators and BigInt

Use the above advance foundations when building real world projects using Vanilla JavaScript. You can also use them in your React projects as well.
ref: https://www.youtube.com/watch?v=LzMnsfqjzkA&t=88697s
at: 15:14:00
*/

 // Ternary Operator
 const age = 18
 const canDrive = age < 18 ? 'No, too young to drive' : age >= 70 ? 'No, too old to drive' :  'Yes, can drive'
 console.log(canDrive) // Output: Yes, can drive

// switch statement
const day = 'Monday'

switch (day) {
    case 'Monday':
        console.log('Start of the week')
        break
    case 'Friday':
        console.log('End of the week')
        break
    default:
        console.log('Midweek day')
}   // Output: Start of the week

// Object Destructuring and Currency Formatting
const employees = {
    employee: 'Adonis',
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

// Event Loop (at 15:41:41 in the video)
/*
JS Runtime Environment:
Heap & Call Stack

Asynchronous APIs:
WebAPI: setTimeout, setInterval, Fetching data across the network, Promises, DOM manipulation, Data requests, Event Listeners, etc.
Task Queue: Callbacks from WebAPI are queued here
Event Loop: Continuously checks if Call Stack is empty and moves tasks from Task Queue to Call Stack
*/

const start = performance.now();    // Get the starting timestamp

// code you want to measure
for (let i = 0; i < 1000000; i++) {
    let answer = i * 2000000 / 67.8 * (45.7 / 3.2)
}

setTimeout(() => {
    // Get the ending timestamp after the asynchronous operation completes
    const end = performance.now();
    console.log(`Execution time: ${end - start} ms`); // e.g. Time taken: 2002.34 ms
}, 4000);   // A minimum of 4000 ms depending on what's in the task queue and call stack; as there is setTimeout with 4000 ms on the above code the execution maybe delayed a little bit more

// Scope and Hoisting
/*
Scope (what variables are accessible where):
Global Scope: Accessible everywhere
Function Scope: Accessible within the function
Block Scope: Accessible within the block (if, for, while)  

Hoisting (variable and function declarations are moved to the top of their containing scope during compilation phase before code execution ):
var: Hoisted and initialized with undefined
let and const: Hoisted but not initialized (Temporal Dead Zone)
Functions: Fully hoisted (can be called before declaration)
*/

// Import/Export (at 15:50:52)
/*
Check this in the js-fullstack-path project/repo
This needs module script depending on browser
It also needs to run with a local server (e.g. Live Server, Vite or Node.js) because of CORS policy when using import/export in the browser
*/

// Inbuilt Constructor(at 15:57:00)
// Date Constructor
const now = new Date();
console.log(now); // Output: Current date and time
console.log(now.toString()); // Output: Current date and time in human-readable format.
console.log(now.toISOString()); // Output: Current date and time in ISO format (e.g. 2024-06-01T12:00:00.000Z)
console.log(now.getFullYear()); // Output: Current year (e.g. 2024)

// Error Constructor
function checkUsername(username) {
    if (username) {
        console.log(username);
    } else {
        throw new Error('Username is required!');
    }
}

checkUsername('Alice'); // Output: Alice
//checkUsername(''); // Throws an error: "Username is required!"
// checkUsername('') was commented out coz it prevents the rest of the code from running due to the thrown error, but you can uncomment it to see how the Error Constructor works in action.
// Constructor for common data types
/*
Sting()
Number()
Array()
Object()
Boolean()
*/

const person = new Object();  // Object constructor syntax, which is more verbose and less commonly used or not advisable for creating simple objects
//const person = {};  // Object literal syntax, which is more concise and commonly used
person.name = "Tom";
person.age = 30;
console.log(person); // Output: { name: 'Alice', age: 30 }
console.log(person.name); // Output: Alice

// Numeric Separators and BigInt
// BigInt is useful for database IDs or large integer values that exceed the safe integer limit of JavaScript (Number.MAX_SAFE_INTEGER, which is 9007199254740991) such as cryptography
// With BigInt, calculations are not preferable and throws an error if you try to mix BigInt with regular numbers without explicit conversion, so it is best used for storing and handling large integer values rather than performing arithmetic operations with them.
const largeNumber = 1_000_000_000_000_000;
const bigNumber = 1_000_000_000_000_000_000n;
// const bigNumber = BigInt(1_000_000_000_000_000_000); // Alternative way to create a BigInt using the BigInt constructor

console.log(typeof largeNumber); // Output: number
console.log(typeof bigNumber); // Output: bigint
console.log(largeNumber); // Output: 1000000000000000
console.log(bigNumber); // Output: 1000000000000000000n

// ADVANCE FOUNDATIONS APPLICATIONS
// Use of Date(), Math(), Object Destructuring, setInterval, 
function getStockData() {
    return {
        name: 'QtechAI',
        sym: 'QTA',
        price: (Math.random() * 3).toFixed(2),    // return a random number between 0 and 3 to the decimal places
        time: new Date().toLocaleTimeString('en-US'),    // return a timestamp in this format: hh/mm/ss
    }
}

let previousPrice = null;

function updateStockData() {
    const stockData = getStockData();
    // Without destructuring
    /*
    document.getElementById('stock-name').textContent = stockData.name;
    document.getElementById('stock-symbol').textContent = stockData.sym;
    document.getElementById('stock-price').textContent = stockData.price;
    document.getElementById('stock-time').textContent = stockData.time;
    */
    // With destructuring
    const { name, sym, price, time } = stockData;

    const symbolDirection = price > previousPrice ? '🔺' : price < previousPrice ? '🔻' : '⏸️';
    document.getElementById('stock-direction').textContent = symbolDirection;

    document.getElementById('stock-name').textContent = name;
    document.getElementById('stock-symbol').textContent = sym;
    document.getElementById('stock-price').textContent = price;
    document.getElementById('stock-time').textContent = time;

    previousPrice = price;
}

updateStockData(); // Initial call to display stock data immediately
setInterval(updateStockData, 1500); // Update stock data every 5 seconds

// The above block is cleaner and simpler if nothing pass and no additional logic
/*
setInterval(function() {
    const stockData = getStockData();
    updateStockData();
}, 1500); // Update stock data every 5 seconds using an anonymous function instead of arrow function, both are fine and it is a matter of preference and readability in this case
*/

// FUNCTIONS AND PARAMETERS
/*
Functions Expressions and Arrow Functions
Default Parameters
Rest Parameters
*/

// Arrow Function
/*
const getSpendAlert = function(amount) {
    return `Warning! You have spent $${amount}`;
}

Arrow Function with block body which is usable with multiple parameters and logic
const getSpendAlert = (amount) => {
    return `Warning! You have spent $${amount}`;
}
*/

// Shortest and cleanest arrow function with only one parameter
const getSpendAlert = amount => `Warning! You have spent $${amount}`;
console.log(getSpendAlert(100)); // Output: Warning! You have spent $100

// Inline Arrow Function
const distanceTraveledMiles = [267, 345, 234, 190, 200];
const distanceTraveledKm = distanceTraveledMiles.map(miles => (miles * 1.60934).toFixed(2));
console.log(distanceTraveledKm); // Output: ['429.17', '555.86', '376.94', '305.75', '321.87']

// Default Parameters
function greet(name = 'Guest') {
    return `Hello, ${name}!`;
}

console.log(greet()); // Output: Hello, Guest!

// Rest Parameters: Catching the rest of the arguments
function setPermissionLevel(level, name1, name2, name3) {
    console.log(`${name1} has ${level} level access`);
    console.log(`${name2} has ${level} level access`);
    console.log(`${name3} has ${level} level access`);
}

setPermissionLevel('User', 'Alice', 'Jane', 'Mary');
// Output:
// Alice has User level access
// Jane has User level access
// Mary has User level access

// Caveat: The above function is not scalable if you have more than 3 names and error when you passed less than 3 names, where rest parameters will be useful
/*
setPermissionLevel('User', 'Alice', 'Jane', 'Mary', 'Sara'); // Sara will be ignored
setPermissionLevel('User', 'Alice'); // Error: name2 and name3 are undefined
*/

// Rest Parameters to the Rescue
function setRestPermission(level, ...names) {
    names.forEach(name => {
        console.log(`${name} has ${level} level access`);
    });
}
setRestPermission('Admin', 'Andy', 'Bob', 'Charlie', 'John'); // Output: Andy has Admin level access, Bob has Admin level access, Charlie has Admin level access, John has Admin level access
setRestPermission('Admin', 'Andy'); // Output: Andy has Admin level access

// Callback Functions
function notifyUser(notificationFn) {
    notificationFn()
}

const sendEmailNotification = () => console.log('Email notification sent!');
const sendSMSNotification = () => console.log('SMS notification sent!');

notifyUser(sendEmailNotification); // Output: Email notification sent!
notifyUser(sendSMSNotification); // Output: SMS notification sent!

// ASYNCHRONOUS JAVASCRIPT AND APIs

// Researched comparison on the Fetch, Ajax and jQuery that I handled that turns to be an evolution of asynchronous JS handling and realtime data fetching
/*
Asynchronous Functions Evolution (from classic to modern):
Ajax - jQuery - Fetch

Fetch Evolution:
.then and .catch - Async/Await
*/

// Thenable/Callback vs Asynchronous Functions
// @ 18:26:57
// Base URL and Endpoints
/*
// Base URL
https://apis.scrimba.com/dog.ceo/api

// Endpoints
/breeds/list/all
/breeds/image/random
*/

// fetch().then() syntax - Thenable/Callback Approach
fetch('https://apis.scrimba.com/dog.ceo/api/breeds/image/random')
    .then(response => response.json())  // response converted to a JavaScript object to be usable in the our app with JSON method
    // Then is a method which will pick up what we get back from fetch and make it available to us in a parameter in a callback function
    // or make it availablein the next .then() as the parameter of the callback
    //.then(data => console.log(data))  // Output: { message: 'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg', status: 'success' }
    .then(data => {
        const imgElement = document.createElement('img');
        imgElement.src = data.message;
        imgElement.alt = 'Random Dog Image';
        document.body.appendChild(imgElement);
    })
    //.catch(error => console.error('Error fetching dog image:', error)); // catch is a method which will catch any error that occurs during the fetch
    .catch(err => {
        console.log(err);

    })
    .finally(() => {    // useful when it needs to run some code after the fetch is completed regardless of the outcome, whether it is successful or it throws an error
        console.log('Fetch operation completed');
    });

// Async/Await syntax - Asynchronous Functions
async function fetchRandomDogImage() {
    try {
        //const response = fetch('https://apis.scrimba.com/dog.ceo/api/breeds/image/random'); // Output: Promise {}
        // Promise: Pending, Resolved/Fulfilled, Rejected
        const response = await fetch('https://apis.scrimba.com/dog.ceo/api/breeds/image/random');

        //console.log(response.ok); // Output: true
        if (!response.ok) { // checks the success of the http response status, which might not throw an error but still indicates a failure
            throw new Error(`HTTP error! status: ${response.status}`);
        }        
        const data = await response.json();

        //console.log(data); // Output: { message: 'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg', status: 'success' }
        const imgElement = document.createElement('img');
        imgElement.src = data.message;
        imgElement.alt = 'Random Dog Image';
        document.body.appendChild(imgElement);
    } catch (error) {
        console.error('Error fetching dog image:', error);
    }
}
fetchRandomDogImage();

// Taking API to the Next Level (at 19:12:15)

// JSON Placeholder API: Free fake API for testing and prototyping
// Methods: GET, POST, PUT, DELETE, PATCH and OPTIONS
async function fetchPosts() {
    try {
        //const response = await fetch('https://apis.scrimba.com/jsonplaceholder/posts');   // GET is the default method for fetch, so it's ot necessary to specify it, but it is useful to specify the method when you need to use other methods such as POST, PUT, DELETE, PATCH and OPTIONS
        const response = await fetch('https://apis.scrimba.com/jsonplaceholder/posts',
            {
                method: 'POST',
                headers: {  // headers contains extra (meta) info about the request, authentication, type of data, etc. This is not an exhausted list!
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({  // need to stringify before sending off to convert to JSON string format, which is the standard format for sending data in APIs
                    title: 'Holiday Nightmares',
                    body: 'When I was kidnapped in Scotloand...',
                    userId: 100
                })
            });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
    } catch (err) {
        console.error('Error fetching JSON Placeholder data:', err);
    }
}
fetchPosts();

// The Promise Constructor: Building our Own Async Actions
const promise = new Promise((resolve, reject) => {
    const success = Math.random() > 0.5;
    if (success) {
        resolve('Operation successful!');
    } else {
        reject('Operation failed!');
    }
});

// cleaner way without try catch block
promise.then(response => console.log(response)).catch(error => console.error(error));

// Handling the promise using try/catch
/* error in my chrome browser console
try {
    const response = await promise;
    console.log(response);
} catch (err) {
    console.error(err);
}
*/

// Promise.all: Running Multiple Async Operations in Parallel
function uploadFile() {
    return new Promise((resolve, reject) => {
        console.log('Step 1: Uploading file...');
        setTimeout(() => {
            resolve();  // Call the next step after 1 second
        }, 1000);
    });
}

function processFile() {
    return new Promise((resolve, reject) => {
        console.log('Step 2: Processing file...');
        setTimeout(() => {
            resolve();  // Call the next step after 1 second
        }, 1000);
    });
}

function notifyUserX() {
    return new Promise((resolve, reject) => {
        console.log('Step 3: Notifying user...');
        setTimeout(() => {
            resolve();  // Call the next step after 1 second
        }, 1000);
    });
}

// Using try/catch with async/await
async function handleFileUpload() {
    try {
        await uploadFile();
        await processFile();
        await notifyUserX();
        console.log('All steps completed successfully!');
    } catch (err) {
        console.error('Error handling file upload:', err);
    }
}
handleFileUpload();

// You could also use
/*
uploadFile(() => {
    processFile(() => {
        notifyUserX(() => {
            console.log('All steps completed successfully!');
        });
    });
});
*/

// Promise.all
/*
Promise.all([
    uploadFile(),
    processFile(),
    notifyUserX()
]).then(() => {
    console.log('All steps completed successfully!');
}).catch((error) => {
    console.error('Error handling file upload:', error);
});
*/
