/* eslint-disable */
import { descartes, combination } from './math'

/**
 * 依据投注列表，生成所有可能的排列组合
 * @param {*} noteList 投注列表
 * @param {*} passDict 过关字典
 */
export function GetAllParts (noteList, passDict) {
  // 转换过关字典
  // debugger
  const passArr = [
    passDict.level1,
    passDict.level2,
    passDict.level3,
    passDict.level4,
    passDict.level5,
    passDict.level6,
    passDict.level7,
    passDict.level8,
  ]

  // 整理数据
  // [a, b, c, d] => [[a], [b1, b2], [c1, c2], [d]] == [A, B, C, D]
  const noteArr = noteList.map(x => x.detailList.map(y => ({ ...x, detail: y })))

  // 从投注场次中, 选择过关场次组合
  // 比如投注4场比赛, 过关方式为3串4
  // [A, B, C, D] =>
  // [[A, B, C],
  //  [A, B, D],
  //  [A, C, D],
  //  [B, C, D]]
  const composeNote = combination(noteArr, passDict.unitNum)

  // 遍历场次组合方式
  // 比如3串4 是 3个2串1 + 1个3串1
  const noteParts = composeNote.map(noteGrp => {
      // 比如 3串4 = 3个2串1 + 1个3串1
      // [a, b, c] =>
      // [[a, b],
      //  [a, c],
      //  [b, c],
      //  [a, b, c]]
      return passArr.map((passNum, inx) => {
        // 当前关卡不需要场次
        if (!passNum) return undefined
        
        const requreNum = inx + 1
        return combination(noteGrp, requreNum)
      }).filter(Boolean).reduce((acc, grp) => ([...acc, ...grp]), [])
    })

  const allParts = noteParts.map(x => x.reduce((acc, note) => {
    // [A, B, C] =>
    //  [a, b1, c1],
    //  [a, b1, c2],
    //  [a, b2, c1],
    //  [a, b2, c2]
    const unpack = descartes(...note)
    return [
      ...acc,
      ...unpack
    ]
  }, []));

  const sum = allParts.reduce((s, x) => s + x.length, 0)
  return { sum, allParts }
}

export default GetAllParts
