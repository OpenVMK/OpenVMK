// vmk_junglecruise_minigame.cct / CTutorial / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_fInitTime", lingoBinary("div", theProperty("milliSeconds"), float(1000)));
  setMeProp(_me, "m_mp_sequence", new LingoPropList([]));
  setMeProp(_me, "m_mp_sayBuffer", new LingoPropList([]));
  setMeProp(_me, "m_boatSlowPoint", float(10000000));
  setMeProp(_me, "m_avatarToBoatPoint", float(1000000));
  setMeProp(_me, "m_avatarWaitPos", callNamed("vector", 0, 0, 0));
  callNamed("receiveUpdate", callMethod("getID", _me))
  return 1;
}

