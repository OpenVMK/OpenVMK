// 1a936647fad14382b01ad7810fd3d19f.cct / CRadioButtonMenu / updateMenu

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateMenu(_me: LingoMe) {
  if ((lingoTruthy(lingoBinary("eq", meProp(_me, "m_windowTitle"), "")) ? 0 : 1)) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_windowTitle"));
  for (var t_Elem of meProp(_me, "m_pElements").toArray()) {
  if (t_Elem.needupdate) {
  if (t_Elem.Active) {
  callMethod("feedImage", callMethod("getElement", tWndObj, t_Elem.element), meProp(_me, "m_gActive"))
  continue;
  }

  callMethod("feedImage", callMethod("getElement", tWndObj, t_Elem.element), meProp(_me, "m_gPassive"))
  }

  }

  }

}

