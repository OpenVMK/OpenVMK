// 2230483a2e5366aa24e52c1b02d9674c.cct / Base64 / new

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _new(_me: LingoMe) {
  setMeProp(_me, "pBase64Lookup", "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");
  setMeProp(_me, "pSubLengthLim", 6000);
  setMeProp(_me, "pReturn", lingoBinary("join", callNamed("numToChar", 13), callNamed("numToChar", 10)));
  setMeProp(_me, "pMimeHeader", "");
  return _me;
}

