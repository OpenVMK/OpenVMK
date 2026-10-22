// d0e535313898676eb605277339b50f27.cct / CAvatarFactoryHandler / getAvailableSets

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getAvailableSets(_me: LingoMe, tMsg: LingoValue) {
  if (lingoBinary("and", (lingoTruthy(meProp(_me, "m_bAvailableSetsReady")) ? 0 : 1), (lingoTruthy(callNamed("voidp", tMsg)) ? 0 : 1))) {
  var t_iLength = callMethod("GetIntFrom", tMsg.connection);
  var t_ar_iSetList = new LingoList([]);
  for (var i = 1; i <= t_iLength; ++i) {
  callMethod("add", t_ar_iSetList, callMethod("GetIntFrom", tMsg.connection))
  }

  callMethod("sort", t_ar_iSetList)
  if (lingoBinary("gt", t_ar_iSetList.count, 0)) {
  setMeProp(_me, "m_bAvailableSetsReady", 1);
  if (callNamed("objectExists", "AvatarBuilderClothesLoader")) {
  var t_Obj = callNamed("getObject", "AvatarBuilderClothesLoader");
  } else {
  t_Obj = callNamed("createObject", "AvatarBuilderClothesLoader", "CAvatarClothesLoader");
  }

  callMethod("DefineAvailableSets", t_Obj, t_ar_iSetList)
  var m_ar_ParsedAvailbleSets = t_ar_iSetList;
  setMeProp(_me, "m_mp_Test", t_ar_iSetList);
  }

  }

}

