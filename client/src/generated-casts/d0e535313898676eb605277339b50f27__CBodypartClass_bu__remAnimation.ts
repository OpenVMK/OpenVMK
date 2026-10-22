// d0e535313898676eb605277339b50f27.cct / CBodypartClass_bu / remAnimation

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function remAnimation(_me: LingoMe) {
  setMeProp(_me, "m_bAnimation", 0);
  setMeProp(_me, "m_iAnimFrame", 1);
  setMeProp(_me, "m_iTotalFrame", 1);
}

