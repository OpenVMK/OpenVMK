// vmk_casual_checkers.cct / CCheckersGameList / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  var m_iGameCode = 1;
  setThePropOf(_this, "m_iGameCode", 1);
  if (callNamed("variableExists", "checkers.polling.interval")) {
  setMeProp(_me, "m_iPollInterval", callNamed("getVariable", "checkers.polling.interval"));
  } else {
  setMeProp(_me, "m_iPollInterval", 30000);
  }

  callMethod("_PollOngoingGames", _this)
  return 1;
}

