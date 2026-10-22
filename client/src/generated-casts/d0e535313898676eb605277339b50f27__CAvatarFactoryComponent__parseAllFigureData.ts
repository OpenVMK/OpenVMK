// d0e535313898676eb605277339b50f27.cct / CAvatarFactoryComponent / parseAllFigureData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function parseAllFigureData(_me: LingoMe) {
  var t_ar_FigureParts = callNamed("getVariableValue", "SetList");
  if (callNamed("listp", t_ar_FigureParts)) {
  callMethod("addProp", t_ar_FigureParts, "45100", new LingoList([new LingoList([90, 0, 0, 0]), new LingoList([1])]))
  callMethod("addProp", t_ar_FigureParts, "45101", new LingoList([new LingoList([92, 0, 0, 0]), new LingoList([1])]))
  callMethod("addProp", t_ar_FigureParts, "47100", new LingoList([new LingoList([90, 90]), new LingoList([1])]))
  callMethod("addProp", t_ar_FigureParts, "48100", new LingoList([new LingoList([0, 0]), new LingoList([1])]))
  }

  var t_ar_FigureParts2 = new LingoPropList([]);
  setMeProp(_me, "m_mp_ClothesPreviewImages", new LingoPropList([]));
  if (callNamed("listp", t_ar_FigureParts)) {
  for (var i = 1; i <= t_ar_FigureParts.count; ++i) {
  var t_iSetNum = callMethod("getPropAt", t_ar_FigureParts, i);
  switch (1) {
case lingoBinary("eq", t_iSetNum, -float(1)):
  var t_sSetName = "ht";
  var t_mp_SetMems = new LingoList(["ht"]);
  break;
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 20000), lingoBinary("lt", t_iSetNum, 21000)):
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 30000), lingoBinary("lt", t_iSetNum, 31000)):
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 40000), lingoBinary("lt", t_iSetNum, 41000)):
  t_sSetName = "hr";
  t_mp_SetMems = new LingoList(["hr"]);
  break;
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 21000), lingoBinary("lt", t_iSetNum, 22000)):
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 31000), lingoBinary("lt", t_iSetNum, 32000)):
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 41000), lingoBinary("lt", t_iSetNum, 42000)):
  t_sSetName = "ht";
  t_mp_SetMems = new LingoList(["ht"]);
  break;
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 22000), lingoBinary("lt", t_iSetNum, 24000)):
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 32000), lingoBinary("lt", t_iSetNum, 34000)):
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 42000), lingoBinary("lt", t_iSetNum, 44000)):
  t_sSetName = "hd";
  t_mp_SetMems = new LingoList(["tr", "ey", "fc", "hd", "lh", "rh", "llg", "rlg"]);
  break;
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 24000), lingoBinary("lt", t_iSetNum, 26000)):
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 34000), lingoBinary("lt", t_iSetNum, 36000)):
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 44000), lingoBinary("lt", t_iSetNum, 46000)):
  t_sSetName = "ch";
  t_mp_SetMems = new LingoList(["ch", "ch2", "ls", "rs"]);
  break;
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 26000), lingoBinary("lt", t_iSetNum, 28000)):
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 36000), lingoBinary("lt", t_iSetNum, 38000)):
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 46000), lingoBinary("lt", t_iSetNum, 48000)):
  t_sSetName = "pn";
  t_mp_SetMems = new LingoList(["lpn", "rpn"]);
  break;
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 28000), lingoBinary("lt", t_iSetNum, 30000)):
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 38000), lingoBinary("lt", t_iSetNum, 40000)):
case lingoBinary("gte", t_iSetNum, 48000):
  t_sSetName = "sh";
  t_mp_SetMems = new LingoList(["lsh", "rsh"]);
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  }

  var t_mp_setMembers = new LingoPropList([]);
  var t_ar_FigurePartIds = t_ar_FigureParts[i][1];
  for (var e = 1; e <= t_mp_SetMems.count; ++e) {
  if (lingoBinary("eq", t_mp_SetMems.count, t_ar_FigurePartIds.count)) {
  callMethod("addProp", t_mp_setMembers, t_mp_SetMems[e], t_ar_FigurePartIds[e])
  continue;
  }

  return callNamed("error", _me, lingoBinary("joinPad", "Wrong amount of members is set No: ", t_iSetNum), symbol("parseAllFigureData"));
  }

  var t_ar_ColorList = new LingoList([]);
  var t_ar_SetColors = callNamed("value", t_ar_FigureParts[i][2]);
  for (var f = 1; f <= t_ar_SetColors.count; ++f) {
  var t_iColorNum = t_ar_SetColors[f];
  if (lingoBinary("eq", t_iColorNum, 0)) {
  var t_mp_ColorList = new LingoList([0]);
  continue;
  }

  if (callNamed("voidp", callMethod("findPos", meProp(_me, "m_ar_FigureColorList"), callNamed("string", t_iColorNum)))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Nosuch ID in colour list: ", t_iColorNum), symbol("parseAllFigureData"));
  }

  // HAND-CORRECTED: `ColorList[string(id)]` is a KEY lookup — force it (the proxy
  // otherwise resolves in-range numeric strings positionally, wrong for the gappy
  // ColorList). Builds every set's colour list; positional was wrong for id>~180.
  // See avatar-colorlist-key-lookup.
  var t_sColor = callMethod("getaProp", meProp(_me, "m_ar_FigureColorList"), callNamed("string", t_iColorNum));
  callMethod("add", t_ar_ColorList, t_sColor)
  }

  if (lingoBinary("eq", callMethod("findPos", t_ar_FigureParts2, t_sSetName), 0)) {
  callMethod("addProp", t_ar_FigureParts2, t_sSetName, new LingoPropList([]))
  callMethod("addProp", t_ar_FigureParts2[t_sSetName], t_iSetNum, new LingoList([t_mp_setMembers]))
  callMethod("add", t_ar_FigureParts2[t_sSetName][t_iSetNum], t_ar_ColorList)
  continue;
  }

  callMethod("addProp", t_ar_FigureParts2[t_sSetName], t_iSetNum, new LingoList([t_mp_setMembers]))
  callMethod("add", t_ar_FigureParts2[t_sSetName][t_iSetNum], t_ar_ColorList)
  }

  if (callMethod("findPos", t_ar_FigureParts2, "ht")) {
  callMethod("addProp", t_ar_FigureParts2["ht"], -float(1), new LingoList([new LingoPropList(["ht", -float(1)]), new LingoList([-float(1)])]))
  }

  setMeProp(_me, "m_mp_AllSets", callMethod("duplicate", t_ar_FigureParts2));
  callNamed("createVariable", "AllAvailableSets", meProp(_me, "m_mp_AllSets"))
  } else {
  return callNamed("error", _me, "Figure list corrupted!!", symbol("parseAllFigureData"));
  }

}

