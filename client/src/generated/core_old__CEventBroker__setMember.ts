// core.old.cct / CEventBroker / setMember

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setMember(_me: LingoMe, _this: LingoValue, tmember: LingoValue) {
  setThePropOf(meProp(_me, "pSprite"), "member", tmember);
  setThePropOf(meProp(_me, "pSprite"), "width", meProp(_me, "pSprite").member.width);
  setThePropOf(meProp(_me, "pSprite"), "height", meProp(_me, "pSprite").member.height);
  return 1;
}

