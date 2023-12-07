const fs = require('fs');
const colors = require('colors');
const cli = require('@caporal/core').default;

const CreneauParser = require('./utils/CreneauParser.js');

const findSalles = require('./commands/findSalles');
const capaciteMax = require("./commands/capaciteMax");
const visuVegalite = require("./commands/visuVegalite");
const quandLibreSalle = require("./commands/quandLibreSalle");
const quellesSallesLibres = require("./commands/quellesSallesLibres");

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
    .alias('fs')
    .action(({args, options, logger}) => {
        let parser = new CreneauParser();
        parser.parse(args.chemin);

        if (!parser.noErrors) {
            logger.info("The path contains error".red);
            return
        }

        let listeSalles = findSalles(parser.parsedCreneaux, args.cours);
        console.log(Array.from(listeSalles).join(", "));
    })

    // SPEC2
    .command('capacite-max', "Capacité max d'une salle")
    .argument('<chemin>', 'Chemin du fichier ou du dossier contenant les créneaux')
    .argument('<salle>', 'La salle à rechercher')
    .alias('cm')
    .action(({args, options, logger}) => {
        let parser = new CreneauParser();
        parser.parse(args.chemin);

        if (!parser.noErrors) {
            logger.info("The path contains error".red);
            return
        }

        let capacite = capaciteMax(parser.parsedCreneaux, args.salle);
        console.log(capacite);
    })

    // SPEC3
    .command('verify-emploidutemps', "Vérifier l'emploi du temps")
    //.argument('<fichier>', 'Le fichier à vérifier')
    .alias('ve')
    .action(({args, options, logger}) => {
        // TODO
        console.log(capacite);
    })

    // SPEC4
    // TODO patch bug quand les créneaux coupent la journée en 2
    .command('quand-libre-salle', 'Trouver les créneaux libres d\'une salle')
    .argument('<chemin>', 'Chemin du fichier ou du dossier contenant les créneaux')
    .argument('<salle>', 'La salle à rechercher')
    .action(({args, options, logger}) => {
        let parser = new CreneauParser();
        parser.parse(args.chemin);

        if (!parser.noErrors) {
            logger.info("The path contains error".red);
            return
        }

        let listeCreneaux = quandLibreSalle(parser.parsedCreneaux, args.salle);
        console.log(Array.from(listeCreneaux).join(", "));
    })

    //SPEC5
    .command('quelles-salles-libres', 'Trouver les salles libres pour un créneau donné')
    .argument('<chemin>', 'Chemin du fichier ou du dossier contenant les créneaux')
    .argument('<creneau>', 'Le créneau à rechercher (format : J_HH:MM-HH:MM ex: ME_10:00-12:00)')
    .action(({args, options, logger}) => {
        let parser = new CreneauParser();
        parser.parse(args.chemin);

        if (!parser.noErrors) {
            logger.info("The path contains error".red);
            return
        }

        //on vérifie que le créneau est bien au bon format ex: ME_10:00-12:00 ou J_10:00-12:00
        let regex = new RegExp("^(L|MA|ME|J|V|S)_[0-9]{2}:[0-9]{2}-[0-9]{2}:[0-9]{2}$");
        if (!regex.test(args.creneau)) {
            logger.info("The creneau is not at the right format".red);
            return
        }

        let listeSalles = Array.from(quellesSallesLibres(parser.parsedCreneaux, args.creneau)).join(", ");

        if (listeSalles === "") {
            listeSalles = "No room available";
        }
        console.log(listeSalles);

    })

    // SPEC6
    .command('ical', "Créer un fichier iCal avec l'edt de l'utilisateur")
    //.argument('<usager>', "La personne dont on veut l'emploi du temps") //
    .action(({args, options, logger}) => {
        // TODO
    })

    // SPEC7
    .command('visualisation', "...") // TODO
    .argument('<chemin>', 'Chemin du fichier ou du dossier contenant les créneaux')
    .argument('<ordre>', 'Ordre croissant (c) ou décroissant (d)')
    .alias('cm')
    .action(({args, options, logger}) => {
        let parser = new CreneauParser();
        parser.parse(args.chemin);

        if (!parser.noErrors) {
            logger.info("The path contains error".red);
            return
        }

        let capacite = visuVegalite(parser.parsedCreneaux, args.ordre);
        //console.log(capacite);
    })


cli.run(process.argv.slice(2));
