let quandLibreSalle = (creneaux, salle) => {

    // creneaux pris
    let creneauxPris = new Set();
    for (let creneau of creneaux.creneaux) {
        if (creneau.salle === salle) {
            creneauxPris.add(creneau.horaire);
        }
    }

    //console.log(creneauxPris)
    
    // disponibilités
    let disponibilites = ['L 8h00-20h00', 'MA 8h00-20h00', 'ME 8h00-20h00', 'J 8h00-20h00', 'V 8h00-20h00']

    // ajuster les disponibilités en fonction des créneaux pris
    for (let creneauPris of creneauxPris) {
        disponibilites = ajusterDisponibilites(disponibilites, creneauPris);
    }

    // renvoyer les créneaux libres
    let creneauxLibres = new Set(disponibilites);

    return creneauxLibres;
}

// fonction pour ajuster les disponibilités en fonction des créneaux pris
let ajusterDisponibilites = (disponibilites, creneauPris) => {
    let jour = creneauPris.split(' ')[0];
    let heurePrise = creneauPris.split(' ')[1].split('-')[1];
    
    // Trouver l'index du jour dans les disponibilités
    let indexJour = disponibilites.findIndex(d => d.startsWith(jour));
    
    // Si l'index est trouvé, ajuster les heures disponibles
    if (indexJour !== -1) {
        disponibilites[indexJour] = jour + ' ' + heurePrise + '-20h00';
    }
    
    return disponibilites;
}

module.exports = quandLibreSalle;