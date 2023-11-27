let findSalles = (creneaux, cours) => {
    let result = new Set();

    creneaux.creneaux.forEach(unCreneau => {
        if (unCreneau.ue.includes(cours)) {
            result.add(unCreneau.salle);
        }
    });

    return result;
}

module.exports = findSalles;
