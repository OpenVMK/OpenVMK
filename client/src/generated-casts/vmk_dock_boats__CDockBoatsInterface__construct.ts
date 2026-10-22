// vmk_dock_boats.cct / CDockBoatsInterface / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_iRefCounter", 1);
  setMeProp(_me, "m_ar_rBoats", new LingoList([]));
  setMeProp(_me, "m_lastTime", theProperty("milliSeconds"));
  setMeProp(_me, "m_knotspersec", 0.1);
  return 1;
}

