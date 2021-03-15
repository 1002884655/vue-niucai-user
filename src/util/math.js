/* eslint-disable */
// 笛卡尔积
export function descartes(...args) {
  if (args.length < 2) return args

  if (args.length === 2) {
    const [a, b] = args
    return a.map(x => ([x, b])).reduce((acc, x) => {
      const [i, j] = x
      return [
        ...acc,
        ...(j.map(y => ([i, y])))
      ]
    }, [])
  } else {
    const [a, ...b] = args
    const tmp = descartes(...b)
    return descartes(a, tmp).map(([a, b]) => ([a, ...b]))
  }
}

/**
 * 组合 : 从 list 中选择 len 长度的组合方案
 * @param {*} list 
 * @param {*} len 
 */
export function combination(list, len) {
  if (!list || !list.length) {
    return []
  }

  if (!len || list.length < len) {
    return []
  }

  const recursion = (arr, index) => {
    // 循环次数 = list 长度 - 剩余需要组装的长度
    const times = list.length - (len - arr.length) + 1

    let res = []
    for (let i = index; i < times; i ++) {
      const current = [...arr, list[i]]

      if (current.length < len) {
        res = res.concat(recursion(current, i + 1))
      } else {
        res.push(current)
      }
    }

    return res
  }

  return recursion([], 0)
}
