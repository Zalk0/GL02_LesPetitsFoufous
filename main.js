const Engine = require('./engine.js')
const Radio = require('./radio.js')
const Command = require('./command.js')
const Satellite1 = require('./satellite1.js')

Satellite1.check()
Command.check()
Radio.check()
Engine.check()