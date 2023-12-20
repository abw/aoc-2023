import { fail } from '@abw/badger-utils'

export function parseInput(lines) {
  return lines.map(parseLine)
}

export function parseLine(line) {
  const [input, output] = line.split(' -> ')
  const outputs = output.split(', ')
  const [, type, name] = input.match(/(\W?)(\w+)/)
    || fail(`Cannot parse input: ${input}`)
  return { name, type, outputs }
}

export function allInputsHigh(module) {
  return Object.values(module.inputs).every( v => v === 1 )
}

export const moduleTypes = {
  '%': (module, state) => p => {
    // high pulses are ignore
    if (p) return
    module.state = module.state ? 0 : 1
    state.signals.push(
      ...module.outputs.map(
        dest => [module.name, dest, module.state]
      )
    )
  },
  '&': (module, state) => (p, from) => {
    module.inputs[from] = p
    const send = allInputsHigh(module) ? 0 : 1
    state.signals.push(
      ...module.outputs.map(
        dest => [module.name, dest, send]
      )
    )
  },
  '': (module, state) => p => {
    state.signals.push(
      ...module.outputs.map(
        dest => [module.name, dest, p]
      )
    )
  },
}

export function prepareModuleState(data) {
  const state = {
    signals: [ ],
    low: 0,
    high: 0
  }

  const modules = data.reduce(
    (modules, { name, type, outputs }) => {
      modules[name] = { name, type, outputs, inputs: { } }
      const pulser = moduleTypes[type] || fail(`Invalid module type: ${type}`)
      modules[name].pulse = pulser(modules[name], state)
      return modules
    },
    { }
  )

  // special case for the receiver module
  modules.rx = {
    inputs: { },
    pulse: () => state.rxPulsed = true
  }

  data.forEach(
    ({ name, outputs }) => {
      outputs.forEach(
        output => {
          modules[output].inputs[name] = 0
        }
      )
    }
  )

  return { modules, state }
}