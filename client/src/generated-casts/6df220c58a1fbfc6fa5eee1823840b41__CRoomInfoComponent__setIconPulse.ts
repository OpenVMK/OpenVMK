// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoComponent / setIconPulse

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setIconPulse(_me: LingoMe, t_state: LingoValue) {
  if (callNamed("voidp", meProp(_me, "m_pulser"))) {
  setMeProp(_me, "m_pulser", callNamed("createObject", "Room Info Icon Pulser", "CRoomInfoIconPulser"));
  }

  if (t_state) {
  callMethod("Activate", meProp(_me, "m_pulser"))
  } else {
  callMethod("deactivate", meProp(_me, "m_pulser"))
  }

}

