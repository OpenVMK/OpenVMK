// 312ea5aa5d6c166d8f614e2d3c0e4920.cct / CFurniSoundSettingsListener / Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Init(_me: LingoMe, _this: LingoValue, _owner: LingoValue, _handler: LingoValue) {
  setMeProp(_me, "m_rOwner", _owner);
  setMeProp(_me, "m_kHandler", _handler);
}

