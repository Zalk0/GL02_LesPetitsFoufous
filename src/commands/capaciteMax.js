let capaciteMax = (creneaux, salle) => {
    let result = -1;
    creneaux.creneaux.forEach(unCreneau => {
        if (unCreneau.salle.includes(salle)) {
            result = unCreneau.nbPlaces;
        }
    });
    console.log(result);
    return result;
}

module.exports = capaciteMax;
