// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpMenu / setWindowTitle

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setWindowTitle(_me: LingoMe, i_WindowTitle: LingoValue) {
  callMethod("setWindowTitle", meProp(_me, "pContent"), i_WindowTitle)
}

