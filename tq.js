// tq-system
//
// axiom schema: xt-qx is an axiom, whenever x is composed of hyphens only
//
// rule of inference:
//    suppose x, y, and z all stand for particular strings containing only hyphens.
//    and suppose that xtyqz is known to be a theorem. then xty-qzx is a theorem.
//

function isAxiom (s) {
  if (s.length < 5) return false

  const [x, afterT] = s.split('t')
  const [y, z] = afterT.split('q')
  return (
    /^[-]+$/.test(x) &&
    y === '-' &&
    /^[-]+$/.test(z) &&
    z.length === x.length
  )
}

function producerOf (s) {
  const [x, afterT] = s.split('t')
  const [y, z] = afterT.split('q')
  return `${x}t${y.slice(0, -1)}q${z.slice(0, z.length - x.length)}`
}

function isTheorem (s) {
  if (s.length < 5) return false

  return isAxiom(s) || isTheorem(producerOf(s))
}

console.log(
  isTheorem('-t-q-'),
  isTheorem('--t-q--'),
  isTheorem('--t--q--'),
  isTheorem('-t--q--'),
  isTheorem('--t---q---'),
  isTheorem('--t--q----'),
  isTheorem('--t---q------'),
)

