// core.old.cct / CMgrResource / createMember

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createMember(_me: LingoMe, tMemName: LingoValue, ttype: LingoValue) {
  if (!lingoTruthy(callNamed("voidp", meProp(_me, "pAllMemNumList")[tMemName]))) {
  callNamed("error", _me, lingoBinary("joinPad", "Member already exists:", tMemName), symbol("createMember"))
  return callMethod("getmemnum", _me, tMemName);
  }

  if (lingoBinary("and", lingoBinary("eq", ttype, symbol("bitmap")), lingoBinary("gt", meProp(_me, "pBmpMemNumList").count, 0))) {
  var tmember = callNamed("member", meProp(_me, "pBmpMemNumList")[1]);
  callMethod("deleteAt", meProp(_me, "pBmpMemNumList"), 1)
  } else {
  tmember = callNamed("new", ttype, callNamed("castLib", meProp(_me, "pBin")));
  if (!lingoTruthy(callNamed("ilk", tmember, symbol("member")))) {
  return callNamed("error", _me, lingoBinary("joinPad", lingoBinary("joinPad", "Failed to create member:", tMemName), ttype), symbol("createMember"));
  }

  }

  setThePropOf(tmember, "name", tMemName);
  var tMemNum = tmember._number;
  meProp(_me, "pAllMemNumList")[tMemName] = tMemNum;
  callMethod("add", meProp(_me, "pDynMemNumList"), tMemNum)
  return tMemNum;
}

