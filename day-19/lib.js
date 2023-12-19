import { doNothing, fail, hasValue } from '@abw/badger-utils'

const comparators = {
  '>': (cat, val, then) => state => state[cat] > val ? then : null,
  '<': (cat, val, then) => state => state[cat] < val ? then : null,
  always: then => () => then
}

export function parseWorkflows(text) {
  return text
    .split(/\n/)
    .map(parseWorkflow)
    .reduce(
      (workflows, [name, rules]) => ({
        ...workflows,
        [name]: rules,
      }),
      { }
    )
}

export function parseWorkflow(text) {
  const [, name, workflow] = text.match(/(.*?)\{(.*?)\}/)
    || fail(`Cannot parse workflow: ${text}`)
  const parts = workflow.split(',')
  const deflt = parts.pop()
  const rules = [
    ...parts.map(parseRuleComparator),
    comparators.always(deflt)
  ]
  return [name, rules]
}

export function parseRule(rule) {
  const [cond, then] = rule.split(':')
  const [, cat, cmp, valstr] = cond.match(/^([xmas])([<>])(-?\d+)/)
    || fail(`Cannot parse condition: ${cond}`)
  const value = parseInt(valstr)
  return { cat, cmp, value, then }
}

export function parseRuleComparator(rule) {
  const { cat, cmp, value, then } = parseRule(rule)
  return comparators[cmp](cat, value, then)
}

export function parseStates(text) {
  return text.split(/\n/).map(parseState)
}

export function parseState(text) {
  const cats = [ ...text.matchAll(/([xmas])=(-?\d+)/g) ]
    .reduce(
      (state, [ , cat, valstr]) => ({ ...state, [cat]: parseInt(valstr) }),
      { }
    )
  return cats
}

export function runWorkflow(workflow, state) {
  for (let rule of workflow) {
    const result = rule(state)
    if (hasValue(result)) {
      return result
    }
  }
  fail(`This should never happen - no rule matched`)
}

export function acceptState(workflows, state, debugData=doNothing) {
  let wf = 'in'
  debugData(`checking state: `, state)

  for (;;) {
    debugData(`  - `, wf)
    const workflow = workflows[wf]
      || fail(`Cannot find workflow: ${wf}`)
    wf = runWorkflow(workflow, state)
    if (wf === 'A') {
      return state
    }
    if (wf === 'R') {
      return null
    }
  }
}

