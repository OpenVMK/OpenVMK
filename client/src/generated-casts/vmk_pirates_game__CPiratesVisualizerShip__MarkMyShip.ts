// vmk_pirates_game.cct / CPiratesVisualizerShip / MarkMyShip

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function MarkMyShip(_me: LingoMe, a_bVal: LingoValue) {
  /* global */ var g_profShipVisualizerAcc = globalVar("g_profShipVisualizerAcc");
  setMeProp(_me, "m_bMyShip", a_bVal);
  setMeProp(_me, "m_iMyTeam", callMethod("GetParam", callMethod("getObject", _me), "Team"));
}

