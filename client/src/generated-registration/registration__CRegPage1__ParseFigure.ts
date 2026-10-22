// registration.cct / CRegPage1 / ParseFigure

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ParseFigure(_me: LingoMe, _this: LingoValue, tMsg: LingoValue) {
  var t_ar_SetList = tMsg;
  if (lingoBinary("gt", t_ar_SetList.count, 0)) {
  var t_mp_MyFigure = new LingoPropList([]);
  for (var i = 1; i <= t_ar_SetList.count; ++i) {
  if (lingoBinary("mod", i, 2)) {
  if (lingoBinary("neq", t_ar_SetList[i], -float(1))) {
  var t_s_PartNum = callNamed("string", t_ar_SetList[i]);
  var t_ar_PartData = callMethod("getFigureSets", _this, t_s_PartNum);
  var t_s_PartName = t_ar_PartData[1];
  var t_sSex = t_ar_PartData[3];
  var t_mp_partMems = meProp(_me, "m_mp_AllSets")[t_s_PartName][t_s_PartNum][1];
  t_mp_MyFigure[t_s_PartName] = new LingoPropList([]);
  t_mp_MyFigure[t_s_PartName]["SetID"] = t_s_PartNum;
  t_mp_MyFigure[t_s_PartName]["Figure"] = t_mp_partMems;
  } else {
  t_mp_MyFigure["ht"] = new LingoPropList([]);
  t_mp_MyFigure["ht"]["SetID"] = -float(1);
  t_mp_MyFigure["ht"]["Figure"] = new LingoPropList(["ht", -float(1)]);
  }

  continue;
  }

  if (lingoBinary("neq", t_ar_SetList[i], -float(1))) {
  t_mp_MyFigure[t_s_PartName]["Color"] = meProp(_me, "m_ar_FigureColorList")[callNamed("string", t_ar_SetList[i])];
  continue;
  }

  t_mp_MyFigure["ht"]["Color"] = -float(1);
  }

  return t_mp_MyFigure;
  } else {
  return callNamed("error", _this, lingoBinary("joinPad", "Wrong kind of figure data: ", t_ar_SetList), symbol("ParseMyFigure"));
  }

}

