// 239fb1d2675fc448140198b03238814c.cct / CMainThumbGridAnimator / SetBufferElement

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetBufferElement(_me: LingoMe, _this: LingoValue, a_rElement: LingoValue) {
  setMeProp(_me, "m_rElement", a_rElement);
  if (callNamed("voidp", meProp(_me, "m_rElement"))) {
  setMeProp(_me, "m_iBufferWidth", 0);
  setMeProp(_me, "m_iBufferHeight", 0);
  } else {
  setMeProp(_me, "m_iBufferWidth", callMethod("getProperty", a_rElement, symbol("width")));
  setMeProp(_me, "m_iBufferHeight", callMethod("getProperty", a_rElement, symbol("height")));
  }

  setMeProp(_me, "m_rBuffer", callNamed("image", meProp(_me, "m_iBufferWidth"), meProp(_me, "m_iBufferHeight"), 32));
}

