const Creneau = require('../src/utils/Creneau.js');
const EnsembleCreneaux = require('../src/utils/EnsembleCreneaux.js');

describe("Programme semantic pour tester le créneau et l'ensemble de créneaux", function () {

    beforeAll(function () {
        
        this.creneau = new Creneau("GL02", "C1", "F1", "L 10:00-12:00", "C002", 96);

    });

    it("peut créer un nouveau créneau", function () {

        expect(this.creneau).toBeDefined();
        expect(this.creneau.ue).toBe("GL02");
        expect(this.creneau).toEqual(jasmine.objectContaining({ue: "GL02"}));

    });

    it("peut comparer deux créneaux", function () {

        let creneau2 = new Creneau("GL02", "C1", "F1", "L 10:00-12:00", "C002", 96);
        let creneau3 = new Creneau("GL02", "C1", "F1", "ME 8:00-10:00", "C002", 96);
        expect(this.creneau.egal(creneau2)).toBe(true);
        expect(this.creneau.egal(creneau3)).toBe(false);

    });

    it("permet de créer des ensembles de créneaux", function () {

        let ensembleCreneaux = new EnsembleCreneaux();
        let creneau2 = new Creneau("GL02", "C1", "F1", "L 10:00-12:00", "C002", 96);
        let creneau3 = new Creneau("GL02", "C1", "F1", "ME 8:00-10:00", "C002", 96);
        ensembleCreneaux.addCreneau(creneau2);
        ensembleCreneaux.addCreneau(creneau3);
        expect(ensembleCreneaux.creneaux).toContain(creneau2);
        expect(ensembleCreneaux.creneaux).toContain(creneau3);

    });

    it("permet de faire l'union de deux créneaux", function () {

        let ensembleCreneaux1 = new EnsembleCreneaux();
        let ensembleCreneaux2 = new EnsembleCreneaux();

        let creneau1 = new Creneau("GL02", "C1", "F1", "L 10:00-12:00", "C002", 96);
        let creneau2 = new Creneau("GL02", "C1", "F1", "ME 8:00-10:00", "C002", 96);
        let creneau3 = new Creneau("GL02", "C1", "F1", "J 14:00-16:00", "C002", 24);

        ensembleCreneaux1.addCreneau(creneau1);
        ensembleCreneaux1.addCreneau(creneau2);

        ensembleCreneaux2.addCreneau(creneau2);
        ensembleCreneaux2.addCreneau(creneau3);

        let unionEnsembleCreneaux = ensembleCreneaux1.unionCreneaux(ensembleCreneaux2);

        expect(unionEnsembleCreneaux.creneaux).toContain(creneau1);
        expect(unionEnsembleCreneaux.creneaux).toContain(creneau2);
        expect(unionEnsembleCreneaux.creneaux).toContain(creneau3);
        

    });
    
    it("permet de faire l'intersection de deux créneaux", function () {

        let ensembleCreneaux1 = new EnsembleCreneaux();
        let ensembleCreneaux2 = new EnsembleCreneaux();

        let creneau1 = new Creneau("GL02", "C1", "F1", "L 10:00-12:00", "C002", 96);
        let creneau2 = new Creneau("GL02", "C1", "F1", "ME 8:00-10:00", "C002", 96);
        let creneau3 = new Creneau("GL02", "C1", "F1", "J 14:00-16:00", "C002", 24);

        ensembleCreneaux1.addCreneau(creneau1);
        ensembleCreneaux1.addCreneau(creneau2);

        ensembleCreneaux2.addCreneau(creneau2);
        ensembleCreneaux2.addCreneau(creneau3);

        let intersectionEnsembleCreneaux = ensembleCreneaux1.interCreneaux(ensembleCreneaux2);

        expect(intersectionEnsembleCreneaux.creneaux).toContain(creneau2);
        expect(intersectionEnsembleCreneaux.creneaux).not.toContain(creneau1);
        expect(intersectionEnsembleCreneaux.creneaux).not.toContain(creneau3);

    });
});
