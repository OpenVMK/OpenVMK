// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpMenuItem / setCaption

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setCaption(_me: LingoMe, i_sCaption: LingoValue, i_rMem: LingoValue) {
  setThePropOf(_me, "Caption", i_sCaption);
  setThePropOf(i_rMem, "text", _me.Caption);
  setMeProp(_me, "pImg", callMethod("duplicate", i_rMem.image));
}

