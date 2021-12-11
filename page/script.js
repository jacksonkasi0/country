let body = document.querySelector("body");

let container = document.createElement("div");
container.className = "container";
body.appendChild(container);

async function countryData() {

  try{

  let responce = await fetch(
    "https://rest-countries-api-techieegy.herokuapp.com/v1/all"
  );
  let data = await responce.json();

  data.forEach(item => {
    console.log(item);

    let card = document.createElement("div");
    card.className = "card";
    card.id = "card";
    container.appendChild(card);

    let cardImage = document.createElement("div");
    cardImage.className = "cardImage";
    card.appendChild(cardImage);

    // ---------- image (flag) shadow ----------------//

    card.onmousemove = () => {
      cardImage.style.marginTop = "-13px";
      image.style.boxShadow =
        "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset";
    };
    card.onmouseleave = () => {
      cardImage.style.marginTop = "13px";
      image.style.boxShadow = "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px";
    };

    // --------------------------- flag img ---------------------------------//

    let flag = item.alpha2Code.toLowerCase();

    let image = document.createElement("img");
    image.className = "image";
    image.alt = "Country Flag";
    cardImage.appendChild(image);
    image.src = `https://flagcdn.com/${flag}.svg`;
    // image.src = item.flags[0];

    let countryName = document.createElement("h3");
    countryName.innerText = item.name;
    countryName.className = "countryName";
    cardImage.appendChild(countryName);

    let bottom = document.createElement("div");
    bottom.className = "bottom";
    card.appendChild(bottom);

    let cardBottom = document.createElement("div");
    cardBottom.className = "cardBottom";
    bottom.appendChild(cardBottom);

    // ---------------------- country table data --------------- //

    let table = document.createElement("table");
    cardBottom.appendChild(table);

    let arr = ["capital", "region", "latlng", 0, 1, 2];

    arr.forEach(i => {
      let t_row = document.createElement("tr");
      table.appendChild(t_row);

      let t_data1 = document.createElement("td");
      t_row.appendChild(t_data1);

      let td_p = document.createElement("p");
      td_p.innerText = i;
      t_data1.appendChild(td_p);

      let t_data2 = document.createElement("td");
      t_row.appendChild(t_data2);

      let td_h4 = document.createElement("h4");

      let cap = item[i];

      // that returns true if a property(i) exists in an Object(item).
      i in item === false && (cap = " - - ");
      // --------------

      if (typeof cap === "object") {
        if (cap.length >= 1) {
          cap[0] % 1 !== 0 && (cap[0] = cap[0].toFixed(2));
          cap[1] % 1 !== 0 && (cap[1] = cap[1].toFixed(2));
        } else {
          cap = " - - ";
        }
      }
      td_h4.innerText = cap;

      t_data2.appendChild(td_h4);

      //  ccy mean is : item.currencies[0].{ what u want }
      let ccy;
      // use of exist :   some item.{ property } is not in "Object(item)", hence  that returns true if a property exists in an Object.
      let exist = "currencies" in item;

      if (i === 0) {
        td_p.innerText = "ccy code";
        exist === true ? (ccy = item.currencies[0].code) : (ccy = " - - ");
        td_h4.innerText = ccy;
      } else if (i === 1) {
        td_p.innerText = "ccy name";
        exist === true ? (ccy = item.currencies[0].name) : (ccy = " - - ");
        td_h4.innerText = ccy;
      } else if (i === 2) {
        td_p.innerText = "ccy symbol";
        exist === true ? (ccy = item.currencies[0].symbol) : (ccy = " - - ");
        td_h4.innerText = ccy;
      }
    });
  });
} catch (error) {
  alert("please disable your ad blocker / enable javascript on your browser");
}
}

countryData();
