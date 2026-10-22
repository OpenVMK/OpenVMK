// d0e535313898676eb605277339b50f27.cct / CBodypartClass_rh / SetAncestor

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetAncestor(_me: LingoMe, a_obj: LingoValue) {
  setMeProp(_me, "ancestor", a_obj);
}

