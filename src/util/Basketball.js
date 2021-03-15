/* eslint-disable */
// 模拟比赛得分
const matches = [
  [50, 46], [60, 52], [75, 62], [88, 71], [95, 72], [107, 80],
  [46, 50], [52, 60], [62, 75], [71, 88], [72, 95], [80, 107],
  [40, 40], [60, 55], [96, 80], [120, 110], [150, 106],
]

const playWayFunc = {
  'bst-wl': computeWDL,
  'bst-wls': computeWDLS,
  'bst-score': computeScore,
  'bst-points': computePoints
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
        const { detail, spreadPoints, presetPoints } = grp
        const { wayCode } = detail
        const fn = playWayFunc[wayCode]
        return fn(grp, match, spreadPoints, presetPoints)
      }).filter(Boolean).reduce((acc, x) => acc * x, 1)
    }).reduce((acc, x) => acc + x, 0)

    if (minPrice === 0 || minPrice > price) {
      minPrice = price
    }

    maxPrice += price
  })

  return [minPrice, maxPrice]
}

// 胜平负
function computeWDL (part, match) {
  const [x, y] = match
  const { ruleCode, odds } = part.detail

  switch (ruleCode) {
    case 'bst-win':
      return x > y ? odds : 0
    default:
      return x < y ? odds : 0
  }
}

// 让球胜平负
function computeWDLS (part, match, rq) {
  const [x, y] = match
  const { ruleCode, odds } = part.detail

  switch (ruleCode) {
    case 'bst-sp-win':
      return x + rq > y ? odds : 0
    default:
      return x + rq < y ? odds : 0
  }
}

// 比分
function computeScore (part, match, rq, ys) {
  const [x, y] = match
  const { ruleCode, odds } = part.detail

  switch (ruleCode) {
    case 'bst-big':
      return x + y > ys ? odds : 0
    default:
      return x + y < ys ? odds : 0
  }
}

// 进球数
function computePoints (part, match) {
  const [x, y] = match
  const { ruleCode, odds } = part.detail

  switch (ruleCode) {
    case 'bst-w15':
      return x - y >= 1 && x - y <= 5 ? odds : 0
    case 'bst-w610':
      return x - y >= 6 && x - y <= 10 ? odds : 0
    case 'bst-w1115':
      return x - y >= 11 && x - y <= 15  ? odds : 0
    case 'bst-w1620':
      return x - y >= 16 && x - y <= 20 ? odds : 0
    case 'bst-w2125':
      return x - y >= 21 && x - y <= 25 ? odds : 0
    case 'bst-w99':
      return x - y >= 26 ? odds : 0
    case 'bst-l15':
      return y - x >= 1 && y - x <= 5 ? odds : 0
    case 'bst-l610':
      return y - x >= 6 && y - x <= 10 ? odds : 0
    case 'bst-l1115':
      return y - x >= 11 && y - x <= 15  ? odds : 0
    case 'bst-l1620':
      return y - x >= 16 && y - x <= 20 ? odds : 0
    case 'bst-l2125':
      return y - x >= 21 && y - x <= 25 ? odds : 0
    case 'bst-l99':
      return y - x >= 26 ? odds : 0
    default:
      return 0
  }
}
 
export default GetPrice
