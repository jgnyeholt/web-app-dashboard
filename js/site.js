const alertMessage = document.getElementById("alert-message");
const alertMessageText = " Here is the medium length sentance long alert popup up purple bar.";
const alertText = document.getElementsByClassName("alert-text");
const clearAlert = document.getElementsByClassName("alert-clear");
const trafficOverview = document.getElementById('TrafficOverview').getContext('2d');
const trafficOverviewTime = document.getElementsByClassName("traffic-time-context");


//Data
let data = [ 0,500 ,1000, 1500, 1250, 1750, 2000, 1500, 2000, 2500, 2250];
let labels = ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'];


document.addEventListener("DOMContentLoaded", () => {
  displayAlert();
  addAlertListener();
  constructTrafficOverview(data, labels);
  addTrafficTimeListener();
}); // end DOMContentLoaded



function displayAlert(){
  let message = document.createElement("div");
  message.className = "alert-text";
  message.innerHTML = "<p><strong>Alert </strong>" +
                      alertMessageText +
                      "</p><span class='alert-clear'>X</span>";
  alertMessage.appendChild(message);
}

function addAlertListener(){
  for(let i = 0; i < clearAlert.length; i++){
    clearAlert[i].addEventListener("click", (event) => {
      let node = event.target;
      let fullMessage = node.parentElement;
      alertMessage.removeChild(fullMessage);
    });
  }
}

function constructTrafficOverview(data, labels){
  var myChart = new Chart(trafficOverview, {
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
        responsive:true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              // stepSize: 500,
              padding: 25,
            },
            gridLines: {
              tickMarkLength: 0,
            }
          }],
          xAxes: [{
            ticks: {
              tickMarkLength: 0,
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
}
//assign data/labels based on selected traffic time


//add event listener for traffic time
function addTrafficTimeListener(){
  for(let i = 0; i < trafficOverviewTime.length; i++){
    trafficOverviewTime[i].addEventListener("click", (e) => {
      removeClass(trafficOverviewTime, "highlight");

      let event = e.target;
      let time = event.textContent;

      if(time === "Hourly"){
        data = [500, 510, 525, 520, 517, 545, 550, 560, 555, 570 ];
        labels = [ 'Aug 5th, 8:00', '9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00', '4:00', '5:00'];
        constructTrafficOverview(data, labels);
        event.classList.add("highlight");
      } else if (time === "Daily"){
        data = [500, 580, 630, 615, 680, 700, 745, 715, 750, 800 ];
        labels = [ 'S (8/5)', 'M (8/6)', 'T (8/7)', 'W (8/8)', 'R (8/9)', 'F (8/10)', 'S (8/11)'];
        event.classList.add("highlight");
        constructTrafficOverview(data, labels);
      } else if (time === "Weekly"){
        data = [ 0,500 ,1000, 1500, 1250, 1750, 2000, 1500, 2000, 2500, 2250];
        labels = ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'];
        constructTrafficOverview(data, labels);
        event.classList.add("highlight");
      } else if (time === "Monthly"){
        data = [ 2000, 3100, 2400, 3200, 4500, 4900, 3700, 5100, 5500, 5000, 6100, 6250];
        labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        constructTrafficOverview(data, labels);
        event.classList.add("highlight");
      }
    });
  }
}

function removeClass(array, CSSclass){
  for(let i = 0; i < array.length; i++){
    array[i].classList.remove(CSSclass);
  }
}
