// core.old.cct / CMgrSprite / unregisterMembers

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function unregisterMembers(_me: LingoMe, a_iCastNum: LingoValue) {
  for (var tNum of meProp(_me, "pTotalSprList").toArray()) {
  if (lingoBinary("lt", callMethod("getPos", meProp(_me, "pFreeSprList"), tNum), 1)) {
  var t_rMem = callNamed("sprite", tNum).member;
  if (lingoBinary("eq", t_rMem.castLibNum, a_iCastNum)) {
  callNamed("error", _me, lingoBinary("joinPad", "Un-linking member attached to sprite", new LingoList([callNamed("sprite", tNum), t_rMem.name])), symbol("unregisterMembers"))
  if (lingoBinary("gt", callNamed("member", "null")._number, 0)) {
  setThePropOf(callNamed("sprite", tNum), "member", callNamed("member", "null"));
  }

  }

  }

  }

}

