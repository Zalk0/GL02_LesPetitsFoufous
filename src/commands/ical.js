const fs = require("fs");
const readline = require("readline");

const ical = (parser, usager, date_debut, date_fin) => {

    function addEvent(creneau, date, horaire) {
        let debut = horaire[2].split(":");
        date.setHours(debut[0], debut[1]);
        debut = date.toISOString().replace(/[-:]/g, "").slice(0, -5) + "Z";

        let fin = horaire[3].split(":");
        date.setHours(fin[0], fin[1]);
        fin = date.toISOString().replace(/[-:]/g, "").slice(0, -5) + "Z";
        const uid = [creneau.ue, creneau.salle, creneau.horaire].join("-").replace(" ", "_");
        data += "BEGIN:VEVENT\n" +
            "UID:" + uid + "\n" +
            "SUMMARY:" + creneau.ue + "\n" +
            "DTSTAMP:" + debut + "\n" +
            "DTSTART:" + debut + "\n" + // equal to DTSTAMP
            "DTEND:" + fin + "\n" +
            "LOCATION:" + creneau.salle + "\n" +
            "ATTENDEE:" + usager + "\n" +
            "END:VEVENT\n";
    }

    function getDay(day) {
        switch (day) {
            case "L":
                return "Lundi";
            case "MA":
                return "Mardi";
            case "ME":
                return "Mercredi";
            case "J":
                return "Jeudi";
            case "V":
                return "Vendredi";
            case "S":
                return "Samedi";
            case "D":
                return "Dimanche";
        }
    }

    function parseHoraire(horaire) {
        horaire = horaire.split(" ");
        horaire[0] = getDay(horaire[0]);
        [horaire[2], horaire[3]] = horaire[1].split("-");
        return horaire;
    }

    function generateFile() {
        data += "END:VCALENDAR\n";
        fs.writeFileSync("./mon_edt.ics", data);
    }

    function choixHoraire(creneaux, horaires) {
        rl.question("A quelle horaire ?\n", resp => {
            if (resp === "exit") {
                choixCours();
                return;
            }

            resp = parseInt(resp);
            if (isNaN(resp)) {
                console.log("Ce n'est pas un chiffre !")
                choixHoraire(creneaux, horaires);
                return;
            }

            if (resp > creneaux.size || resp < 1) {
                console.log("Ce n'est pas un chiffre valide");
                choixHoraire(creneaux, horaires);
                return;
            }

            let i = 0;
            for (let creneau of creneaux) {
                if (resp === i + 1) {
                    addEvent(creneau, date_debut, horaires[i]); //TODO: check if not busy & manage date
                    choixCours();
                    return;
                }
                i++;
            }
        })
    }

    function choixCours() {
        rl.question("Quel cours as-tu ?\n", resp => {
            if (resp === "exit") {
                rl.close();
                generateFile();
                return;
            }

            const creneaux = parser.parsedCreneaux.getCreneauxUE(resp);
            if (creneaux.size === 0) {
                console.log("Ce cours n'existe pas !");
                choixCours();
                return;
            }

            const horaires = [];
            let i = 0;
            creneaux.forEach(creneau => {
                horaires[i] = parseHoraire(creneau.horaire);
                console.log((i + 1) + ". " + horaires[i].slice(0, 2).join(" "));
                i++;
            });
            choixHoraire(creneaux, horaires);
        });
    }

    let data = "BEGIN:VCALENDAR\nVERSION:2.0\n" +
        "PRODID:-//LesPetitsFoufous//NONSGML v1.0.0//FR\n";
    const rl = readline.createInterface({input: process.stdin, output: process.stdout});
    choixCours();
}

module.exports = ical;
