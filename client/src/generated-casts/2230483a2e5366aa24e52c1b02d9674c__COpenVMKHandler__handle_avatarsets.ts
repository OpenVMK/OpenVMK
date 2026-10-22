// 2230483a2e5366aa24e52c1b02d9674c.cct / COpenVMKHandler / handle_avatarsets

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function handle_avatarsets(_me: LingoMe, tMsg: LingoValue) {
  /* global */ var g_rCore = globalVar("g_rCore");
  if (lingoBinary("and", (lingoTruthy(callMethod("GET", globalVar("g_rCore"), symbol("AvatarFactory_handler")).m_bAvailableSetsReady) ? 0 : 1), (lingoTruthy(callNamed("voidp", tMsg)) ? 0 : 1))) {
  var t_iLength = callMethod("GetIntFrom", tMsg.connection);
  var t_ar_iSetList = new LingoList([]);
  for (var i = 1; i <= t_iLength; ++i) {
  callMethod("add", t_ar_iSetList, callMethod("GetIntFrom", tMsg.connection))
  }

  }

  callMethod("sort", t_ar_iSetList)
  if (lingoBinary("gt", t_ar_iSetList.count, 0)) {
  setThePropOf(callMethod("GET", globalVar("g_rCore"), symbol("AvatarFactory_handler")), "m_bAvailableSetsReady", 1);
  if (callNamed("objectExists", "AvatarBuilderClothesLoader")) {
  var t_Obj = callNamed("getObject", "AvatarBuilderClothesLoader");
  } else {
  t_Obj = callNamed("createObject", "AvatarBuilderClothesLoader", "CAvatarClothesLoader");
  setTheProperty("trace", 1);
  callMethod("DefineAvailableSets", t_Obj, t_ar_iSetList)
  setTheProperty("trace", 0);
  setThePropOf(callMethod("GET", globalVar("g_rCore"), symbol("AvatarFactory_handler")), "m_ar_ParsedAvailbleSets", t_ar_iSetList);
  setThePropOf(callMethod("GET", globalVar("g_rCore"), symbol("AvatarFactory_handler")), "m_mp_Test", t_ar_iSetList);
  }

  }

}

