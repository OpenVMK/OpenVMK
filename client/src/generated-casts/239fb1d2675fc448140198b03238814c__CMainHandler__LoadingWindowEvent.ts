// 239fb1d2675fc448140198b03238814c.cct / CMainHandler / LoadingWindowEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function LoadingWindowEvent(_me: LingoMe, _this: LingoValue) {
  if (callNamed("textExists", "game.exit.url")) {
  var t_sExitURL = callNamed("getText", "game.exit.url");
  } else {
  t_sExitURL = "https://secure.disney.go.com/vmk/en_US/index?name=LoginPage";
  }

  callNamed("gotoNetPage", t_sExitURL, "_self")
  if (callNamed("objectp", meProp(_me, "m_objLoadingWindow"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_objLoadingWindow")))
  }

}

