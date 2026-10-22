// eba88a10adbb7784498c2112110c5871.cct / CGuestRoomNavigator / ChangePage

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
  callMethod("SetTabs", _me)
  callMethod("SetVisibleElements", _me)
  callMethod("GetContent", _me)
  if (lingoBinary("eq", meProp(_me, "m_page"), symbol("popular"))) {
  callNamed("receiveUpdate", callMethod("getID", _me))
  } else {
  callNamed("removeUpdate", callMethod("getID", _me))
  }

}

