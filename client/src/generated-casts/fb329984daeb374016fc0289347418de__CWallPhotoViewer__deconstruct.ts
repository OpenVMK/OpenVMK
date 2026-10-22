// fb329984daeb374016fc0289347418de.cct / CWallPhotoViewer / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  if (callNamed("windowExists", meProp(_me, "m_sWindowTitle"))) {
  callNamed("removeWindow", meProp(_me, "m_sWindowTitle"))
  }

  callMethod("regMsgList", _me, 0)
  return 1;
}

