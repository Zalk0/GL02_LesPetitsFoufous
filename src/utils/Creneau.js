class Creneau {
    constructor(ue, type, indexSousGroupe, horaire, salle, nbPlaces) {
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

    estEnConflit(unAutreCreneau) {
        let [jour1, horaire1] = this.horaire.split(" ");
        let [horaireDebut1, horaireFin1] = horaire1.split("-");
        let [heureDebut1, minuteDebut1] = horaireDebut1.split(":");
        let [heureFin1, minuteFin1] = horaireFin1.split(":");

        let [jour2, horaire2] = unAutreCreneau.horaire.split(" ");
        let [horaireDebut2, horaireFin2] = horaire2.split("-");
        let [heureDebut2, minuteDebut2] = horaireDebut2.split(":");
        let [heureFin2, minuteFin2] = horaireFin2.split(":");

        heureDebut1 = parseInt(heureDebut1);
        minuteDebut1 = parseInt(minuteDebut1);
        heureFin1 = parseInt(heureFin1);
        minuteFin1 = parseInt(minuteFin1);

        heureDebut2 = parseInt(heureDebut2);
        minuteDebut2 = parseInt(minuteDebut2);
        heureFin2 = parseInt(heureFin2);
        minuteFin2 = parseInt(minuteFin2);

        if (this.salle == unAutreCreneau.salle && jour1 == jour2 &&
            (heureDebut1 < heureFin2 || (heureDebut1 == heureFin2 && minuteDebut1 < minuteFin2)) &&
            (heureFin1 > heureDebut2 || (heureFin1 == heureDebut2 && minuteFin1 > minuteDebut2))) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = Creneau;
