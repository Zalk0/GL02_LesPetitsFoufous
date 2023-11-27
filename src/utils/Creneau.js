class Creneau {
    constructor(ue, type, indexSousGroupe, horaire,salle, nbPlaces) {
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
