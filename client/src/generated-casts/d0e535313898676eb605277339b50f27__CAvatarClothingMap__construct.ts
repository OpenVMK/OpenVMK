// d0e535313898676eb605277339b50f27.cct / CAvatarClothingMap / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  if (callNamed("variableExists", "CastList")) {
  var t_mp_sSet_ar_sCasts = callNamed("getVariableValue", "CastList");
  var t_sFilePath = callNamed("getVariable", "clothes_filepath", "vmk_clothes/vmk_avatar_");
  if (callNamed("listp", t_mp_sSet_ar_sCasts)) {
  setMeProp(_me, "m_mp_sSet_ar_sCasts", new LingoPropList([]));
  for (var i = 1; i <= t_mp_sSet_ar_sCasts.count; ++i) {
  var t_ar_data = t_mp_sSet_ar_sCasts[i];
  var t_sID = callMethod("getPropAt", t_mp_sSet_ar_sCasts, i);
  var t_ar_AlteredData = new LingoList([]);
  for (var e = 1; e <= t_ar_data.count; ++e) {
  callMethod("add", t_ar_AlteredData, lingoBinary("join", t_sFilePath, t_ar_data[e]))
  }

  callMethod("addProp", meProp(_me, "m_mp_sSet_ar_sCasts"), t_sID, t_ar_AlteredData)
  }

  }

  } else {
  setMeProp(_me, "m_mp_sSet_ar_sCasts", new LingoPropList([]));
  callNamed("error", _this, "Cloth asset cast index not found!", symbol("construct"))
  }

}

