// 2230483a2e5366aa24e52c1b02d9674c.cct / Base64 / setMimeHeader

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setMimeHeader(_me: LingoMe, tFilename: LingoValue, tMimeType: LingoValue) {
  setMeProp(_me, "pMimeHeader", "");
  if (callNamed("stringp", tMimeType)) {
  pMimeHeader = pMimeHeader + lingoBinary("join", lingoBinary("join", lingoBinary("join", "Content-Type: ", tMimeType), ";"), meProp(_me, "pReturn"));
  }

  pMimeHeader = pMimeHeader + lingoBinary("join", "Content-Transfer-Encoding: base64", meProp(_me, "pReturn"));
  pMimeHeader = pMimeHeader + lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "Content-Disposition: inline; filename=", "\""), tFilename), "\""), meProp(_me, "pReturn")), meProp(_me, "pReturn"));
}

