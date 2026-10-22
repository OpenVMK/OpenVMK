// vmk_fireworks_minigame.cct / CFireworksStage / loadServerParameters

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function loadServerParameters(_me: LingoMe, i_ar_params: LingoValue) {
  setMeProp(_me, "m_ar_bonus", i_ar_params[symbol("bonus")]);
  setMeProp(_me, "m_ar_level", new LingoList([]));
  for (var i = 1; i <= i_ar_params[symbol("shots")].count; ++i) {
  var tEntry = i_ar_params[symbol("shots")][i];
  callMethod("append", meProp(_me, "m_ar_level"), new LingoPropList([symbol("t"), lingoBinary("div", tEntry[symbol("shotTimeInMsecs")], float(1000)), symbol("f"), callMethod("getSelectorPayload", _me, tEntry[symbol("type")]), symbol("pos"), callNamed("vector", tEntry[symbol("x")], tEntry[symbol("y")], tEntry[symbol("z")]), symbol("id"), tEntry[symbol("shotId")], symbol("type"), tEntry[symbol("type")]]))
  callMethod("AddToChecksum", _me, lingoBinary("mul", tEntry[symbol("shotTimeInMsecs")], 100))
  callMethod("AddToChecksum", _me, callMethod("getSelectorPayload", _me, tEntry[symbol("type")]).length)
  callMethod("AddToChecksum", _me, tEntry[symbol("x")])
  callMethod("AddToChecksum", _me, tEntry[symbol("y")])
  callMethod("AddToChecksum", _me, tEntry[symbol("z")])
  }

}

