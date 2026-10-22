// 239fb1d2675fc448140198b03238814c.cct / CMainHandler / UpdateFurnimapState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateFurnimapState(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_bFurniMapsLoaded", 1);
}

