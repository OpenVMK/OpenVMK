// core.old.cct / CWindowFieldWrapper / updateText

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateText(_me: LingoMe) {
  var t_lines = meProp(_me, "pMember").lineCount;
  var t_lineh = meProp(_me, "pMember").lineHeight;
  setThePropOf(_me, "pImage", callNamed("image", _me.pImage.rect.width, lingoBinary("mul", t_lines, t_lineh), 32));
  callMethod("scrollMe", _me)
  if (lingoBinary("gt", meProp(_me, "maxChars"), 0)) {
  if (lingoBinary("gt", meProp(_me, "pMember").char.count, meProp(_me, "maxChars"))) {
  setThePropOf(meProp(_me, "pMember"), "text", meProp(_me, "pMember").char.range(1, meProp(_me, "maxChars")));
  }

  }

  callMethod("render", _me)
  setMeProp(_me, "pUpdateLock", 1);
  callMethod("registerScroll", _me)
  setMeProp(_me, "pUpdateLock", 0);
  return 1;
}

