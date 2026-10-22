// 2230483a2e5366aa24e52c1b02d9674c.cct / CGuestNavListItem / setText

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setText(_me: LingoMe, i_sText: LingoValue) {
  callNamed("trace", lingoBinary("joinPad", "OpenVMK Navigator:", i_sText))
  setThePropOf(_me, "m_tText", i_sText);
  callNamed("render", _me)
}

