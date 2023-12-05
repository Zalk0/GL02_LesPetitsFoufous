let capaciteMax = (creneaux, salle) => {
    let result = -1;
    creneaux.creneaux.forEach(unCreneau => {
        if (unCreneau.salle.includes(salle)) {
            result = unCreneau.nbPlaces;
        }
    });
    return result;
}

module.exports = capaciteMax;
