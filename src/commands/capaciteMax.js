let capaciteMax = (creneaux, salle) => {
    let result = -1;

    /*On passe sur chaque créneau dans creneaux et on vérfie si la salle est incluse dans le créneau, 
    si c'est le cas on récupère la capacité max*/
    creneaux.creneaux.forEach(unCreneau => {
        if (unCreneau.salle.includes(salle)) {
            result = unCreneau.nbPlaces;
        }
    });

    return result;
}

module.exports = capaciteMax;
