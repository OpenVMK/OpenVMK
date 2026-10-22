// core.old.cct / CWindowDropDown / mouseDown

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function mouseDown(_me: LingoMe) {
  if (lingoBinary("lt", _me.pSprite.blend, 100)) {
  return 0;
  }

  setMeProp(_me, "pClickPass", 1);
  if (lingoBinary("neq", meProp(_me, "pState"), symbol("open"))) {
  setThePropOf(_me, "pImage", meProp(_me, "pDropMenuImg"));
  switch (meProp(_me, "pOpenDir")) {
case symbol("lastselected"):
  setThePropOf(_me.pSprite, "loc", lingoBinary("sub", meProp(_me, "pLoc"), callNamed("point", 0, lingoBinary("mul", lingoBinary("sub", meProp(_me, "pSelectedItemNum"), 1), meProp(_me, "pLineHeight")))));
  break;
case symbol("up"):
  setThePropOf(_me.pSprite, "loc", lingoBinary("sub", meProp(_me, "pLoc"), callNamed("point", 0, lingoBinary("mul", lingoBinary("sub", callMethod("count", meProp(_me, "pTextlist")), 1), meProp(_me, "pLineHeight")))));
  break;
  }

  callMethod("render", _me)
  setMeProp(_me, "pState", symbol("open"));
  return 1;
  }

}

