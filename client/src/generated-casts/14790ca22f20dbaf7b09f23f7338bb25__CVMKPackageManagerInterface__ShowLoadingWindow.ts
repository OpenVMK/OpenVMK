// 14790ca22f20dbaf7b09f23f7338bb25.cct / CVMKPackageManagerInterface / ShowLoadingWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowLoadingWindow(_me: LingoMe, _this: LingoValue) {
  var t_sHdTxt = "Loading Additional Resources...";
  setMeProp(_me, "m_objLoadingWindow", callNamed("createObject", callNamed("getUniqueID"), "CLoadingWindow"));
  var t_mp_data = new LingoPropList([symbol("headline"), t_sHdTxt, symbol("showbutton"), 0, symbol("client"), callMethod("getID", _this), symbol("modal"), 1]);
  if (callNamed("objectp", meProp(_me, "m_objLoadingWindow"))) {
  callMethod("DefineWindow", meProp(_me, "m_objLoadingWindow"), t_mp_data)
  }

}

