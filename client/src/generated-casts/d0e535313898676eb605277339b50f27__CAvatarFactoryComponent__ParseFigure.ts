// d0e535313898676eb605277339b50f27.cct / CAvatarFactoryComponent / ParseFigure

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ParseFigure(_me: LingoMe, tMsg: LingoValue) {
  var t_ar_SetList = tMsg;
  if (lingoBinary("gt", t_ar_SetList.count, 0)) {
  var t_mp_MyFigure = new LingoPropList([]);
  for (var i = 1; i <= t_ar_SetList.count; ++i) {
  if (lingoBinary("mod", i, 2)) {
  var t_s_PartNum = callNamed("string", t_ar_SetList[i]);
  if (lingoBinary("neq", t_ar_SetList[i], -float(1))) {
  var t_ar_PartData = callMethod("getFigureSets", _me, t_s_PartNum);
  var t_s_PartName = t_ar_PartData[1];
  var t_mp_partMems = meProp(_me, "m_mp_AllSets")[t_s_PartName][t_s_PartNum][1];
  t_mp_MyFigure[t_s_PartName] = new LingoPropList([]);
  t_mp_MyFigure[t_s_PartName]["SetID"] = t_s_PartNum;
  t_mp_MyFigure[t_s_PartName]["Figure"] = t_mp_partMems;
  } else {
  t_mp_MyFigure["ht"] = new LingoPropList([]);
  t_mp_MyFigure["ht"]["SetID"] = t_s_PartNum;
  t_mp_MyFigure["ht"]["Figure"] = new LingoPropList(["ht", -float(1)]);
  }

  continue;
  }

  if (lingoBinary("neq", t_ar_SetList[i], -float(1))) {
  // HAND-CORRECTED: `ColorList[string(id)]` is a Lingo KEY lookup, but the
  // emitter renders it as an ambiguous bracket that the container proxy resolves
  // POSITIONALLY for in-range numeric strings. ColorList has gaps (201 entries,
  // ids 1..204), so id 181 (=RED "E10000") was read as position 181 (a gray) —
  // the black mickey-ears bug. Force the key lookup. See avatar-colorlist-key-lookup.
  t_mp_MyFigure[t_s_PartName]["Color"] = callMethod("getaProp", meProp(_me, "m_ar_FigureColorList"), callNamed("string", t_ar_SetList[i]));
  continue;
  }

  t_mp_MyFigure["ht"]["Color"] = "EEEEEE";
  }

  return t_mp_MyFigure;
  } else {
  return callNamed("error", _me, lingoBinary("joinPad", "Wrong kind of figure data: ", t_ar_SetList), symbol("ParseMyFigure"));
  }

}

