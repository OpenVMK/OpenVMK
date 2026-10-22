// core.old.cct / CDownload / importFileToCast

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function importFileToCast(_me: LingoMe) {
  var tmember = callNamed("member", meProp(_me, "pMemNum"));
  switch (meProp(_me, "pType")) {
case symbol("text"):
case symbol("field"):
  setThePropOf(tmember, "text", callNamed("netTextResult", meProp(_me, "pNetId")));
  break;
case symbol("bitmap"):
  callNamed("importFileInto", tmember, meProp(_me, "pURL"), new LingoPropList([symbol("dither"), 0, symbol("trimWhiteSpace"), 0]))
  break;
  default:
  callNamed("importFileInto", tmember, meProp(_me, "pURL"))
  break;
  }

  setThePropOf(tmember, "name", meProp(_me, "pMemName"));
  return 1;
}

