let rotationTimer =localStorage.getItem("bro")||0;
let NameEl;
let idEl;
let count = localStorage.getItem("cup") || "";
let rotationInterval;
let breakfast = localStorage.getItem("temp")||"false";
let ptID = localStorage.getItem("idPLZ")||"";
let ptName =localStorage.getItem("namePLZ")||"";
let timerDoneEl = document.getElementById("due0ID");
let sugarLvlStatus = localStorage.getItem("fr")||"";
let sugar0El = document.getElementById("sugar0");
let patient0MealEl = document.getElementById("patient0Meal");
if(sugarLvlStatus!=""){
    console.log("ye");
    if(sugarLvlStatus=="Normal"){
        sugar0El.innerHTML = '<span style="color: green;">Blood Sugar: In Normal Bounds</span>';
    }
    else if(sugarLvlStatus=="High"){
        sugar0El.innerHTML = '<span style="color: red;">Blood Sugar: High</span>';
    }
    else{
        sugar0El.innerHTML = '<span style="color: red;">Blood Sugar: Low</span>';
    }
    
}
setInterval(overallCheck,5000);
setInterval(checkTime,1000);
function checkTime(){
    rotationTimer++;
    localStorage.setItem("bro",rotationTimer);
    if(rotationTimer!=0){
        console.log(rotationTimer);
        if(rotationTimer>7200){
            timerDoneEl.innerHTML= ' <span style="color: red;">Due for Adjustment: Y</span>';
        }
        else{
            timerDoneEl.innerHTML= ' <span style="color: green;">Due for Adjustment: N</span>';
        }
    }
}

function overallCheck(){
    if( checkMealTime(0)==true ){
        patient0MealEl.innerHTML = ' <span style="color: red;">Due for Meal: Y</span>';
    }
    else{
        checkMealTime(1);
        checkMealTime(2);
    };

}


let infoPageEl = document.getElementById("3");
let HomePageEl = document.getElementById("2");
let heroVidEl = document.getElementById("heroVid");
let homeTextEL = document.getElementById("home");
let AddPageEl = document.getElementById("1");
let infoTextEl = document.getElementById("info");
let AddTextEl = document.getElementById("add");




if(ptName!=""){
    document.getElementById("patient0name").innerText = "Patient Name: "+ptName;
}
console.log(ptName);

if(ptID!=""){
    document.getElementById("patient0ID").innerText = "Patient ID: "+ptID;
}
 // Time since last rotation in seconds
 // Will hold the interval ID for the rotation timer
infoPageEl.addEventListener("click",function(){
    heroVidEl.classList.add("hidden");
    homeTextEL.classList.add("hidden");
    infoTextEl.classList.remove("hidden");
   
})

HomePageEl.addEventListener("click",function(){
    homeTextEL.classList.remove("hidden");
    heroVidEl.classList.remove("hidden");
    AddTextEl.classList.add("hidden");
})


function savePatientData(){
    window.location.href = "index.html";
}
let saveInfoPatientEl = document.getElementById("saveInfoPatient");


function savePatientData() {
    var patientName = ptName;
    var patientId = ptID;

    // If we have a currentPatientId, we're editing an existing patient
    var currentPatientId = localStorage.getItem('currentPatientId');

    // If there's no patientId entered, use the currentPatientId as the key
    if (!patientId && currentPatientId) {
        patientId = currentPatientId;
    }

    // If there's still no patientId, we can generate a new one
    // This is just a placeholder and should be replaced with your ID generation logic
    if (!patientId) {
        patientId = 'patient-' + Date.now();
    }

    // Construct the patient data object
    var patientData = {
        name: patientName,
        id: patientId,
        // Other data fields you might want to save
        //food?
        //bs?

        rotationHours: document.getElementById('rotation-hours').value,
        rotationMinutes: document.getElementById('rotation-minutes').value,
        breakfastSugar: document.getElementById('breakfast-sugar').value,
        // Add all other relevant data fields here
    };

    // Use the patient ID as the key for the localStorage entry
    localStorage.setItem(patientId, JSON.stringify(patientData));

    // Clear the currentPatientId after saving
    localStorage.removeItem('currentPatientId');

    // Dispatch an event that the patient data was updated
    window.dispatchEvent(new CustomEvent('patientDataUpdated', { detail: patientData }));

    // Redirect back to the patient dashboard page
    window.location.href = 'index.html';
}
function toggleMeal(meal) {
    const button = document.getElementById(meal + '-btn');
    breakfast=="true";
    localStorage.setItem("temp",breakfast);
    const urgentSpan = document.getElementById(meal + '-urgent');
    const mealFed = button.textContent === 'YES';

    if (mealFed) {
        button.textContent = 'NO';
        button.classList.remove('yes-fed');
        button.classList.add('no-fed');
        checkMealTime(meal); // Check if it's past mealtime and update urgent message
        
    } else {
        button.textContent = 'YES';
        button.classList.remove('no-fed');
        button.classList.add('yes-fed');
        urgentSpan.style.display = 'none'; // Hide urgent message
    }
}
function start(index){
    let str = "patient"+index+"name";
    let str1 = "patient"+index+"id"
    NameEl = document.getElementById(str);
    idEl = document.getElementById(str1);
    console.log(NameEl);
    console.log(NameEl.value);
    console.log(idEl.value);
    ptName = NameEl.value;
    localStorage.setItem("namePLZ",ptName);
    
    NameEl.innerText = "Patient Name: "+ptName;
    ptID = idEl.value;
    localStorage.setItem("idPLZ",ptID);
    startRotationCounter();
}

let globalHour;

function updateRotationCounter() {
    const rotationCounter = document.getElementById('rotation-counter');
    const rotationAlert = document.getElementById('rotation-alert');

    // Increment the rotation timer
    rotationTimer++;
    
    localStorage.setItem("bro",rotationTimer);
    // Calculate hours, minutes, and seconds
    let hours = Math.floor(rotationTimer / 3600);
    let minutes = Math.floor((rotationTimer % 3600) / 60);
    let seconds = rotationTimer % 60;

    // Add leading zeros if necessary
    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');

    // Update the counter display
   
    rotationCounter.textContent = `${hours}:${minutes}:${seconds}`;

    // If over 2 hours, update the display to show the urgent message
    if (rotationTimer >= 2 * 60 * 60) { // 2 hours in seconds
        rotationCounter.style.color = 'red';
        rotationAlert.style.display = 'block';
    } else {
        rotationCounter.style.color = 'black';
        rotationAlert.style.display = 'none';
    }
}

// Function to start the rotation counter
function startRotationCounter() {
    // Update the counter every second (1000 milliseconds)
    rotationInterval = setInterval(updateRotationCounter, 1000);
}

// Function to reset the rotation timer
function resetRotationTimer() {
    clearInterval(rotationInterval); // Stop the current timer

    // Get the values from the new input fields
    const hoursInput = document.getElementById('rotation-hours').value;
    const minutesInput = document.getElementById('rotation-minutes').value;
    
    // Convert hours and minutes to seconds and sum them up
    const hoursSinceLastRotation = parseFloat(hoursInput) || 0;
    const minutesSinceLastRotation = parseFloat(minutesInput) || 0;
    rotationTimer = (hoursSinceLastRotation * 3600) + (minutesSinceLastRotation * 60);

    updateRotationCounter(); // Update the display immediately
    startRotationCounter(); // Restart the rotation counter
}

function zeroRotationTimer() {
    clearInterval(rotationInterval); // Stop the current timer
    rotationTimer = 0; // Zero out the timer
    updateRotationCounter(); // Update the display immediately
    startRotationCounter(); // Restart the rotation counter
}
function toggleMeal(meal) {
    const button = document.getElementById(meal + '-btn');
    const urgentSpan = document.getElementById(meal + '-urgent');
    const mealFed = button.textContent === 'YES';

    if (mealFed) {
        button.textContent = 'NO';
        button.classList.remove('yes-fed');
        button.classList.add('no-fed');
        checkMealTime(meal); // Check if it's past mealtime and update urgent message
    } else {
        button.textContent = 'YES';
        button.classList.remove('no-fed');
        button.classList.add('yes-fed');
        urgentSpan.style.display = 'none'; // Hide urgent message
    }
}


function checkMealTime(meal) {
    const now = new Date();
    const hours = now.getHours();
    const urgentSpan = document.getElementById(meal + '-urgent');

    const mealTimes = [9,13,19];
    //console.log(mealTimes[meal]);
    if (hours >= mealTimes[meal] && count=="") {
        //urgentSpan.style.display = 'inline';
        patient0MealEl.innerHTML = ' <span style="color: red;">Due for Meal: Y</span>';
        console.log("Here");
        count="k";
        localStorage.setItem("cup",count);
        return true;

    }
    else{
        
            patient0MealEl.innerHTML = ' <span style="color: green;">Due for Meal: N</span>';
        
        
        return false;
    }
}

// Function to reset meal status at midnight
function resetMealsAtMidnight() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // At midnight, reset all meals to NO and hide urgent messages
    if (hours === 0 && minutes === 0) {
        ['breakfast', 'lunch', 'dinner'].forEach(meal => {
            const button = document.getElementById(meal + '-btn');
            const urgentSpan = document.getElementById(meal + '-urgent');

            button.textContent = 'NO';
            button.classList.remove('yes-fed');
            button.classList.add('no-fed');
            urgentSpan.style.display = 'none';
        });
    }
}

// Check meal times every minute


// Initial check on page load
document.addEventListener('DOMContentLoaded', function() {
    ['breakfast', 'lunch', 'dinner'].forEach(meal => {
        checkMealTime(meal);
    });
});


function checkBloodSugar(meal) {
    const sugarInput = document.getElementById(meal + '-sugar').value;
    const sugarMsg = document.getElementById(meal + '-sugar-msg');
    const sugarLevel = parseFloat(sugarInput);

    console.log('Checking blood sugar for:', meal, 'Level:', sugarLevel); // For debugging

    if (sugarLevel >= 70 && sugarLevel <= 100) {
        sugarMsg.textContent = 'Normal Sugar';
        sugarMsg.style.color = 'green';
        sugarMsg.style.display = 'inline'; // Ensure the message is shown
        sugarLvlStatus = "Normal"
       
        localStorage.setItem("fr",sugarLvlStatus);
    } else if (sugarLevel < 70) {
        sugarMsg.textContent = 'Low Sugar';
        sugarMsg.style.color = 'red';
        sugarMsg.style.display = 'inline'; // Ensure the message is shown
        sugarLvlStatus = "Low"
       
        localStorage.setItem("fr",sugarLvlStatus);
    } else if (sugarLevel > 100) {
        sugarMsg.textContent = 'High Sugar';
        sugarMsg.style.color = 'red';
        sugarMsg.style.display = 'inline'; // Ensure the message is shown
        sugarLvlStatus = "High"
        
        localStorage.setItem("fr",sugarLvlStatus);
    } else {
        sugarMsg.textContent = ''; // Clear message if input is not a number
        sugarMsg.style.display = 'none'; // Hide the message if it's not relevant
    }
}
