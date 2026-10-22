// 2230483a2e5366aa24e52c1b02d9674c.cct / CMagicFactor_new / SetPushTheTrashcanAction

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetPushTheTrashcanAction(_me: LingoMe, a_sCanAction: LingoValue) {
  /* global */ var pTemp = globalVar("pTemp");
  if (callNamed("stringp", a_sCanAction)) {
  setThePropOf(_me, "m_sCarPantAction", a_sCanAction);
  }

}

