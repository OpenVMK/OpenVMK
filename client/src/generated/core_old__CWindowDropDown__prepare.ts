// core.old.cct / CWindowDropDown / prepare

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function prepare(_me: LingoMe) {
  setThePropOf(_me, "pLocX", _me.pSprite.locH);
  setThePropOf(_me, "pLocY", _me.pSprite.locV);
  switch (meProp(_me, "pAlignment")) {
case symbol("center"):
  setThePropOf(_me, "pLocX", lingoBinary("sub", _me.pLocX, lingoBinary("div", lingoBinary("sub", _me.pwidth, meProp(_me, "pOrigWidth")), 2)));
  break;
case symbol("right"):
  setThePropOf(_me, "pLocX", lingoBinary("sub", _me.pLocX, lingoBinary("sub", _me.pwidth, meProp(_me, "pOrigWidth"))));
  break;
  }

  setThePropOf(_me.pSprite, "loc", callNamed("point", _me.pLocX, _me.pLocY));
  setMeProp(_me, "pLoc", _me.pSprite.loc);
}

