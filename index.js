const selectMenu = document.querySelectorAll("select"),
currentTime = document.querySelector("h3"),
button = document.querySelector("button"),
content = document.querySelector(".content");

let alramTime,
ringing = new Audio("ringtone.mp3");

let isAlarmSet = false;

for(let i = 1; i <= 12; i++){
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i = 0; i <= 59; i++){
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i = 0; i < 2; i++){
    let ampm = i == 0 ? "AM" : "PM";
    console.log(ampm)
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
    let dateObj = new Date(),
    h = dateObj.getHours(),
    m = dateObj.getMinutes(),
    s = dateObj.getSeconds(),
    ampm = "AM";
    if(h >= 12){
        h = h - 12;
        ampm = "PM";
    }
    h = h == 0 ? h = 12 : h;
    h = h < 10 ? "0" + h : h;
    s = s < 10 ? "0" + s : s;
    m = m < 10 ? "0" + m : m;

    currentTime.innerHTML = `${h} : ${m} : ${s} ${ampm}`;   

    if(alramTime == `${h} : ${m} ${ampm}`){
        console.log("alarm ringing");
        ringing.play();
    }
}, 1000);

function setAlarm(){
    if(isAlarmSet){
        alramTime = "";
        ringing.pause();
        button.innerText = "set alarm";
        content.classList.remove("disable");
        return isAlarmSet = false;
    }
    let time = `${selectMenu[0].value} : ${selectMenu[1].value} ${selectMenu[2].value}`;
    alramTime = time;
    console.log(time);
    if(time.includes("hour") || time.includes("minute") || time.includes("AM/PM")){
        return alert("please, select a valid time to set Alarm!");
    }
    isAlarmSet = true;
    content.classList.add("disable");
    button.innerText = "clear alarm";
}

button.addEventListener("click", setAlarm);