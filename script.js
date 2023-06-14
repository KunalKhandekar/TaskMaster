const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// For getting Current Date 
let d = new Date()
let date = d.getDate()
let month = months[d.getMonth()]
let year = d.getFullYear()
let currentDate = `${date} ${month} ${year}`

let todoContainer = document.querySelector(".list-cont");

// Load All Data From local Storage 
function reload() {
    for (let i = 0; i < localStorage.length; i++) {

        // set iteration key name
        let key = localStorage.key(i);

        // use key name to retrieve the corresponding value
        let mixValue_date = localStorage.getItem(key);

        // splitting Value And Date From String 
        let Value_date = mixValue_date.split("+")

        // Indexing Value 
        let value = Value_date[0]

        // Indexing Date 
        let date = Value_date[1]

        // creating a ToDo box from key and value 
        let ihtml = `
        <div class="box">
        <h2 id="title">${key}</h2>
        <hr>
        <div class="desc">
            <p>${value}</p>
        </div>
        <hr>
        <div class="bottom">
            <span>${date}</span>
            <img class="menu" src="images/menu.png" alt="menu">
        </div>
        <div id="opt">
            <p class="remove" onclick="remove('${key}')">Delete</p>
            <div class="cancel close">
                <img src="images/mini-close.png" alt="close">
            </div>
        </div>
</div>`;

        todoContainer.innerHTML = todoContainer.innerHTML + ihtml;
    }

}

// For Adding a Task 
function addtask(x, y) {

    // popup
    let id = x;
    let description = y;

    // checking user's input 
    if (id != null && id.length != 0 && description != null && description.length != 0) {
        // Mixing Value and Date 
        description = `${description}+${currentDate}`;

        // Setting Key and Value 
        localStorage.setItem(id, description);

        let value1 = localStorage.getItem(id);

        // splitting Value And Date From String 
        let Value_date = value1.split("+")

        // Indexing Value 
        let value = Value_date[0]

        // Indexing Date 
        let date = Value_date[1]

        let ihtml = ` <div class="box">
                <h2 id="title">${id}</h2>
                <hr>
                <div class="desc">
                    <p>${value}</p>
                </div>
                <hr>
                <div class="bottom">
                    <span>${date}</span>
                    <img class="menu" src="images/menu.png" alt="menu">
                </div>
                <div id="opt">
                    <p class="remove" onclick="remove('${id}')">Delete</p>
                    <div class="cancel close">
                        <img src="images/mini-close.png" alt="close">
                    </div>
                </div>
    </div>`;

        // adding created box to DOM 
        todoContainer.innerHTML = todoContainer.innerHTML + ihtml;

        location.reload()
    } else {
        alert("Invalid input") // Popup
    }
};

// Getting PopUp Box And Blur Background in Variable 
let popup = document.querySelector(".ask-popup");
let blurCont = document.querySelector(".blurContainer")

// Displaying PopUp Box And Blur Background
function confirmation() {
    blurCont.style.display = 'block';
    popup.style.display = 'block';
}

// Taking User input and passing it to delete function 
function showResult(choice) {
    deleteAll(choice);
}

// Function for deleting all Task 
function deleteAll(choice) {
    console.log(choice)
    if (choice) {
        localStorage.clear();
        location.reload()
    } else if (choice == false) {
        popup.style.display = 'none';
        blurCont.style.display = 'none';
    }
}

// reloads All task from LocalStorage 
reload();

// getting all meun icon 
let menu = document.getElementsByClassName("menu");

// Iterating All menu icon for event listening  
for (let i = 0; i < menu.length; i++) {
    menu[i].addEventListener("click", function () {
        let opt_box = this.closest(".box").querySelector("#opt");
        opt_box.classList.add("show");
    });
}

// getting all close icon 
let close = document.getElementsByClassName("close");

// Iterating All close icon for event listening 
for (let i = 0; i < close.length; i++) {
    close[i].addEventListener("click", function () {
        let opt_box = this.closest(".box").querySelector("#opt");
        opt_box.classList.remove("show");
    });
}

// for Deleting a specific task
function remove(key) {
    localStorage.removeItem(key);
    location.reload();
}

// form Popup Starts 
let addpopup = document.querySelector(".form-container");
let closepopup = document.querySelector(".close")
closepopup.addEventListener("click", () => {
    addpopup.style.display = "none";
})
let submit = document.querySelector(".submit-btn");
let formb = document.querySelector(".section");

function formpop() {
    formb.style.display = "block";
    addpopup.style.display = "block";
    formhandle();
}

function submit_close() {
    addpopup.style.display = "none";
    formb.style.display = "none";
}

function formhandle() {
    let form = document.getElementById("form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let title = document.getElementById("task-title").value;
        let message = document.getElementById("message").value;
        addtask(title, message);
        formb.style.display = "none";
        addpopup.style.display = "none";
        form.reset();
    })
}
// form Popup Ends