// vmk_casual_checkers.cct / CCheckersGameInterface / NotifyGameStart

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function NotifyGameStart(_me: LingoMe, _this: LingoValue, a_bIsNewGame: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  var i = 1;
  while (1) {
  var t_rPlayer = callMethod("GetPlayerDataByIndex", meProp(_me, "m_rEngine"), i);
  if (callNamed("voidp", t_rPlayer)) {
  break;
  }

  callNamed("put", lingoBinary("joinPad", "Player:", t_rPlayer))
  var t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), lingoBinary("join", "player", i));
  if (callNamed("objectp", t_rElem)) {
  callMethod("setText", t_rElem, t_rPlayer[symbol("name")])
  }

  t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), lingoBinary("join", lingoBinary("join", "player", i), ".level"));
  if (callNamed("objectp", t_rElem)) {
  callMethod("setText", t_rElem, t_rPlayer[symbol("level")])
  }

  t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), lingoBinary("join", lingoBinary("join", "player", i), ".score"));
  if (callNamed("objectp", t_rElem)) {
  callMethod("setText", t_rElem, t_rPlayer[symbol("score")])
  }

  i = lingoBinary("add", i, 1);
  }

  }

  if (a_bIsNewGame) {
  var t = callNamed("createObject", callNamed("getUniqueID"), "CCheckersGameDialog");
  callMethod("open", t, "vmk_checkers_gamestart.window")
  callMethod("delay", t, 5000, symbol("Destroy"))
  }

  if (callMethod("get", callNamed("getObject", symbol("session")), "music")) {
  var t_rSound = callNamed("getObject", meProp(_me, "m_sSound"));
  if (callNamed("objectp", t_rSound)) {
  callMethod("Define", t_rSound, "checkers-game-loop")
  callMethod("SetSoundType", t_rSound, "music")
  callMethod("setLoopCount", t_rSound, 1000)
  callMethod("PlaySound", t_rSound)
  }

  }

  callNamed("registerMessage", "ResetRoomSound", callMethod("getID", _this), symbol("_ResetSounds"))
}

