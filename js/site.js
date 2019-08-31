const alertMessage = document.getElementById("alert-message");
const alertMessageText = " Here is the medium length sentance long alert popup up purple bar.";
const alertText = document.getElementsByClassName("alert-text");
const clearAlert = document.getElementsByClassName("alert-clear");
const trafficOverview = document.getElementById('TrafficOverview').getContext('2d');
const trafficOverviewTime = document.getElementsByClassName("traffic-time-context");
const trafficSummary = document.getElementById('TrafficSummary').getContext('2d');
const mobileUsers = document.getElementById('MobileUsers').getContext('2d');
const toggleContainer = document.getElementsByClassName('toggle-switch');
const toggleText = document.getElementsByClassName('toggle-text');
const toggleButton = document.getElementsByClassName('toggle-button');
const liveNotification = document.querySelector('.liveNotification');
const notificationBell = document.querySelector('.bell');
const dropDown = document.querySelector('.dropdown-container');
const notificationClear = document.getElementsByClassName('notification-clear');
const dropDownHeader = document.querySelector(".dropdown-header");
const search = document.getElementById("search");
const userName = document.getElementsByClassName("user-name");
const searchList = document.getElementById("searchList");
const listedUser = document.getElementsByClassName('listedUser');

let userArray = [];

let data = [ 0,500 ,1000, 1500, 1250, 1750, 2000, 1500, 2000, 2500, 2250];
let labels = ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'];

let notificationText = ["This is a new notification.",
                        "You have 6 unread messages.",
                        "You have 3 new followers.",
                        "Your password expires in 7 days."];

///////////////////////////////
//Instantiate listeners, constructors
document.addEventListener("DOMContentLoaded", () => {
  displayAlert();
  addAlertListener();
  addTrafficTimeListener();
  toggleSwitch();
  addNotification(notificationText);
  notificationListener();
  globalListener();
  deleteNotification();
  addSearchListener(userArray);
  createUserArray(userName);
}); // end DOMContentLoaded


//global listener to click off notifications
function globalListener(){
  document.addEventListener("click", (e) => {
    console.log();
    if (dropDown.style.display === "block" &&
    !(e.target.className.includes("bell") ||
    e.target.parentElement.className.includes("dropdown-container") ||
    e.target.className.includes("notification-clear"))) {
      dropDown.style.display = "none";
      dropDown.style.transform = "translate(0, 0)";
    }
  });
}

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
  let width = dropDown.offsetWidth -  notificationBell.offsetWidth;
  let translate = "translate(-" + width + "px, 40px)";
  dropDown.style.transform = translate;
  dropDown.style.transition = "transform .25s";
}

//adjust notificaiton header text
function notificationHeader(){
  let num = dropDown.children.length - 1;
  dropDownHeader.textContent = "You have " + num + " notifications";
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

//display purple alert bar
function displayAlert(){
  let message = document.createElement("div");
  message.className = "alert-text";
  message.innerHTML = "<p><strong>Alert </strong>" +
                      alertMessageText +
                      "</p><i class='alert-clear fa fa-times' aria-hidden='true'></i>";
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

//Toggle switches
function toggleSwitch() {

  for(let i = 0; i < toggleContainer.length; i++){
    toggleContainer[i].addEventListener("click", (e) => {
      if(toggleText[i].textContent === "On"){
        toggleButton[i].style.transform = "translateX(-43px)";
        toggleButton[i].style.transition = ".25s";
        toggleText[i].textContent = "Off";
        toggleText[i].style.transform = "translateX(25px)";
        toggleText[i].style.transition = ".25s";
        toggleContainer[i].style.backgroundColor = "#a8aad7";
        toggleContainer[i].style.transition = ".25s";
      }
      else if (toggleText[i].textContent === "Off"){
        toggleButton[i].style.transform = "translateX(0)";
        toggleButton[i].style.transition = ".25s";
        toggleText[i].textContent = "On";
        toggleText[i].style.transform = "translateX(0)";
        toggleText[i].style.transition = ".25s";
        toggleContainer[i].style.backgroundColor = "#7377bf";
        toggleContainer[i].style.transition = ".25s";
      }
    });
  }
}

//add listener to search bar
function addSearchListener(users){
  search.addEventListener("keyup", function() {
    //clear existing search results
    while(searchList.firstChild){
      searchList.removeChild(searchList.firstChild);
    }

	  let searchString = search.value.toLowerCase();

    users.forEach((user) => {
      let userString = user.toLowerCase();
      if(userString.includes(searchString) && searchString.length > 0){
        //regular expression to convert all instances in newString
        let regEx = new RegExp(searchString, "g");
        newString = "<strong>" + searchString + "</strong>";
        let highlightedUser = userString.replace(regEx, newString);
        let listedUser = document.createElement("p");
        listedUser.className = "listedUser";
        listedUser.innerHTML = highlightedUser;
        searchList.appendChild(listedUser);

      }
    }); //end forEach
  }); //end listener
} //end function

//create array of users
function createUserArray(users){
  for(let i = 0; i < users.length; i++){
    let user = users[i].textContent;
    userArray.push(user);
  }
}
