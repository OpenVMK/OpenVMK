// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegPage1 / parseAvailableSets

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function parseAvailableSets(_me: LingoMe, _this: LingoValue) {
  if (callNamed("listp", meProp(_me, "m_ar_AvatarData"))) {
  var t_ar_availableSets1 = meProp(_me, "m_ar_AvatarData")["AvailableSets"][meProp(_me, "m_sSex")];
  var t_ar_availableSets = new LingoPropList([]);
  for (var i = 1; i <= t_ar_availableSets1.count; ++i) {
  var t_iSetID = t_ar_availableSets1[i];
  var t_mp_DataList = callMethod("getFigureSets", _this, t_iSetID);
  if ((lingoTruthy(callNamed("listp", t_mp_DataList)) ? 0 : 1)) {
  return;
  }

  if (callMethod("findPos", t_ar_availableSets, t_mp_DataList[1])) {
  callMethod("add", t_ar_availableSets[t_mp_DataList[1]], t_iSetID)
  continue;
  }

  t_ar_availableSets[t_mp_DataList[1]] = new LingoList([]);
  callMethod("add", t_ar_availableSets[t_mp_DataList[1]], t_iSetID)
  }

  setMeProp(_me, "m_ar_availableSets", t_ar_availableSets);
  if (lingoBinary("neq", callMethod("findPos", t_ar_availableSets, "ht"), undefined)) {
  callMethod("add", t_ar_availableSets["ht"], -float(1))
  }

  callMethod("ParseMyAvatar", _this, meProp(_me, "m_ar_AvatarData")["AvailableSets"][lingoBinary("join", "Default_", meProp(_me, "m_sSex"))])
  callMethod("CreateFigure", _this)
  } else {
  }

}

