// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogClothesView / ShowLoginLoadingScreen

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowLoginLoadingScreen(_me: LingoMe, _this: LingoValue) {
  if ((lingoTruthy(callNamed("objectp", meProp(_me, "m_objLoadingWindow"))) ? 0 : 1)) {
  var t_sHdTxt = callNamed("getText", "settings.clothes.loading.hd");
  setMeProp(_me, "m_objLoadingWindow", callNamed("createObject", callNamed("getUniqueID"), "CLoadingWindow"));
  var t_mp_data = new LingoPropList([symbol("headline"), t_sHdTxt, symbol("showbutton"), 0, symbol("client"), callMethod("getID", _this), symbol("modal"), 1]);
  if (callNamed("objectp", meProp(_me, "m_objLoadingWindow"))) {
  callMethod("DefineWindow", meProp(_me, "m_objLoadingWindow"), t_mp_data)
  }

  }

}

