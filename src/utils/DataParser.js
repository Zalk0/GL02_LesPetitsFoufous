const fs = require('fs');
const path = require('path');

function parseData(data) {
    const lines = data.split("\n");
    const creneau = {};

    let currentCourse = "";
    let parsingStarted = false; // Flag to indicate if parsing has started

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith("Page")) {
            break;
        }
        if (line.startsWith("+") && line !== "+UVUV") {
            currentCourse = line.substring(1);
            creneau[currentCourse] = [];
            parsingStarted = true; // Set parsingStarted flag to true
        } else if (parsingStarted && line !== "") { // Check if parsing has started and line is not empty
            const values = line.split(",");
            const type = values[1];
            const capacitaire = values[2].split("=")[1];
            const horaire = values[3].split("=")[1];
            const indexSousGroupe = values[4];
            const salle = values[5].split("=")[1].replace("//", "");

            const creneauInfo = {
                type,
                capacitaire,
                horaire,
                indexSousGroupe,
                salle,
            };

            creneau[currentCourse].push(creneauInfo);
        }
    }

    return creneau;
}

/*const data = `+MC01
1,C1,P=24,H=J 10:00-12:00,F1,S=P202//
1,T1,P=24,H=J 13:00-16:00,F2,S=EXT1//
+ME01
1,C1,P=48,H=MA 8:00-12:00,F1,S=C104//
1,D1,P=48,H=ME 8:00-12:00,F1,S=C102//
+ME02
1,C1,P=38,H=V 8:00-12:00,F1,S=B101//
1,D1,P=38,H=V 12:00-16:00,F1,S=B101//
1,T1,P=38,H=V 16:00-20:00,F1,S=B101//
+ME05
1,C1,P=62,H=ME 12:00-16:00,F1,S=B101//
1,D1,P=64,H=ME 16:00-20:00,F1,S=B101//`;*/

const sujetADataPath = path.join(__dirname, './../../SujetA_data');


function processFile(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return parseData(fileContent);
}

function processFolder(folderPath) {
    const files = fs.readdirSync(folderPath);
    let creneau = {};
    for (const file of files) {
        const filePath = path.join(folderPath, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            let obj = processFolder(filePath);
            creneau = {...creneau, ...obj};
        } else {
            let obj = processFile(filePath);
            creneau = {...creneau, ...obj};
        }
    }
    return creneau;
}

module.exports = processFolder(sujetADataPath);
