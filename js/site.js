//Alert variables
const alertMessage = document.getElementById("alert-message");
let alertMessageText = "<p><strong>Alert: </strong>Here is the medium length sentence long alert popup up purple bar.</p><i class='alert-clear fa fa-times'></i>";
const alertText = document.getElementsByClassName("alert-text");
const clearAlert = document.getElementsByClassName("alert-clear");
//chart variables
const trafficOverview = document.getElementById('TrafficOverview').getContext('2d');
const trafficOverviewTime = document.getElementsByClassName("traffic-time-context");
const trafficSummary = document.getElementById('TrafficSummary').getContext('2d');
const mobileUsers = document.getElementById('MobileUsers').getContext('2d');
//settings variables
const toggleContainer = document.getElementsByClassName('toggle-switch');
const toggleText = document.getElementsByClassName('toggle-text');
const toggleButton = document.getElementsByClassName('toggle-button');
//noitification variables
const liveNotification = document.querySelector('.liveNotification');
const notificationBell = document.querySelector('.bell');
const dropDown = document.querySelector('.dropdown-container');
const notificationClear = document.getElementsByClassName('notification-clear');
const dropDownHeader = document.querySelector(".dropdown-header");
//search variables
const search = document.getElementById("search");
const userName = document.getElementsByClassName("user-name");
const searchList = document.getElementById("searchList");
const listedUser = document.getElementsByClassName('listedUser');
//form variables
const formSubmit = document.getElementById("form");
const messageText = document.getElementById("message-text");

let count = -1;
let data = [ 0,500 ,1000, 1500, 1250, 1750, 2000, 1500, 2000, 2500, 2250];
let labels = ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'];

let notificationText = ["This is a new notification.",
                        "You have 6 unread messages.",
                        "You have 3 new followers.",
                        "Your password expires in 7 days."];

///////////////////////////////

//File performance
// var t0 = performance.now();
// var result = instantiatePage();
// var t1 = performance.now();
// console.log('Took', (t1 - t0).toFixed(4), 'milliseconds to generate:', result);

instantiatePage();

//Instantiate listeners, constructors
function instantiatePage(){
  document.addEventListener("DOMContentLoaded", () => {
    displayAlert(alertMessageText, 'general');
    addAlertListener();
    addTrafficTimeListener();
    toggleSwitch();
    addNotification(notificationText);
    notificationListener();
    globalClickListener();
    deleteNotification();
    globalKeyListener();
    formListener();
    setToggle();
    //create array from user elements
    let userArray = createArray(userName);
    addSearchListener(userArray);
  }); // end DOMContentLoaded
}
////////////////////////////////////////////////////////////////////
//global listener to click off notifications
function globalClickListener(){
  document.addEventListener("click", (e) => {
    if (dropDown.style.display === "block" &&
    !(e.target.className.includes("bell") ||
    e.target.parentElement.className.includes("dropdown-container") ||
    e.target.className.includes("notification-clear"))) {
      dropDown.style.display = "none";
      dropDown.style.transform = "translate(0, 0)";
    } // end if

    //remove search with click
    if(searchList.firstChild){
      clearSearch();
    }

  }); //end eventlistener
} //end function

function globalKeyListener(){
  search.addEventListener("keyup", (e) => {
    if(!search.value){
      count = -1;
    }
    //if user has typed and there are results
    if(search.value && searchList.children){
      search.style.textTransform = "capitalize";
      //up arrow key
        if(e.key === 'ArrowUp'){
          if(count === -1){
            count = -1;
          }
          else if(count === 0){
            count = 0;
          }
          else{
            count -= 1;
          }
          if(count > -1){
            listedUser[count].style.outline = '2px solid #4d4c72';
            if(listedUser[count].nextSibling){
              listedUser[count].nextSibling.style.outline = 'none';
            }
            if(listedUser[count].previousSibling){
              listedUser[count].previousSibling.style.outline = 'none';
            }
            search.value = listedUser[count].textContent;
          }
        }
        //down arrow key
        else if(e.key === 'ArrowDown'){
          if(count >= (listedUser.length - 1)){
            count = listedUser.length - 1;
          }
          else {
            count++;
          }
          listedUser[count].style.outline = '2px solid #4d4c72';
          if(listedUser[count].nextSibling){
            listedUser[count].nextSibling.style.outline = 'none';
          }
          if(listedUser[count].previousSibling){
            listedUser[count].previousSibling.style.outline = 'none';
          }
          search.value = listedUser[count].textContent;
        } //end else if

    } // if
  }); // end listener
}

////////////////////////////////////////////////////////////////////
//NOTIFICATIONS
//add eventlistener to delete Notifications
function deleteNotification(){
  for(let i = 0; i < notificationClear.length; i++){
    notificationClear[i].addEventListener("click", (e) => {
      let notification = e.target.parentElement;
      dropDown.removeChild(notification);
      sizeNotificationContainer();
      notificationHeader();
    });
  }
}

//add eventlistener to notification bell
function notificationListener() {
  notificationBell.addEventListener("click", () => {
    if(dropDown.style.display !== "block"){
      dropDown.style.display = "block";
      sizeNotificationContainer();
    }
  });
}

//figure notification container size
function sizeNotificationContainer(){
  let width;
  let translate;

  if(window.innerWidth < 400){
    dropDown.style.left = "5px";
    dropDown.style.transform = "translateY(40px)";
  } else if (window.innerWidth < 500){
    width = (dropDown.offsetWidth -  notificationBell.offsetWidth) / 2;
    translate = "translate(-" + width + "px, 40px)";
    dropDown.style.transform = translate;
    dropDown.style.transition = "transform .25s";
  } else {
    width = dropDown.offsetWidth -  notificationBell.offsetWidth;
    translate = "translate(-" + width + "px, 40px)";
    dropDown.style.transform = translate;
    dropDown.style.transition = "transform .25s";
  }
}

//adjust notificaiton header text
function notificationHeader(){
  let num = dropDown.children.length - 1;
  dropDownHeader.textContent = "You have " + num + " notifications";
  if(num > 0){
    liveNotification.style.opacity = "1";
  }
  if(num === 0){
    liveNotification.style.opacity = "0";
  }
}

//add notifications to dropdown
function addNotification(messages) {
  messages.forEach((message) => {
    let notification = document.createElement("div");
    notification.className = "dropdown-item";
    notification.innerHTML = message +
                            "<i class='notification-clear fa fa-times'></i>";
    dropDown.appendChild(notification);
    notificationHeader();
  });
}
///////////////////////////////////////////////////////////
//Alert Bar
//display purple alert bar
function displayAlert(text, type){
  let message = document.createElement("div");
  message.classList.add("alert-text");
  message.classList.add("alert-" + type);
  message.innerHTML = text;
  alertMessage.appendChild(message);
}


//add listener to remove alert bar
function addAlertListener(){
  for(let i = 0; i < clearAlert.length; i++){
    clearAlert[i].addEventListener("click", (event) => {
      let node = event.target;
      let fullMessage = node.parentElement;
      alertMessage.removeChild(fullMessage);
    });
  }
}
//////////////////////////////////////////////////////
//Traffic Overview
// function constructTrafficOverview(data, labels){
  let trafficChart = new Chart(trafficOverview, {
      type: 'line',
      data: {
          labels: labels,
          datasets: [{
              label: 'Traffic',
              data: data,
              borderWidth: 1,
              lineTension: 0,
              backgroundColor: 'rgba(183,185,233,.5)',
              borderColor:'rgba(183,185,233,1)',
              pointRadius: 5,
              pointBackgroundColor: 'white',
              pointBorderColor: "#7478bf",
              pointBorderWidth: 2,
              spanGaps: true,
          }],

      },
      options: {
        animation: {
          easing: 'linear'
        },
        responsive:true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              padding: 25,
            },
            gridLines: {
              tickMarkLength: 0,
            }
          }],
          xAxes: [{
            ticks: {
              padding: 15,
            },
            gridLines: {
              tickMarkLength: 0,
            }
          }]
        }, //end scales
        legend: {
          display:false
        },
        layout: {
          padding: {
            left: 5,
            right: 15,
            top: 5,
            bottom: 5
          }
        }
      } //end options
  }); //End Traffic Overview
//}

//add new data to chart
function addData(chart, label, data) {
    let newDataLength = data.length;
    for(let i = 0; i < newDataLength; i++){
      chart.data.datasets[0].data.push(data[i]);
      chart.data.labels.push(label[i]);
    }
    chart.update();
}

//remove data from chart
function removeData(chart) {
    let dataLength = chart.data.datasets[0].data.length;
    for(let i = 0; i < dataLength; i++){
     chart.data.datasets[0].data.pop();
     chart.data.labels.pop();
   }
    chart.update();
}


//add event listener for traffic time
function addTrafficTimeListener(){
  for(let i = 0; i < trafficOverviewTime.length; i++){
    trafficOverviewTime[i].addEventListener("click", (e) => {
      removeClass(trafficOverviewTime, "highlight");
      removeData(trafficChart);
      let event = e.target;
      let time = event.textContent;

      if(time === "Hourly"){
        data = [500, 510, 525, 520, 517, 545, 550, 560, 555, 570 ];
        labels = [ 'Aug 5th, 8:00', '9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00', '4:00', '5:00'];
        addData(trafficChart, labels, data);
        event.classList.add("highlight");
      } else if (time === "Daily"){
        data = [500, 630, 615, 680, 745, 715, 750 ];
        labels = [ 'S (8/5)', 'M (8/6)', 'T (8/7)', 'W (8/8)', 'R (8/9)', 'F (8/10)', 'S (8/11)'];
        event.classList.add("highlight");
        addData(trafficChart, labels, data);
      } else if (time === "Weekly"){
        data = [ 0,500 ,1000, 1500, 1250, 1750, 2000, 1500, 2000, 2500, 2250];
        labels = ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'];
        event.classList.add("highlight");
            addData(trafficChart, labels, data);
      } else if (time === "Monthly"){
        data = [ 2000, 3100, 2400, 3200, 4500, 4900, 3700, 5100, 5500, 5000, 6100, 6250];
        labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        event.classList.add("highlight");
        addData(trafficChart, labels, data);
      }
      trafficChart.update();
    }); //end event listener
  } //end for loop
} //end function

function removeClass(array, CSSclass){
  for(let i = 0; i < array.length; i++){
    array[i].classList.remove(CSSclass);
  }
}

///////////////////////////////////////////////
//Traffic Summary

var trafficSummaryChart = new Chart(trafficSummary, {
    type: 'bar',
    data: {
        labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        datasets: [{
            label: '',
            data: [50, 75, 125, 100, 200, 175, 125],
            backgroundColor: '#7377bf',
        }]
    },
    options: {
      responsive:true,
      legend: {
        display:false
      },
      layout: {
        padding: {
          left: 5,
          right: 15,
          top: 5,
          bottom: 5
        }
      },
      scales: {
        yAxes: [{
          ticks: {
              beginAtZero: true,
              suggestedMax: 250,
              padding: 25
          },
          gridLines: {
            tickMarkLength: 0,
          }
        }],
        xAxes: [{
            maxBarThickness: 35,
            BarThickness: 'flex',
            gridLines: {
              tickMarkLength: 0,
            },
            ticks: {
              padding: 15
            }
        }]
      } //end scales
    } //end options
});


////////////////////////////////////////////
//Mobile USERS

var mobileUsersChart = new Chart(mobileUsers, {
    type: 'doughnut',
    data: {
        labels: ['Phones', 'Tablets', 'Desktop'],
        datasets: [{
            data: [25, 15 ,60],
            backgroundColor: [
                '#74b1bf',
                '#81c98f',
                '#7377bf',
            ],
        }]
    },
    options: {
      responsive:true,

      legend: {
            position: 'right',
            labels: {
              padding: 20,
              boxWidth: 15,
              fontSize: 16
            }
        },
    } // end options
}); // end mobile users

///////////////////////////////////////////////////////////////////////////
//Toggle switches
function toggleSwitch() {
  for(let i = 0; i < toggleContainer.length; i++){
    toggleContainer[i].addEventListener("click", (e) => {
      if(toggleText[i].textContent === "On"){
        toggleOff(i);
        localStorage.setItem('toggle' + i, 'off');
      }
      else if (toggleText[i].textContent === "Off"){
        toggleOn(i);
        localStorage.setItem('toggle' + i, 'on');
      }
    });
  }
}

function toggleOff(i){
  toggleButton[i].style.transform = "translateX(-43px)";
  toggleButton[i].style.transition = ".25s";
  toggleText[i].textContent = "Off";
  toggleText[i].style.transform = "translateX(25px)";
  toggleText[i].style.transition = ".25s";
  toggleContainer[i].style.backgroundColor = "#a8aad7";
  toggleContainer[i].style.transition = ".25s";
}

function toggleOn(i){
  toggleButton[i].style.transform = "translateX(0)";
  toggleButton[i].style.transition = ".25s";
  toggleText[i].textContent = "On";
  toggleText[i].style.transform = "translateX(0)";
  toggleText[i].style.transition = ".25s";
  toggleContainer[i].style.backgroundColor = "#7377bf";
  toggleContainer[i].style.transition = ".25s";
}

function setToggle(){
  for(let i = 0; i < toggleContainer.length; i++){
    let togglePosition = localStorage.getItem("toggle" + i);
    if(togglePosition === "on"){
      toggleOn(i);
    }
    else if(togglePosition === "off"){
      toggleOff(i);
    }
  }
}
///////////////////////////////////////////////////////////////
//form
function formListener(){
  formSubmit.addEventListener('submit', (e) => {
    e.preventDefault();
    submitForm();
  });
}

function submitForm(){
  let user = search.value;
  alertMessageText = "<p><strong>Alert: </strong>Message sent successfully to <span class='capitalize'>" + user + "</span>.</p><i class='alert-clear fa fa-times'></i>";
  displayAlert(alertMessageText, 'success');
  addAlertListener();
  alertMessage.scrollIntoView({behavior: "smooth", block: "start" });
  search.value = "";
  messageText.value = "";
}


//Search/////////////////////////////////////////////////////////////////
//add listener to search bar
function addSearchListener(users){
  search.addEventListener("keyup", function(e) {
    //clear existing search results
    if(e.keyCode !== 38 && e.keyCode !== 40 && e.keyCode !== 9){
    clearSearch();
	  let searchString = search.value.toLowerCase();
    users.forEach((user) => {
      let userString = user.toLowerCase();
      if(userString.includes(searchString) && searchString.length > 0){
        //regular expression to convert all instances in newString
        let regEx = new RegExp(searchString, "g");
        let newString = "<strong>" + searchString + "</strong>";
        let highlightedUser = userString.replace(regEx, newString);
        let listedUser = document.createElement("p");
      //  listedUser.tabIndex = 0;
        listedUser.className = "listedUser";
        listedUser.innerHTML = highlightedUser;
        searchList.appendChild(listedUser);

        listedUser.addEventListener("click", (e) =>{
          search.value = listedUser.textContent;
          search.style.textTransform = "capitalize";
        });
      } //end if statement
    }); //end forEach
  }
  }); //end listener
} //end function

function clearSearch(){
  while(searchList.firstChild){
    searchList.removeChild(searchList.firstChild);
  }
}

//create array
function createArray(list){
  let array = [];
  for(let i = 0; i < list.length; i++){
    let item = list[i].textContent;
    array.push(item);
  }
  return array;
}
