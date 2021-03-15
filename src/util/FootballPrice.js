/* eslint-disable */
// 模拟比赛得分
const matches = [
  [1, 0], [2, 0], [2, 1], [3, 0], [3, 1], [3, 2], [4, 0], [4, 1], [4, 2], [5, 0], [5, 1], [5, 2], [99, 0],
  [0, 0], [1, 1], [2, 2], [3, 3], [99, 99],
  [0, 1], [0, 2], [1, 2], [0, 3], [1, 3], [2, 3], [0, 4], [1, 4], [2, 4], [0, 5], [1, 5], [2, 5], [0, 99]
]

const playWayFunc = {
  'ft-wdl': computeWDL,
  'ft-wdls': computeWDLS,
  'ft-score': computeScore,
  'ft-points': computePoints,
  'ft-double': computeDouble
}

// 遍历模拟比赛获取最大, 最小奖金
export function GetPrice (allParts) {
  let minPrice
  let maxPrice

  // 遍历模拟比赛的各种可能
  matches.forEach(match => {
    const [min, max] = GetMinAndMax(allParts, match)
    if (min < minPrice || minPrice === undefined) {
      minPrice = min
    }

    if (max > maxPrice || maxPrice === undefined) {
      maxPrice = max
    }
  })

  return [minPrice, maxPrice]
}

function GetMinAndMax (allParts, match) {
  let minPrice = 0
  let maxPrice = 0

  // 所有组合
  allParts.forEach(parts => {
    // 每种组合 比如 3串4 是 3个2串1, 1个3串1
    const price = parts.map(part => {
      // 场次组合 比如 2串1
      return part.map(grp => {
        const { detail, spreadPoints } = grp
        const { wayCode } = detail
        const fn = playWayFunc[wayCode]
        return fn(grp, match, spreadPoints)
      }).filter(Boolean).reduce((acc, x) => acc * x, 1)
    }).reduce((acc, x) => acc + x, 0)

    if (minPrice === 0 || minPrice > price) {
      minPrice = price
    }

    maxPrice += maxPrice
  })

  return [minPrice, maxPrice]
}

// 胜平负
function computeWDL (part, match, rq) {
  const [x, y] = match
  const { ruleCode, odds } = part.detail

  switch (ruleCode) {
    case 'ft-win':
      return x > y ? odds : 0
    case 'ft-dead':
      return x === y ? odds : 0
    default:
      return x < y ? odds : 0
  }
}

// 让球胜平负
function computeWDLS (part, match, rq) {
  const [x, y] = match
  const { ruleCode, odds } = part.detail

  switch (ruleCode) {
    case 'ft-sp-win':
      return x + rq > y ? odds : 0
    case 'ft-sp-dead':
      return x + rq === y ? odds : 0
    default:
      return x + rq < y ? odds : 0
  }
}

// 比分
function computeScore (part, match, rq) {
  const [x, y] = match
  const { ruleCode, odds } = part.detail

  switch (ruleCode) {
    case 'ft-w10':
      return x === 1 && y === 0 ? odds : 0
    case 'ft-w20':
      return x === 2 && y === 0 ? odds : 0
    case 'ft-w21':
      return x === 2 && y === 1 ? odds : 0
    case 'ft-w30':
      return x === 3 && y === 0 ? odds : 0
    case 'ft-w31':
      return x === 3 && y === 1 ? odds : 0
    case 'ft-w32':
      return x === 3 && y === 2 ? odds : 0
    case 'ft-w40':
      return x === 4 && y === 0 ? odds : 0
    case 'ft-w41':
      return x === 4 && y === 1 ? odds : 0
    case 'ft-w42':
      return x === 4 && y === 2 ? odds : 0
    case 'ft-w50':
      return x === 5 && y === 0 ? odds : 0
    case 'ft-w51':
      return x === 5 && y === 1 ? odds : 0
    case 'ft-w52':
      return x === 5 && y === 2 ? odds : 0
    case 'ft-w99':
      return x > 5 && x > y ? odds : 0
    case 'ft-d00':
      return x === 0 && x === y ? odds : 0
    case 'ft-d11':
      return x === 1 && x === y ? odds : 0
    case 'ft-d22':
      return x === 2 && x === y ? odds : 0
    case 'ft-d33':
      return x === 3 && x === y ? odds : 0
    case 'ft-d99':
      return x > 5 && x === y ? odds : 0
    case 'ft-l01':
      return x === 0 && y === 1 ? odds : 0
    case 'ft-l02':
      return x === 0 && y === 2 ? odds : 0
    case 'ft-l12':
      return x === 1 && y === 2 ? odds : 0
    case 'ft-l03':
      return x === 0 && y === 3 ? odds : 0
    case 'ft-l13':
      return x === 1 && y === 3 ? odds : 0
    case 'ft-l23':
      return x === 2 && y === 3 ? odds : 0
    case 'ft-l04':
      return x === 0 && y === 4 ? odds : 0
    case 'ft-l14':
      return x === 1 && y === 4 ? odds : 0
    case 'ft-l24':
      return x === 2 && y === 4 ? odds : 0
    case 'ft-l05':
      return x === 0 && y === 5 ? odds : 0
    case 'ft-l15':
      return x === 1 && y === 5 ? odds : 0
    case 'ft-l25':
      return x === 2 && y === 5 ? odds : 0
    default:
      return x < y && y > 5 ? odds : 0
  }
}

// 进球数
function computePoints (part, match, rq) {
  const [x, y] = match
  const { ruleCode, odds } = part.detail

  switch (ruleCode) {
    case 'ft-p0':
      return x === 0 && y === 0 ? odds : 0
    case 'ft-p1':
      return x + y === 1 ? odds : 0
    case 'ft-p2':
      return x + y === 2 ? odds : 0
    case 'ft-p3':
      return x + y === 3 ? odds : 0
    case 'ft-p4':
      return x + y === 4 ? odds : 0
    case 'ft-p5':
      return x + y === 5 ? odds : 0
    case 'ft-p6':
      return x + y === 6 ? odds : 0
    default:
      return x + y > 6 ? odds : 0
  }
}

// 半全场
function computeDouble (part, match, rq) {
  const [x, y] = match
  const { ruleCode, odds } = part.detail

  switch (ruleCode) {
    case 'ft-ww':
    case 'ft-dw':
    case 'ft-lw':
      return x > y ? odds : 0
    case 'ft-wd':
    case 'ft-dd':
    case 'ft-ld':
      return x === y ? odds : 0
    default:
      return x < y ? odds : 0
  }
}
 export default GetPrice
