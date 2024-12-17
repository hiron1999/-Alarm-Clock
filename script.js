// Get DOM elements
const clock = document.getElementById("clock");
const alarmForm = document.getElementById("alarm-form");
const alarmsList = document.getElementById("alarms-list");
const heading = document.getElementById("heading");
// current date
let Now = new Date();


const dayName = Now.toUTCString().substring(0,15);
heading.textContent=dayName;
// Alarms array to store the set alarms
let alarms = [];
  //start animation
  document.querySelectorAll(".page").forEach(page => {
    page.style.animationPlayState = "running";
  });
//convert time format 
function formatTime(current){
  const hours = (current.getHours() % 12 || 12).toString().padStart(2, '0'); // Convert to 12-hour format
  const minutes = current.getMinutes().toString().padStart(2, '0');
  const seconds = current.getSeconds().toString().padStart(2, '0');
  const ampm = current.getHours() >= 12 ? "PM" : "AM";
  const currentTime = `${hours}:${minutes}:${seconds} ${ampm}`;
  return currentTime;
}
// Update clock face every second
function updateClock() {
  const Now = new Date();
  const Next = new Date(Now.getTime()+1000);
  const currentTime=formatTime(Now);
  const FutureTime=formatTime(Next);

  // clock.textContent =currentTime;
  //Set current page
  const [hh,mm,rem] = currentTime.toString().split(":");
  const [ ss,ap]=rem.split(" ");
  document.getElementById("hh").textContent=hh;
  document.getElementById("mm").textContent=mm;
  document.getElementById("ss").textContent=ss;
  document.getElementById("ap").textContent=ap;


  //Set next page 
  const [Nhh,Nmm,Nrem] = FutureTime.toString().split(":");
  const [ Nss,Nap]=Nrem.split(" ");
  document.getElementById("n-hh").textContent=Nhh;
  document.getElementById("n-mm").textContent=Nmm;
  document.getElementById("n-ss").textContent=Nss;
  document.getElementById("n-ap").textContent=Nap;

 
  // console.log(ss);
  // console.log(Now);
  // alert(`Alarm ringing! Time: ${currentTime}`);
  if (alarms.includes(Now.toString())) {
    console.log("alert");
    alert(`Alarm ringing! Time: ${currentTime}`);
    alarms = alarms.filter(alarm => alarm !== currentTime); // Remove the alarm after alerting
    renderAlarms();
  }
}
setInterval(updateClock, 1000);

// Handle alarm submission
alarmForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const hours = document.getElementById("hours").value.padStart(2, '0');
  const minutes = document.getElementById("minutes").value.padStart(2, '0');
  const seconds = document.getElementById("seconds").value.padStart(2, '0');
  const ampm = document.getElementById("ampm").value;

  const alarmTime = `${Now.toDateString()} ${hours}:${minutes}:${seconds} ${ampm}`;
  const dateObj = new Date(alarmTime);
  console.log(dateObj);
  if (!alarms.includes(dateObj.toString())) {
    alarms.push(dateObj.toString());
    renderAlarms();
  } else {
    alert("Alarm already set for this time!");
  }
  alarmForm.reset();
});

// Render alarms list
function renderAlarms() {
  alarmsList.innerHTML = "";
  alarms.forEach((alarm, index) => {
    const alarmItem = document.createElement("div");
    alarmItem.className = "alarm-item";

    const alarmText = document.createElement("span");
    alarmText.textContent = formatTime(new Date(alarm));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Remove";
    deleteButton.classList.add("btn","btn-outline-danger")

    deleteButton.addEventListener("click", () => {
      alarms.splice(index, 1);
      renderAlarms();
    });

    alarmItem.appendChild(alarmText);
    alarmItem.appendChild(deleteButton);
    alarmsList.appendChild(alarmItem);
  });
}

const theme_mode = ["dark", "light"];
function toggleTheame(){
  const domElement =document.documentElement;
  const currentTheame = domElement.getAttribute("data-bs-theme");
  if(currentTheame === theme_mode[0]) domElement.setAttribute("data-bs-theme",theme_mode[1]);
  else domElement.setAttribute("data-bs-theme",theme_mode[0]);
}