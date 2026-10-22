// d0e535313898676eb605277339b50f27.cct / CMagicMenu / showHideMagic

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showHideMagic(_me: LingoMe, _this: LingoValue) {
  if (callNamed("windowExists", meProp(_me, "m_sWindowID"))) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowID"));
  if (callMethod("getProperty", tWndObj, symbol("visible"))) {
  callNamed("removeWindow", meProp(_me, "m_sWindowID"))
  setMeProp(_me, "m_iSelectedFx", undefined);
  setMeProp(_me, "m_bMagicMenuOpened", 0);
  }

  } else {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), "QueryMagicFx")
  setMeProp(_me, "m_bMagicMenuOpened", 1);
  }

}

