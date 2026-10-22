// 239fb1d2675fc448140198b03238814c.cct / CMainHandler / LoginTimeout

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function LoginTimeout(_me: LingoMe, _this: LingoValue) {
  if (callNamed("timeoutExists", "login_timer")) {
  callNamed("removeTimeout", "login_timer")
  }

  if (callNamed("objectp", meProp(_me, "m_objLoadingWindow"))) {
  var t_sInfoTxt = callNamed("getText", "roomqueue.preloadfailed.info");
  var t_sButtonTxt = callNamed("getText", "roomqueue.preloader.ok");
  var t_mp_data = new LingoPropList([symbol("showbutton"), 1, symbol("ButtonText"), t_sButtonTxt, symbol("infotext"), t_sInfoTxt]);
  callMethod("UpdateWindowdata", meProp(_me, "m_objLoadingWindow"), t_mp_data)
  callMethod("stopAnimation", meProp(_me, "m_objLoadingWindow"))
  }

  return 1;
}

