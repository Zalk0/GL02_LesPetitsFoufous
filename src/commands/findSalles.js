const DataParser = require('../utils/DataParser.js');
const EnsembleCreneau = require('../utils/EnsembleCreneaux.js');
const Creneau = require('../utils/Creneau.js');

let findSalles = (cours, file) => {
    console.log(`findSalles(${cours})`);
    let creneaux = new EnsembleCreneau();
    console.log(DataParser);

    creneaux.creneaux.forEach(unCreneau => {
        if (unCreneau.ue.includes(cours)) {
            result.add(unCreneau.salle);
        }
    });

    return result;
}

module.exports = findSalles;
