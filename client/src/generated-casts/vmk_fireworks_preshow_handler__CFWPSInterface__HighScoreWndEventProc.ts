// vmk_fireworks_preshow_handler.cct / CFWPSInterface / HighScoreWndEventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HighScoreWndEventProc(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sHighscoreWindowTitle"));
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  switch (tElemID) {
case "fw.close":
  callNamed("removeWindow", meProp(_me, "m_sHighscoreWindowTitle"))
  break;
  }

  }

}

