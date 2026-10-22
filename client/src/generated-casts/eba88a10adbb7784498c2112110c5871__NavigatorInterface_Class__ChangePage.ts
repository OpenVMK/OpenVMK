// eba88a10adbb7784498c2112110c5871.cct / NavigatorInterface Class / ChangePage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ChangePage(_me: LingoMe, a_newPage: LingoValue) {
  setMeProp(_me, "m_page", a_newPage);
  callMethod("RequestNavigationNodes", callMethod("getComponent", _me), meProp(_me, "m_page"))
  callMethod("RefreshContent", _me)
  callMethod("SetTabs", _me)
  callNamed("executeMessage", "PlayInterfaceSound", "map-tab-change")
  callNamed("executeMessage", symbol("ui_Fastpass"))
  callNamed("updateStage")
}

