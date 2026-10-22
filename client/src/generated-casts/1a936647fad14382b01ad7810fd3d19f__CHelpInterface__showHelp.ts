// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpInterface / showHelp

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showHelp(_me: LingoMe) {
  callMethod("render", meProp(_me, "m_pHelpMenu"))
  callMethod("changeView", _me, meProp(_me, "m_currentView"))
}

