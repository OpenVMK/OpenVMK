// core.old.cct / CWindowFieldWrapper / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe) {
  setThePropOf(_me, "pLocX", _me.pSprite.locH);
  setThePropOf(_me, "pLocY", _me.pSprite.locV);
  setThePropOf(_me, "pwidth", meProp(_me, "pOwnW"));
  setThePropOf(_me, "pheight", meProp(_me, "pOwnH"));
  setThePropOf(_me.pMember, "rect", callNamed("rect", 0, 0, _me.pwidth, _me.pheight));
  setThePropOf(meProp(_me, "pMember"), "scrollTop", meProp(_me, "pOffY"));
}

