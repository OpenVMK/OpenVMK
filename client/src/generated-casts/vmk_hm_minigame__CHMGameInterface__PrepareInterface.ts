// vmk_hm_minigame.cct / CHMGameInterface / PrepareInterface

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PrepareInterface(_me: LingoMe) {
  callNamed("put", "CHMGameInterface::PrepareInterface - begin")
  setMeProp(_me, "m_rGameEngine", callMethod("getComponent", callNamed("getThread", "minigame")));
  setMeProp(_me, "m_ar_roundResults", new LingoList([]));
  setMeProp(_me, "m_mp_keyStatus", new LingoList([-float(1), 0, 0]));
  setMeProp(_me, "m_prepared", 1);
  setMeProp(_me, "m_bActionActive", 0);
  callNamed("receiveUpdate", callMethod("getID", _me))
}

