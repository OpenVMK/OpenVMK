// vmk_domestic.cct / CRoomVisualDomestic / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_rSprite", callNamed("sprite", 0));
  setMeProp(_me, "m_veLastAbs", undefined);
  setMeProp(_me, "m_sCurAct", "std");
  setMeProp(_me, "m_iFrame", 0);
  return 1;
}

