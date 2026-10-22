// c7d81c175a2637e0193f0cf7bfd014ba.cct / CItemAniStructureManager / get

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _get(_me: LingoMe, tID: LingoValue) {
  var t_sStructName = lingoBinary("join", lingoBinary("join", "item.", tID), ".ani.struct");
  var t_rStruct = callNamed("getObject", t_sStructName);
  if (callNamed("objectp", t_rStruct)) {
  var t_rStructure = t_rStruct;
  } else {
  t_rStructure = callNamed("createObject", t_sStructName, "CItemAniStructure");
  callMethod("Init", t_rStructure, tID)
  }

  return t_rStructure;
}

