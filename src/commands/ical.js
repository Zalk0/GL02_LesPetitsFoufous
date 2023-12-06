const fs = require("fs");
const Creneau = require("../utils/Creneau");

const ical = (parser) => {
    let data = "BEGIN:VCALENDAR\nVERSION:2.0\n" +
        "PRODID:-//LesPetitsFoufous//NONSGML v1.0.0//FR\n";

    function addEvent(creneau) {
        const uid = [creneau.ue, creneau.salle, creneau.horaire].join("-").replace(" ", "_");
        data += "BEGIN:VEVENT\n" +
            "UID:" + uid + "\n" +
            "SUMMARY:" + creneau.ue + "\n" +
            "DTSTAMP:" + creneau.horaire + "\n" + //TODO: Parse to timestamp
            "DTSTART:" + creneau.horaire + "\n" + //identique à DTSTAMP
            "DTEND:" + creneau.horaire + "\n" +
            "LOCATION:" + creneau.salle + "\n" +
            "END:VEVENT\n";
    }

    function generateFile() {
        data += "END:VCALENDAR\n";
        fs.writeFileSync("./mon_edt.ics", data);
    }

    parser.parsedCreneaux.getCreneauxUE("CM02").forEach(creneau => {
        addEvent(creneau);
    }); //Manual test for now
    generateFile();
}

module.exports = ical;
