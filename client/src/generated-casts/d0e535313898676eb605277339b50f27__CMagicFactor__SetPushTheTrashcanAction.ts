// d0e535313898676eb605277339b50f27.cct / CMagicFactor / SetPushTheTrashcanAction

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetPushTheTrashcanAction(_me: LingoMe, a_sCanAction: LingoValue) {
  if (callNamed("stringp", a_sCanAction)) {
  setMeProp(_me, "m_sCarPantAction", a_sCanAction);
  }

}

