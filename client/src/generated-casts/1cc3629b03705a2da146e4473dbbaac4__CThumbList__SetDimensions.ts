// 1cc3629b03705a2da146e4473dbbaac4.cct / CThumbList / SetDimensions

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetDimensions(_me: LingoMe, a_iWidth: LingoValue, a_iHeight: LingoValue) {
  setMeProp(_me, "m_width", a_iWidth);
  setMeProp(_me, "m_height", a_iHeight);
}

