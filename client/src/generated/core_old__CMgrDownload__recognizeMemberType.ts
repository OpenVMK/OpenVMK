// core.old.cct / CMgrDownload / recognizeMemberType

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function recognizeMemberType(_me: LingoMe, tURL: LingoValue) {
  if (lingoBinary("eq", meProp(_me, "pTypeDefList").count, 0)) {
  callMethod("fillTypeDefinitions", _me)
  }

  var tFileType = tURL.char.range(lingoBinary("sub", callNamed("length", tURL), 5), callNamed("length", tURL));
  tFileType = tFileType.char.range(lingoBinary("add", callNamed("offset", ".", tFileType), 1), callNamed("length", tFileType));
  tFileType = meProp(_me, "pTypeDefList")[tFileType];
  if (!lingoTruthy(callNamed("symbolp", tFileType))) {
  callNamed("error", _me, lingoBinary("joinPad", "Couldn't recognize member's type:", tURL), symbol("recognizeMemberType"))
  return symbol("field");
  } else {
  return tFileType;
  }

}

