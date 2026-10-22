// 239fb1d2675fc448140198b03238814c.cct / CMainHandler / RemoveLoginWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RemoveLoginWindow(_me: LingoMe, _this: LingoValue, tMsg: LingoValue) {
  if (callNamed("timeoutExists", "login_timer")) {
  callNamed("removeTimeout", "login_timer")
  }

  if (callNamed("objectp", meProp(_me, "m_objLoadingWindow"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_objLoadingWindow")))
  }

  if (lingoBinary("or", lingoBinary("eq", theProperty("runMode"), "Author"), lingoBinary("eq", theProperty("runMode"), "Projector"))) {
  if (callNamed("objectExists", "AuthorLoginAnim")) {
  callNamed("removeObject", "AuthorLoginAnim")
  }

  }

}

