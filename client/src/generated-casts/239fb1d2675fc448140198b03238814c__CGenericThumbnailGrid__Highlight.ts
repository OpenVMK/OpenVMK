// 239fb1d2675fc448140198b03238814c.cct / CGenericThumbnailGrid / Highlight

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Highlight(_me: LingoMe, _this: LingoValue, a_iSelected: LingoValue) {
  setMeProp(_me, "m_sBlinkTimer", lingoBinary("joinPad", "Highlight Blink Timer", callMethod("getID", _this)));
  if (callNamed("timeoutExists", meProp(_me, "m_sBlinkTimer"))) {
  callNamed("removeTimeout", meProp(_me, "m_sBlinkTimer"))
  }

  callMethod("DrawHighlight", _this, a_iSelected)
  callNamed("createTimeout", meProp(_me, "m_sBlinkTimer"), 500, symbol("blinkHighlights"), callMethod("getID", _this), undefined, 0)
  setMeProp(_me, "m_bBlinkNext", 0);
  setMeProp(_me, "m_iHighlighted", a_iSelected);
}

