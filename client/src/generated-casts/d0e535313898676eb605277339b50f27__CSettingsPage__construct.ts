// d0e535313898676eb605277339b50f27.cct / CSettingsPage / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_rWindow", undefined);
  var m_bDataGathered = 0;
  var m_ar_AvatarData = undefined;
  setMeProp(_me, "m_bChanges", 0);
  setMeProp(_me, "m_bMusic", callMethod("get", callNamed("getObject", symbol("session")), "music"));
  setMeProp(_me, "m_bFx", callMethod("get", callNamed("getObject", symbol("session")), "fx"));
  setMeProp(_me, "m_bUi", callMethod("get", callNamed("getObject", symbol("session")), "ui"));
  setMeProp(_me, "m_iVolume", callMethod("get", callNamed("getObject", symbol("session")), "volume"));
  setMeProp(_me, "m_bTutorial", callMethod("get", callNamed("getObject", symbol("session")), "tutorial"));
  setMeProp(_me, "m_bTradeReq", callMethod("get", callNamed("getObject", symbol("session")), "traderequests"));
  setMeProp(_me, "m_iPrviousVolume", meProp(_me, "m_iVolume"));
  return 1;
}

