// pq-system
//
// axiom schema: xp-qx- is an axiom, whenever x is composed of hyphens only
//
// rule of production:
//    suppose x, y, and z all stand for particular strings containing only hyphens.
//    and suppose that xpyqz is known to be a theorem. then xpy-qz- is a theorem.
//

function isAxiom (s) {
  if (s.length < 6) return false

  const [x, afterP] = s.split('p')
  const [y, z] = afterP.split('q')
  return (
    /^[-]+$/.test(x) &&
    y === '-' &&
    /^[-]+$/.test(z) &&
    z.length === x.length + y.length
  )
}

function producerOf (s) {
  const [x, afterP] = s.split('p')
  const [y, z] = afterP.split('q')
  return `${x}p${y.slice(0, -1)}q${z.slice(0, -1)}`
}

function isTheorem (s) {
  if (s.length < 6) return false

  return isAxiom(s) || isTheorem(producerOf(s))
}

console.log(
  isTheorem('-p-q--'),
  isTheorem('--p-q--'),
  isTheorem('-p--q--'),
  isTheorem('--p-q---'),
  isTheorem('--p--q----'),
)

