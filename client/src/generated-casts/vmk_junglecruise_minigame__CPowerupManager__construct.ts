// vmk_junglecruise_minigame.cct / CPowerupManager / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_stage", undefined);
  setMeProp(_me, "m_ar_visiblePowerups", new LingoList([]));
  setMeProp(_me, "m_lastTime", theProperty("milliSeconds"));
  setMeProp(_me, "m_roomContext", undefined);
  setMeProp(_me, "m_boat", undefined);
  setMeProp(_me, "m_ar_fueloccupied", new LingoList([]));
  setMeProp(_me, "m_ar_filmoccupied", new LingoList([]));
  return 1;
}

