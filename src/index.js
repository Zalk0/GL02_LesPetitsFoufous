const fs = require('fs');
const colors = require('colors');
//const DataParser = require('./utils/DataParser.js');
const findSalles = require('./commands/findSalles');
const capaciteMax = require("./commands/capaciteMax");


const cli = require("@caporal/core").default;

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
            logger.info(data);
        });
    })


    // SPEC1
    .command('find-salles', 'Trouver les salles associées à un cours')
    .argument('<cours>', 'Le cours à rechercher')
    .action(({args, options, logger}) => {
        findSalles(args.cours);
    })

    // SPEC2
    .command('capacite-max', 'Capacité max d\'une salle')
    .argument('<salle>', 'La salle à rechercher')
    .action(({args, options, logger}) => {
        capaciteMax(args.salle);
    })

    // SPEC3
    .command('verify-emploidutemps', 'Vérifier l\'emploi du temps')
    //.argument('<fichier>', 'Le fichier à vérifier')
    .action(({args, options, logger}) => {
        // TODO
    })


cli.run(process.argv.slice(2));
