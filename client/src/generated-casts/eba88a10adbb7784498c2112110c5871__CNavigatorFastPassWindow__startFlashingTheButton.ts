// eba88a10adbb7784498c2112110c5871.cct / CNavigatorFastPassWindow / startFlashingTheButton

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function startFlashingTheButton(_me: LingoMe) {
  var t_rWndObj = callNamed("getWindow", meProp(_me, "m_sWindowID"));
  if ((lingoTruthy(callNamed("timeoutExists", "FlashFastPass")) ? 0 : 1)) {
  setMeProp(_me, "m_iFlashCountdown", 0);
  callNamed("createTimeout", "FlashFastPass", 500, symbol("startFlashingTheButton"), callMethod("getID", _me), undefined, 40)
  } else {
  setMeProp(_me, "m_iFlashCountdown", lingoBinary("add", meProp(_me, "m_iFlashCountdown"), 0.5));
  callMethod("setProperty", callMethod("getElement", t_rWndObj, "fastpass.enter"), symbol("blend"), 100)
  var t_bVisible = callMethod("getProperty", callMethod("getElement", t_rWndObj, "fastpass.enter"), symbol("visible"));
  callMethod("setProperty", callMethod("getElement", t_rWndObj, "fastpass.enter"), symbol("visible"), (lingoTruthy(t_bVisible) ? 0 : 1))
  callMethod("setButtonTxt", _me, "fastpass.enter", lingoBinary("joinPad", callNamed("getText", "fastpass.enter.in"), callNamed("integer", lingoBinary("sub", meProp(_me, "m_iFlashingTime"), meProp(_me, "m_iFlashCountdown")))))
  }

}

