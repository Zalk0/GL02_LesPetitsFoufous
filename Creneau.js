class Creneau {
    constructor(ue, type, horaire, nbPlaces, salle, indexSousGroupe) {
        this.ue = ue;
        this.type = type;
        this.indexSousGroupe = indexSousGroupe;
        this.horaire = horaire;
        this.salle = salle;
        this.nbPlaces = nbPlaces;
    }

    egal(unAutreCreneau) {
        return JSON.stringify(this) === JSON.stringify(unAutreCreneau);
    }
}

module.exports = Creneau;
