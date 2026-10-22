// core.old.cct / CWindowElementWrapper / moveBy

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function moveBy(_me: LingoMe, _this: LingoValue, tOffX: LingoValue, tOffY: LingoValue) {
  setMeProp(_me, "pLocX", lingoBinary("add", meProp(_me, "pLocX"), tOffX));
  setMeProp(_me, "pLocY", lingoBinary("add", meProp(_me, "pLocY"), tOffY));
  setThePropOf(meProp(_me, "pSprite"), "loc", lingoBinary("add", meProp(_me, "pSprite").loc, new LingoList([tOffX, tOffY])));
}

