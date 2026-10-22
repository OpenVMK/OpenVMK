// eba88a10adbb7784498c2112110c5871.cct / NavigatorInterface Class / startMiniGame

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function startMiniGame(_me: LingoMe, a_game: LingoValue) {
  switch (a_game) {
case symbol("pirates"):
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 1001)
  break;
case symbol("junglecruise"):
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 11)
  break;
case symbol("fireworks"):
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 1100)
  break;
case symbol("musicjam"):
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 42)
  break;
  }

}

