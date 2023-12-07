describe("Program Syntactic testing of VpfParser", function () {

    beforeAll(function () {
        const Creneau = require('../src/utils/Creneau.js');
        const EnsembleCreneaux = require('../src/utils/EnsembleCreneaux.js');

        const CreneauParser = require("./utils/CreneauParser");
        this.analyzer = new CreneauParser();

        this.creneau = new Creneau("GL02", "C1", "F1", "L 10:00-12:00", "C002", 96);

    });

    it("can read a name from a simulated input", function () {

        let input = "+BI02\n1,C1,P=25,H=J 8:00-10:00,F1,S=S104//\n1,D1,P=25,H=J 10:00-12:00,F1,S=S104//";
        expect(this.analyzer.name(input)).toBe("Café d'Albert");

    });


    it("can read a lat lng coordinate from a simulated input", function () {

        let input = ["latlng", "48.866205;2.399279"];
        expect(this.analyzer.latlng(input)).toEqual({lat: "48.866205", lng: "2.399279"});

        // there is something missing here

    });

    it("can have negative coordinates", function () {

        let input = ["latlng", "-5.866205;-8.399279"];
        expect(this.analyzer.latlng(input)).toEqual({lat: "-5.866205", lng: "-8.399279"});

    });

    it("can have a note only between 0 and 5", function () {

        let input = ["note", "6"];
        this.analyzer.note(input, this.pEmptyRating);
        expect(this.pEmptyRating.ratings).toEqual([]);
        input = ["note", "4"];
        this.analyzer.note(input, this.pEmptyRating);
        expect(this.pEmptyRating.ratings).toEqual(["4"]);

    });

    it("can read several rankings for a POI from a simulated input", function () {

        let input = "START_POI\r\nname: Chez Gabin\r\nlatlng: 48.871794;2.379538\r\nnote: 3\r\nnote: 2\r\nEND_POI"
        expect(this.analyzer.poi(this.analyzer.tokenize(input))).toEqual(true);
        expect(this.analyzer.parsedPOI).toEqual([this.pRatings]);

    });


});
