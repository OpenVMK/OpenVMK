// core.old.cct / CWindowXML / unmerge

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function unmerge(_me: LingoMe, _this: LingoValue) {
  if (lingoBinary("eq", meProp(_me, "pGroupData").count, 0)) {
  return callNamed("error", _this, "Cant't unmerge window without content!", symbol("unmerge"));
  }

  var tGroupData = callMethod("getLast", meProp(_me, "pGroupData"));
  callNamed("call", symbol("deconstruct"), tGroupData[symbol("items")])
  setMeProp(_me, "pClientRect", lingoBinary("sub", meProp(_me, "pClientRect"), tGroupData[symbol("border")]));
  for (var tItem of tGroupData[symbol("items")].toArray()) {
  callMethod("deleteProp", meProp(_me, "pElemList"), callMethod("getOne", meProp(_me, "pElemList"), tItem))
  }

  for (var tSprite of tGroupData[symbol("sprites")].toArray()) {
  callMethod("deleteProp", meProp(_me, "pSpriteList"), callMethod("getOne", meProp(_me, "pSpriteList"), tSprite))
  callNamed("releaseSprite", tSprite.spriteNum)
  }

  for (var tmember of tGroupData[symbol("members")].toArray()) {
  callMethod("deleteProp", meProp(_me, "pMemberList"), callMethod("getOne", meProp(_me, "pMemberList"), tmember))
  callNamed("removeMember", tmember.name)
  }

  callMethod("deleteOne", meProp(_me, "pSpecialIDList"), lingoBinary("join", "drag", meProp(_me, "pGroupData").count))
  callMethod("deleteOne", meProp(_me, "pSpecialIDList"), lingoBinary("join", "drag", meProp(_me, "pGroupData").count))
  callMethod("deleteAt", meProp(_me, "pGroupData"), meProp(_me, "pGroupData").count)
  return 1;
}

