// d0e535313898676eb605277339b50f27.cct / CBodypartClass_bu / reset

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function reset(_me: LingoMe) {
  setMeProp(_me, "m_sAction", "std");
  setMeProp(_me, "m_sActionLh", undefined);
  setMeProp(_me, "m_sActionRh", undefined);
}

