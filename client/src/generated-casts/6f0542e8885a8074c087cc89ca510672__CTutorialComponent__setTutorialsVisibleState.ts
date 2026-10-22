// 6f0542e8885a8074c087cc89ca510672.cct / CTutorialComponent / setTutorialsVisibleState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setTutorialsVisibleState(_me: LingoMe, t_bState: LingoValue) {
  setMeProp(_me, "m_bTutorialsAllowed", t_bState);
  var t_bFx = callMethod("get", callNamed("getObject", symbol("session")), "fx");
  var t_bMusic = callMethod("get", callNamed("getObject", symbol("session")), "music");
  var t_bUi = callMethod("get", callNamed("getObject", symbol("session")), "ui");
  var t_bVol = callMethod("get", callNamed("getObject", symbol("session")), "volume");
  var t_bTut = callMethod("get", callNamed("getObject", symbol("session")), "tutorial");
  var t_bTrade = callMethod("get", callNamed("getObject", symbol("session")), "traderequests");
  if (lingoBinary("neq", t_bTut, meProp(_me, "m_bTutorialsAllowed"))) {
  callMethod("set", callNamed("getObject", symbol("session")), "tutorial", meProp(_me, "m_bTutorialsAllowed"))
  var t_mp_dataToServer = new LingoPropList([symbol("int"), t_bFx, symbol("int"), t_bMusic, symbol("int"), t_bUi, symbol("int"), t_bVol, symbol("int"), meProp(_me, "m_bTutorialsAllowed"), symbol("int"), t_bTrade]);
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), "SetSoundPrefs", t_mp_dataToServer)
  }

  if ((lingoTruthy(meProp(_me, "m_bSettingsDataArrived")) ? 0 : 1)) {
  setMeProp(_me, "m_bSettingsDataArrived", 1);
  callMethod("InitializeObject", _me)
  }

}

