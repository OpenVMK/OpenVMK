// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpMenuItemTopic / setData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setData(_me: LingoMe, node: LingoValue, i_rMem: LingoValue) {
  setThePropOf(_me, "name", callMethod("getaProp", node.param, "NAME"));
  callMethod("setCaption", _me, callMethod("getaProp", node.param, "CAPTION"), i_rMem)
}

