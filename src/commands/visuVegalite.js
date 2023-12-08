const vg = require('vega');
const vegalite = require('vega-lite');
const fs = require('fs');
const capaciteMax = require("./capaciteMax");

let visualisation = (creneaux, ordre) => {

  let roomHours = {}; // Dictionnaire pour stocker les heures d'occupation de chaque salle

  creneaux.creneaux.forEach(unCreneau => {
      const salle = unCreneau.salle;
      const duree = calculateDuration(unCreneau.horaire);

      if (roomHours[salle]) {
        roomHours[salle] += duree; // Ajoute la durée du créneau à la durée totale de la salle
      } else {
        roomHours[salle] = duree; // Initialise la durée totale de la salle
      }
  });

  // Calcule la durée d'un créneau
  function calculateDuration(horaire) {
    let str = horaire.split(" ");
    const heure = str[1];
    const debut = heure.split("-")[0];
    const fin = heure.split("-")[1];

    const debutHour = parseInt(debut.split(":")[0]);
    const debutMinute = parseInt(debut.split(":")[1]);
    const finHour = parseInt(fin.split(":")[0]);
    const finMinute = parseInt(fin.split(":")[1]);

    const debutTime = debutHour + debutMinute / 60;
    const finTime = finHour + finMinute / 60;

    const duree = finTime - debutTime;
    return duree;
  }

  let value = (ordre === "d") ? -1 : 1;
  // Sort roomHours dictionary by capacity of each room
  roomHours = Object.entries(roomHours)
    .sort(([salle1], [salle2]) => value*(capaciteMax(creneaux, salle1) - capaciteMax(creneaux, salle2)))
    .reduce((acc, [salle, hours]) => {
      acc[salle] = hours;
      return acc;
    }, {});

  var chart = {
    "data": {
      "values": Object.entries(roomHours).map(([salle, hours]) => {
        return {"salle": salle, "tauxOccupation": hours / 64 * 100};
      })
    },
    "mark": "bar",
    "encoding": {
      "x": {"field": "salle", "type": "nominal", "sort": "-tauxOccupation"},
      "y": {"field": "tauxOccupation", "type": "quantitative", "axis": {"title": "Taux d'occupation"}}
    }
  };
    
    const myChart = vegalite.compile(chart).spec;

    /* Canvas version */
    var runtime = vg.parse(myChart);
    var view = new vg.View(runtime).renderer('canvas').background("#FFF").run();
    var myCanvas = view.toCanvas();
    myCanvas.then(function(res){
        fs.writeFileSync("./result.png", res.toBuffer());
        view.finalize();
    })

  };

  module.exports = visualisation;
