// 239fb1d2675fc448140198b03238814c.cct / CLoginWindow / ShowLoginLoadingScreen

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowLoginLoadingScreen(_me: LingoMe, _this: LingoValue) {
  var t_iTimeOut = callNamed("getVariable", "login.timeout", 180000);
  callNamed("createTimeout", "login_timer", t_iTimeOut, symbol("LoginTimeout"), callMethod("getID", _this), undefined, 1)
  var t_sHdTxt = callNamed("getText", "roomqueue.preloader.hd");
  setMeProp(_me, "m_objLoadingWindow", callNamed("createObject", "AuthorLoginAnim", "CLoadingWindow"));
  var t_mp_data = new LingoPropList([symbol("headline"), t_sHdTxt, symbol("showbutton"), 0, symbol("client"), callMethod("getID", _this), symbol("modal"), 1]);
  if (callNamed("objectp", meProp(_me, "m_objLoadingWindow"))) {
  callMethod("DefineWindow", meProp(_me, "m_objLoadingWindow"), t_mp_data)
  }

}

