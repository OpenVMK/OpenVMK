// 565d7caa66391c8e45a3923725ba051b.cct / CInvItemGrid / blinkHighlights

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function blinkHighlights(_me: LingoMe, _this: LingoValue) {
  if (meProp(_me, "m_bBlinkNext")) {
  callMethod("DrawHighlight", _this, meProp(_me, "m_iHighlighted"))
  } else {
  callMethod("DrawUnhighlight", _this)
  }

  setMeProp(_me, "m_bBlinkNext", (lingoTruthy(meProp(_me, "m_bBlinkNext")) ? 0 : 1));
}

