import { Prepare } from './prepare'
import { CommandBuilder } from 'yargs'

const command: {
  command: string
  describe?: string
  handler: (context: any, argv: any) => any
  builder?: CommandBuilder
} = {
  command: 'prepare',
  describe: 'Bundle schemas and generate bindings',

  builder: {
    output: {
      alias: 'o',
      describe: 'Output folder',
      type: 'string'
    },
    save: {
      alias: 's',
      describe: 'Save settings to config file',
      type: 'boolean',
      default: 'false'
    },
    bundle: {
      describe: 'Process schema imports',
      type: 'boolean',
      default: 'false'
    },
    bindings: {
      describe: 'Generate bindings',
      type: 'boolean',
      default: 'false'
    },
    generator: {
      alias: 'g',
      describe: 'Generator used to generate bindings',
      type: 'string'
    },
    verbose: {
      describe: 'Show verbose output messages',
      type: 'boolean',
      default: 'false'
    }
  },

  handler: async (context: any, argv) => {
    if (!argv.bundle && !argv.bindings) {
      argv.bundle = argv.bindings = true
    }

    const prepare = new Prepare(context, argv)
    await prepare.handle()
  }
}

export = command
