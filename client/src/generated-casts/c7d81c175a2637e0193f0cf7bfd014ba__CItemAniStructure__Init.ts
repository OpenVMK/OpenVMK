// c7d81c175a2637e0193f0cf7bfd014ba.cct / CItemAniStructure / Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Init(_me: LingoMe, t_iType: LingoValue) {
  var t_sMemName = lingoBinary("join", lingoBinary("join", "item.", t_iType), ".ani.xml");
  if (lingoBinary("gt", callNamed("getmemnum", t_sMemName), 0)) {
  var t_rMem = callNamed("getMember", t_sMemName);
  setMeProp(_me, "m_rStructure", callNamed("CreateXML", t_rMem.text));
  return 1;
  }

  return 0;
}

