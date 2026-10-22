// 02a651b7c670fb161ce1a3e4d28713a1.cct / CInterfaceInterface / showMessageBar

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showMessageBar(_me: LingoMe, i_state: LingoValue) {
  if (i_state) {
  callMethod("showMessageBar", meProp(_me, "m_pMessageBar"))
  } else {
  callMethod("hideMessageBar", meProp(_me, "m_pMessageBar"))
  }

}

