// eba88a10adbb7784498c2112110c5871.cct / NavigatorInterface Class / HideNavigator

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HideNavigator(_me: LingoMe, _this: LingoValue) {
  if (callNamed("windowExists", meProp(_me, "m_windowTitle"))) {
  setMeProp(_me, "m_bSoundPlayed", 1);
  callMethod("showhidenavigator", _this)
  }

}

