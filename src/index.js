const fs = require('fs');
const colors = require('colors');
const cli = require("@caporal/core").default;

const CreneauParser = require('./utils/CreneauParser.js');

const findSalles = require('./commands/findSalles');
const capaciteMax = require("./commands/capaciteMax");

cli
    .version('lespetitsfoufous-sujet-a')
    .version('1.0.0')

    // readme
    .command('readme', 'Display the README.txt file')
    .alias('read')
    .action(({args, options, logger}) => {
        fs.readFile('./README.md', 'utf8', function (err, data) {
            if (err) {
                return logger.warn(err);
            }
            console.log(data);
        });
    })


    // SPEC1
    .command('find-salles', 'Trouver les salles associées à un cours')
    .argument('<chemin>', 'Chemin du fichier ou du dossier contenant les créneaux')
    .argument('<cours>', 'Le cours à rechercher')
    .action(({args, options, logger}) => {
        findSalles(args.cours, args.file);
    })

    // SPEC2
    .command('capacite-max', 'Capacité max d\'une salle')
    .argument('<chemin>', 'Chemin du fichier ou du dossier contenant les créneaux')
    .argument('<salle>', 'La salle à rechercher')
    .action(({args, options, logger}) => {
        capaciteMax(args.salle, args.file);
    })

    // SPEC3
    .command('verify-emploidutemps', 'Vérifier l\'emploi du temps')
    //.argument('<fichier>', 'Le fichier à vérifier')
    .action(({args, options, logger}) => {
        // TODO
    })


cli.run(process.argv.slice(2));
