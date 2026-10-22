// core.old.cct / CEventAgent / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "pEventList", new LingoPropList([]));
  setMeProp(_me, "pSprite", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _this))));
  setThePropOf(meProp(_me, "pSprite"), "member", callNamed("member", callNamed("getmemnum", "null")));
  setThePropOf(meProp(_me, "pSprite"), "rect", callNamed("rect", -float(90), -float(90), -float(80), -float(80)));
  setThePropOf(meProp(_me, "pSprite"), "locZ", 20000000);
  setThePropOf(meProp(_me, "pSprite"), "blend", 0);
  callMethod("setEventBroker", callNamed("getSpriteManager"), meProp(_me, "pSprite").spriteNum, callMethod("getID", _this))
  return 1;
}

