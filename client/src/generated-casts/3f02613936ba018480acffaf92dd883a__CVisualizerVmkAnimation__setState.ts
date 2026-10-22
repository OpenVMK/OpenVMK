// 3f02613936ba018480acffaf92dd883a.cct / CVisualizerVmkAnimation / setState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setState(_me: LingoMe, i_bState: LingoValue) {
  switch (i_bState) {
case symbol("hide"):
  for (var tChannel of meProp(_me, "m_ar_channels").toArray()) {
  callMethod("hide", tChannel)
  }

  break;
case symbol("show"):
  for (var tChannel of meProp(_me, "m_ar_channels").toArray()) {
  callMethod("show", tChannel)
  }

  break;
  }

}

