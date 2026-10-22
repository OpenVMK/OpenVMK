// fireworks_engine.cct / SoftBuffer Class / clear

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function clear(_me: LingoMe) {
  if ((lingoTruthy(meProp(_me, "m_pImage")) ? 0 : 1)) {
  callNamed("put", "SoftBuffer Class : clear() : buffer image source not valid!")
  return;
  }

  switch (meProp(_me, "m_clearType")) {
case symbol("fill"):
  callMethod("fill", meProp(_me, "m_pImage"), 0, 0, meProp(_me, "m_pImage").width, meProp(_me, "m_pImage").height, new LingoPropList([symbol("color"), meProp(_me, "m_clearColor")]))
  break;
case symbol("copy"):
  callMethod("copyPixels", meProp(_me, "m_pImage"), meProp(_me, "m_pClearImage"), callNamed("rect", 0, 0, meProp(_me, "m_pImage").width, meProp(_me, "m_pImage").height), callNamed("rect", 0, 0, meProp(_me, "m_pClearImage").width, meProp(_me, "m_pClearImage").height), meProp(_me, "m_clearParams"))
  break;
  }

}

