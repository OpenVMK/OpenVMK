// a279e21ea21f619ce478fa3a7b42b3ef.cct / CCameraInterface / hideCamera

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function hideCamera(_me: LingoMe) {
  if (callNamed("windowExists", meProp(_me, "m_sPicTitleWindowName"))) {
  callNamed("removeWindow", meProp(_me, "m_sPicTitleWindowName"))
  }

  if (callNamed("windowExists", meProp(_me, "m_sCameraWindowName"))) {
  callNamed("removeWindow", meProp(_me, "m_sCameraWindowName"))
  }

  if (callNamed("windowExists", meProp(_me, "m_sMickeyWindowName"))) {
  callNamed("removeWindow", meProp(_me, "m_sMickeyWindowName"))
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rCaptionCompose"))) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rCaptionCompose")))
  setMeProp(_me, "m_rCaptionCompose", undefined);
  }

  setMeProp(_me, "m_visible", 0);
  setMeProp(_me, "m_view", symbol("camera"));
}

