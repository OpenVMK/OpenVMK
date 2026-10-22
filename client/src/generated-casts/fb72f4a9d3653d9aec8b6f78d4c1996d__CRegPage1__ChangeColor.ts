// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegPage1 / ChangeColor

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ChangeColor(_me: LingoMe, _this: LingoValue, a_iPartName: LingoValue, a_iDirection: LingoValue) {
  var t_iCurrentSet = callNamed("value", meProp(_me, "m_ar_PropsToServer")[a_iPartName]["SetID"]);
  var t_iCurrentCol = meProp(_me, "m_ar_PropsToServer")[a_iPartName]["Color"];
  if ((lingoTruthy(callNamed("voidp", t_iCurrentSet)) ? 0 : 1)) {
  var t_mpMySet = meProp(_me, "m_mp_AllSets")[a_iPartName][callNamed("string", t_iCurrentSet)];
  var t_arColorList = t_mpMySet[2];
  var t_iMyPos = callMethod("findPos", t_arColorList, t_iCurrentCol);
  var t_iSetCount = t_arColorList.count;
  var t_iNewPos = lingoBinary("add", t_iMyPos, a_iDirection);
  switch (1) {
case lingoBinary("lte", t_iNewPos, 0):
  var t_iNewColor = t_arColorList[t_arColorList.count];
  break;
case lingoBinary("gt", t_iNewPos, t_iSetCount):
  t_iNewColor = t_arColorList[1];
  break;
  default:
  t_iNewColor = t_arColorList[t_iNewPos];
  }

  }

  for (var i = 1; i <= t_mpMySet[1].count; ++i) {
  callMethod("setPartColor", _this, callMethod("getPropAt", t_mpMySet[1], i), t_iNewColor)
  }

  meProp(_me, "m_ar_PropsToServer")[a_iPartName]["Color"] = t_iNewColor;
  if (lingoBinary("eq", a_iPartName, "hr")) {
  setMeProp(_me, "m_CurrentHairCol", t_iNewColor);
  }

  if (lingoBinary("eq", a_iPartName, "hd")) {
  setMeProp(_me, "m_CurrentSkinCol", t_iNewColor);
  }

  callMethod("updateFigurePreview", _this)
  callMethod("updateAllPrewIcons", _this)
  return 1;
}

