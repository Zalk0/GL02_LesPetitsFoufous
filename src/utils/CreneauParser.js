const fs = require('fs');
const path = require('path');

const Creneau = require('./Creneau');
const EnsembleCreneaux = require('./EnsembleCreneaux');

class CreneauParser {
    constructor() {
        this.parsedCreneaux = new EnsembleCreneaux();
        this.noErrors = true;
    }

    parse(path) {
        try {
            const stats = fs.statSync(path);

            if (stats.isDirectory()) {
                this.processFolder(path);
            } else if (stats.isFile()) {
                this.processFile(path);
            } else {
                this.noErrors = false;
                console.log(`${path} n'est ni un dossier ni un fichier.`);
            }
        } catch (err) {
            this.noErrors = false;
            console.error(`ERREUR : ${err.message}`);
        }
    }

    processFile(filePath) {
        const fileContent = fs.readFileSync(filePath, "utf8");
        return this.parseData(fileContent);
    }

    processFolder(folderPath) {
        const files = fs.readdirSync(folderPath);
        for (const file of files) {
            const filePath = path.join(folderPath, file);
            const stats = fs.statSync(filePath);

            if (stats.isDirectory()) {
                this.processFolder(filePath);
            } else {
                this.processFile(filePath);
            }
        }
        return this.parsedCreneaux;
    }

    parseData(data) {
        const lines = data.split("\n");

        let currentCourse = "";
        let parsingStarted = false;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.startsWith("Page")) {
                break;
            }
            if (line.startsWith("+") && line !== "+UVUV") {
                currentCourse = line.substring(1);
                parsingStarted = true;
            } else if (parsingStarted && line !== "") {
                const values = line.split(",");
                const type = values[1];
                const nbPlaces = values[2].split("=")[1];
                const horaire = values[3].split("=")[1];
                const indexSousGroupe = values[4];
                const salle = values[5].split("=")[1].replace("//", "");

                let newCreneau = new Creneau(currentCourse, type, horaire, nbPlaces, salle, indexSousGroupe);

                this.parsedCreneaux.addCreneau(newCreneau);
            }
        }

        return this.parsedCreneaux;
    }
}

module.exports = CreneauParser;
