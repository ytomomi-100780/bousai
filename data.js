const stockItems = [
  // 水・食料
  { id:  1, name: "飲料水",             category: "水・食料", calcType: "per_person_per_day", value: 1,  unit: "L" },
  { id:  2, name: "非常食",             category: "水・食料", calcType: "per_person_per_day", value: 3,  unit: "食" },
  { id:  3, name: "カセットガス",       category: "水・食料", calcType: "fixed",              value: 3,  unit: "本" },

  // 衛生用品
  { id:  4, name: "簡易トイレ",         category: "衛生用品", calcType: "per_person_per_day", value: 5,  unit: "回分" },
  { id:  5, name: "ウェットティッシュ", category: "衛生用品", calcType: "per_person",         value: 2,  unit: "パック" },
  { id:  6, name: "マスク",             category: "衛生用品", calcType: "per_person",         value: 10, unit: "枚" },
  { id:  7, name: "消毒液",             category: "衛生用品", calcType: "fixed",              value: 1,  unit: "本" },

  // 防災用具
  { id:  8, name: "懐中電灯",           category: "防災用具", calcType: "fixed",              value: 1,  unit: "個" },
  { id:  9, name: "携帯ラジオ",         category: "防災用具", calcType: "fixed",              value: 1,  unit: "台" },
  { id: 10, name: "乾電池（単3）",      category: "防災用具", calcType: "fixed",              value: 12, unit: "本" },
  { id: 11, name: "モバイルバッテリー", category: "防災用具", calcType: "per_person",         value: 1,  unit: "個" },
  { id: 12, name: "救急セット",         category: "防災用具", calcType: "fixed",              value: 1,  unit: "式" },

  // 生活用品
  { id: 13, name: "毛布",               category: "生活用品", calcType: "per_person",         value: 1,  unit: "枚" },
  { id: 14, name: "軍手",               category: "生活用品", calcType: "per_person",         value: 1,  unit: "双" },
  { id: 15, name: "雨具（ポンチョ等）", category: "生活用品", calcType: "per_person",         value: 1,  unit: "着" },
  { id: 16, name: "ゴミ袋",             category: "生活用品", calcType: "fixed",              value: 10, unit: "枚" },
  { id: 17, name: "ラップ",             category: "生活用品", calcType: "fixed",              value: 1,  unit: "本" },

  // こどものための備え
  { id: 18, name: "粉ミルク・液体ミルク", category: "こどものための備え", calcType: "fixed",   value: 1, unit: "缶",  conditions: ["child"] },
  { id: 19, name: "おむつ",               category: "こどものための備え", calcType: "per_day", value: 8, unit: "枚",  conditions: ["child"] },
  { id: 20, name: "離乳食・子ども用食品", category: "こどものための備え", calcType: "per_day", value: 3, unit: "食",  conditions: ["child"] },

  // 女性の備え
  { id: 21, name: "生理用品",           category: "女性の備え", calcType: "fixed", value: 1, unit: "セット", conditions: ["female"] },
  { id: 22, name: "サニタリーショーツ", category: "女性の備え", calcType: "fixed", value: 2, unit: "枚",    conditions: ["female"] },

  // 高齢者のための備え
  { id: 23, name: "介護食",           category: "高齢者のための備え", calcType: "per_day", value: 3, unit: "食", conditions: ["elderly"] },
  { id: 24, name: "常備薬・お薬手帳", category: "高齢者のための備え", calcType: "fixed",   value: 1, unit: "式", conditions: ["elderly"] },
  { id: 25, name: "大人用おむつ",     category: "高齢者のための備え", calcType: "per_day", value: 4, unit: "枚", conditions: ["elderly"] },
];
