const DataParser = require('../utils/DataParser.js');
const EnsembleCreneau = require('../utils/EnsembleCreneaux.js');
const Creneau = require('../utils/Creneau.js');

let findSalles = (cours, file) => {
    console.log(`findSalles(${cours})`);
    let creneaux = new EnsembleCreneau();
    console.log(DataParser);

}

module.exports = findSalles;
