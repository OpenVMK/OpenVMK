// core.old.cct / CMgrSprite / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "pTotalSprList", undefined);
  setMeProp(_me, "pFreeSprList", undefined);
  setMeProp(_me, "pClientList", undefined);
  setMeProp(_me, "pEventBroker", callNamed("script", callNamed("getVariable", "event.broker.class")));
  return callMethod("preIndexChannels", _me);
}

