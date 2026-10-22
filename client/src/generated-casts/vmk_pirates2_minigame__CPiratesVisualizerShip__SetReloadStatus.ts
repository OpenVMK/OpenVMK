// vmk_pirates2_minigame.cct / CPiratesVisualizerShip / SetReloadStatus

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetReloadStatus(_me: LingoMe, a_fStatus: LingoValue) {
  /* global */ var g_profShipVisualizerAcc = globalVar("g_profShipVisualizerAcc");
  setMeProp(_me, "m_fReloadStatus", a_fStatus);
  if (lingoBinary("gte", meProp(_me, "m_fReloadStatus"), float(1))) {
  setMeProp(_me, "m_fReloadStatus", float(1));
  }

}

