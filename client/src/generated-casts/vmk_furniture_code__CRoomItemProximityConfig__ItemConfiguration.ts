// vmk_furniture_code.cct / CRoomItemProximityConfig / ItemConfiguration

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ItemConfiguration(_me: LingoMe, t_iRef: LingoValue, a_ar_Configuration: LingoValue) {
  callMethod("updateCurrentConfiguration", _me, a_ar_Configuration)
  setMeProp(_me, "m_iRef", t_iRef);
  callMethod("createItemConfigurationDialog", _me, t_iRef, a_ar_Configuration)
}

