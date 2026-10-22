// core.old.cct / CWindow / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  callNamed("removeUpdate", callMethod("getID", _this))
  callNamed("removePrepare", callMethod("getID", _this))
  for (var i = 1; i <= meProp(_me, "pSpriteList").count; ++i) {
  var tSprNum = meProp(_me, "pSpriteList")[i].spriteNum;
  callNamed("releaseSprite", tSprNum)
  }

  callNamed("call", symbol("deconstruct"), meProp(_me, "pElemList"))
  for (var i = 1; i <= meProp(_me, "pMemberList").count; ++i) {
  callNamed("removeMember", meProp(_me, "pMemberList")[i].name)
  }

  setMeProp(_me, "pElemList", new LingoPropList([]));
  setMeProp(_me, "pSpriteList", new LingoPropList([]));
  setMeProp(_me, "pMemberList", new LingoPropList([]));
  setMeProp(_me, "pGroupData", new LingoList([]));
  setMeProp(_me, "pClientID", "");
  setMeProp(_me, "pWindowMngr", undefined);
  return 1;
}

