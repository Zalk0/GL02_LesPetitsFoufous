const fs = require("fs");
const path = require("path");

const Creneau = require("./Creneau");
const EnsembleCreneaux = require("./EnsembleCreneaux");

class CreneauParser {
    constructor() {
        this.parsedCreneaux = new EnsembleCreneaux();
        this.showMessages = false;
        this.noErrors = true;
    }

    parse(path, showMessages) {
        this.showMessages = showMessages;
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

        let ue = "";
        let parsingStarted = false;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.startsWith("Page")) {
                break;
            }
            if (line.startsWith("+") && line !== "+UVUV") {
                ue = line.substring(1);
                parsingStarted = true;
            } else if (parsingStarted && line !== "") {
                const values = line.split(",");
                const type = values[1];
                const nbPlaces = parseInt(values[2].split("=")[1]);
                const horaire = values[3].split("=")[1];
                const indexSousGroupe = values[4];
                const salle = values[5].split("=")[1].replace(/\/.*/, "");
                if (line.split("/").length > 3) {
                    const line_split = line.replace("//", "").split("/");
                    const values2 = line_split[1].split(",")
                    const horaire2 = values2[0];
                    const indexSousGroupe2 = values2[1];
                    const salle2 = values2[2].split("=")[1]

                    let newCreneau2 = new Creneau(ue, type, indexSousGroupe2, horaire2, salle2, nbPlaces);
                    this.parsedCreneaux.addCreneau(newCreneau2, this.showMessages);
                }

                let newCreneau = new Creneau(ue, type, indexSousGroupe, horaire, salle, nbPlaces);

                this.parsedCreneaux.addCreneau(newCreneau, this.showMessages);
            }
        }

        return this.parsedCreneaux;
    }
}

module.exports = CreneauParser;
