class EnsembleCreneaux {
    constructor() {
        this.creneaux = new Set();
    }

    addCreneau = (unCreneau) => {
        this.creneaux.add(unCreneau);
    };

    hasCreneau = (unAutreCreneau) => {
        let found = false;

        for (let creneau of this.creneaux) {
            if (creneau.egal(unAutreCreneau)) {
                found = true;
                break;
            }
        }

        return found;
    };

    cardCreneaux = () => {
        return this.creneaux.size;
    };

    unionCreneaux = (autreEnsemble) => {
        const newUnionCreneaux = new EnsembleCreneaux();

        this.creneaux.forEach((creneau) => {
            newUnionCreneaux.addCreneau(creneau);
        });

        autreEnsemble.creneaux.forEach((creneau) => {
            if (!newUnionCreneaux.hasCreneau(creneau)) {
                newUnionCreneaux.addCreneau(creneau);
            }
        });

        return newUnionCreneaux;
    }

    interCreneaux = (autreEnsemble) => {
        const newInterCreneaux = new EnsembleCreneaux();

        this.creneaux.forEach((creneau) => {
            if (autreEnsemble.hasCreneau(creneau)) {
                newInterCreneaux.addCreneau(creneau);
            }
        });

        return newInterCreneaux;
    }

}

module.exports = EnsembleCreneaux;
