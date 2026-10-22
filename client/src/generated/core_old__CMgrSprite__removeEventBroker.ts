// core.old.cct / CMgrSprite / removeEventBroker

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function removeEventBroker(_me: LingoMe, tSprNum: LingoValue) {
  if (lingoBinary("lt", callMethod("getPos", meProp(_me, "pTotalSprList"), tSprNum), 1)) {
  return callNamed("error", _me, lingoBinary("joinPad", "Sprite not marked as usable:", tSprNum), symbol("removeEventBroker"));
  }

  if (lingoBinary("gt", callMethod("getPos", meProp(_me, "pFreeSprList"), tSprNum), 0)) {
  return callNamed("error", _me, "Attempted to modify non reserved sprite!", symbol("removeEventBroker"));
  }

  setThePropOf(callNamed("sprite", tSprNum), "scriptInstanceList", new LingoList([]));
  return 1;
}

