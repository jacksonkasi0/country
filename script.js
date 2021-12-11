let body = document.querySelector("body");

let api_get_timing = 0;

let container = document.createElement("div");
body.appendChild(container);
container.className = "container";

// -------------------- box 1 ------------------//

let box1 = document.createElement("div");
container.appendChild(box1);
box1.className = "box1";

let box1_inner = document.createElement("div");
box1.appendChild(box1_inner);
box1_inner.className = "box1_inner";

let flag = document.createElement("div");
box1_inner.appendChild(flag);

let flag_image = document.createElement("img");
flag.appendChild(flag_image);
flag_image.className = "image";

let userData = document.createElement("div");
userData.className = "userTable";
box1_inner.appendChild(userData);

let table = document.createElement("table");
userData.appendChild(table);

// ------------------------ function --------------------//

let ip_data;

async function countryData() {
  try {
    let responce = await fetch(
      "https://rest-countries-api-techieegy.herokuapp.com/v1/all"
    );

    let data = await responce.json();

    let ip = await fetch("https://ipapi.co/json");

    let ip_dat = await ip.json();
    console.log(ip);
    ip_data = ip_dat;

    data.forEach((item) => {
      let flag = item.alpha2Code.toLowerCase();
      item.alpha2Code === ip_data.country &&
        // (flag_image.src = item.flags[0]);
        (flag_image.src = `https://flagcdn.com/${flag}.svg`); // just for get img data faster
    });

    //  --------------- "table" for user location --------------- //

    let arr = [
      "org",
      "country_population",
      "country",
      "region",
      "city",
      "postal",
    ];

    let t_row = document.createElement("tr");
    table.appendChild(t_row);

    let t_row2 = document.createElement("tr");
    table.appendChild(t_row2);

    let t_row3 = document.createElement("tr");
    table.appendChild(t_row3);

    let t_row4 = document.createElement("tr");
    table.appendChild(t_row4);

    let country_name = document.createElement("tr");
    table.appendChild(country_name);

    let cN_td = document.createElement("td");
    cN_td.className = "cN_td";
    country_name.appendChild(cN_td);

    let a = document.createElement("a");
    a.href = "./page/";
    cN_td.appendChild(a);

    let button = document.createElement("button");
    a.appendChild(button);

    let explore = document.createElement("h3");
    explore.innerText = "Explore";
    button.appendChild(explore);

    let table_tr1 = t_row;
    let table_tr2 = t_row2;

    arr.forEach((i) => {
      i === "region" && (table_tr1 = t_row3) && (table_tr2 = t_row4);

      let t_data1 = document.createElement("td");
      table_tr1.appendChild(t_data1);

      let td_h4 = document.createElement("h4");
      let p_ = i;
      p_ === "country_population" && (p_ = "country population");

      td_h4.innerText = p_;
      t_data1.appendChild(td_h4);

      let t_data2 = document.createElement("td");
      table_tr2.appendChild(t_data2);

      let td_p = document.createElement("p");
      let cap = ip_data[i];
      cap === "" && (cap = " - - ");
      td_p.innerText = cap;
      t_data2.appendChild(td_p);
    });

    // ----------------  MAP function -------------------- //

    let lat = await ip_data.latitude;
    let lon = await ip_data.longitude;
    mapboxgl.accessToken =
      "pk.eyJ1IjoiamFja3Nvbi1rYXNpIiwiYSI6ImNrbzdsaDJvNTFvc3Eycm9pdTRxYmRxZjUifQ.BzA0w0U7lP0Ka3FcKkI_1Q";

    var map = new mapboxgl.Map({
      container: "map",
      center: [lon, lat],
      zoom: 8,
      style: "mapbox://styles/mapbox/streets-v11",
    });

    map.addControl(new mapboxgl.NavigationControl());

    const marker = new mapboxgl.Marker().setLngLat([lon, lat]).addTo(map);
  } catch (error) {
   
    alert(`${error.message}. Please disable your ad blocker / enable javascript on your browser`);
  }
}

countryData();

// ---------------------- box 2 & map -----------------//

let box2 = document.createElement("div");
box2.className = "box2";
container.appendChild(box2);

let displayMap = document.createElement("div");
displayMap.id = "map";
box2.appendChild(displayMap);

// ---------------------- box 2 &  I am   wrote the chart function in a new file called covidChart.js -----------------//

let myChart = document.createElement("div");
myChart.className = "chartContainer";
box2.appendChild(myChart);

let covidChart_graph = document.createElement("canvas");
covidChart_graph.id = "myChart";
myChart.appendChild(covidChart_graph);

let discription_Chart = document.createElement("h3");
discription_Chart.innerText =
  "Number of Covid 19 confirmed persons in the last 7 days";
discription_Chart.className = "discription";
myChart.appendChild(discription_Chart);
