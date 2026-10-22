// vmk_pirates_minigame.cct / CPiratesVisualizerShip / MarkShoot

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function MarkShoot(_me: LingoMe, a_ySide: LingoValue) {
  /* global */ var g_profShipVisualizerAcc = globalVar("g_profShipVisualizerAcc");
  setMeProp(_me, "m_yShootMark", a_ySide);
  setMeProp(_me, "m_unshake", meProp(_me, "m_shakeProtection"));
}

