// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpInterface / InitializeObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function InitializeObject(_me: LingoMe) {
  setMeProp(_me, "m_pHelpMenu", callNamed("createObject", "Help Menu", "CHelpMenu"));
  callMethod("setWindowTitle", meProp(_me, "m_pHelpMenu").pContent, meProp(_me, "m_windowTitle"))
}

