// registration.cct / CRegClothesLoader / ShowLoginLoadingScreen

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowLoginLoadingScreen(_me: LingoMe, _this: LingoValue) {
  var t_sHdTxt = callNamed("getText", "reg.clothes.loading.hd");
  setMeProp(_me, "m_objLoadingWindow", callNamed("createObject", callNamed("getUniqueID"), "CLoadingWindow"));
  var t_mp_data = new LingoPropList([symbol("headline"), t_sHdTxt, symbol("showbutton"), 0, symbol("client"), callMethod("getID", _this), symbol("modal"), 1]);
  if (callNamed("objectp", meProp(_me, "m_objLoadingWindow"))) {
  callMethod("DefineWindow", meProp(_me, "m_objLoadingWindow"), t_mp_data)
  }

}

