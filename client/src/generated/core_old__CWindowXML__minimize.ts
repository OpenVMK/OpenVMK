// core.old.cct / CWindowXML / minimize

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function minimize(_me: LingoMe, _this: LingoValue, a_rcRect: LingoValue) {
  var t_rcOld = callNamed("rect", 0, 0, meProp(_me, "pwidth"), meProp(_me, "pheight"));
  callMethod("ResizeTo", _this, a_rcRect.width, a_rcRect.height)
  for (var t_rElem of meProp(_me, "pElemList").toArray()) {
  var t_rSprite = callMethod("getProperty", t_rElem, symbol("sprite"));
  var t_iX = lingoBinary("sub", t_rSprite.locH, meProp(_me, "pLocX"));
  var t_iY = lingoBinary("sub", t_rSprite.locV, meProp(_me, "pLocY"));
  var t_iW = t_rSprite.width;
  var t_iH = t_rSprite.height;
  var t_rcElem = callNamed("rect", t_iX, t_iY, lingoBinary("add", t_iX, t_iW), lingoBinary("add", t_iY, t_iH));
  if (lingoBinary("neq", callMethod("union", a_rcRect, t_rcElem), a_rcRect)) {
  callMethod("hide", t_rElem)
  }

  }

  return t_rcOld;
}

