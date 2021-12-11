//  -------------------------- x value get -----------------------
let xValue = [];
let DateArray = [];
//  ------------ ------------ get last 7 days ----------------------- //

let GetDays = () => {
  for (var i = 1; i < 8; i++) {
    var date = new Date();
    var last = new Date(date.getTime() - i * 24 * 60 * 60 * 1000);
    var day = last.getDate();
    var week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][last.getDay()];
    var month = last.getMonth() + 1;
    var year = last.getFullYear();
    var fulld = year + "-" + month + "-" + day;
    xValue.unshift(day + " " + week);
    DateArray.unshift(fulld);
  }
  return DateArray;
};
GetDays();

//  -------------------------- y value get -----------------------

let chart_ip;
let yValue;

covidChart_Datat();
async function covidChart_Datat() {
  let ip = await fetch("https://ipapi.co/json/");
  let ip_data = await ip.json();
  chart_ip = ip_data;

  // ------------- chart api data get --------------//

  let today_confirmed = [];

  DateArray.map(date => {
    async function chart() {
      let region_data = await fetch(
        `https://api.covid19tracking.narrativa.com/api/${date}/country/${chart_ip["country"]}/region/${chart_ip["region"]}`
      );
      let covid = await region_data.json();

      let covid_conf = covid.total.today_confirmed;

      today_confirmed.push(covid_conf);

      api_get_timing++;

      if (api_get_timing === 7) {
        yValue = today_confirmed.sort((a, b) => a - b);
        // ------------------ chart disgin ------------------//
        new Chart("myChart", {
          type: "line",
          data: {
            labels: xValue,

            datasets: [
              {
                data: yValue,
                pointBackgroundColor: "blue",
                pointBorderColor: "white",
                pointHoverRadius: 4,
                borderColor: "rgba(0,0,0,0.1)"
              }
            ]
          },
          options: {
            // backgroundColor: "red",
            // background:
            //   "linear-gradient(180deg, rgba(224,255,33,0.7651435574229692) 0%, rgba(255,255,255,0) 100%)",
            legend: { display: false },
            scales: {
              xAxes: [
                {
                  ticks: {
                    fontColor: "white"
                  }
                }
              ],
              yAxes: [
                {
                  ticks: { min: yValue[-1], max: yValue[8], fontColor: "black" }
                }
              ]
            }
          }
        });
      }
    }
    chart();
  });
}
