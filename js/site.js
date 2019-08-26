const alertMessage = document.getElementById("alert-message");
const alertMessageText = " Here is the medium length sentance long alert popup up purple bar.";
const alertText = document.getElementsByClassName("alert-text");
const clearAlert = document.getElementsByClassName("alert-clear");
const data = [ 0,500 ,1000, 1500, 1250, 1750, 2000, 1500, 2000, 2500, 2250];
const labels = ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'];
const trafficOverview = document.getElementById('TrafficOverview').getContext('2d');

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

function constructTrafficOverview(){
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
              stepSize: 500,
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


document.addEventListener("DOMContentLoaded", () => {
  displayAlert();
  addAlertListener();
  constructTrafficOverview();
}); // end DOMContentLoaded
