// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomInterface / _Close

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _Close(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectExists", "room_chat_out")) {
  callNamed("removeObject", "room_chat_out")
  }

  if (callNamed("objectExists", "room_hiliter")) {
  callNamed("removeObject", "room_hiliter")
  }

  if (callNamed("windowExists", meProp(_me, "m_sWindow"))) {
  callNamed("removeWindow", meProp(_me, "m_sWindow"))
  }

  callMethod("hideLoadBar", _this)
  setMeProp(_me, "m_rContext", undefined);
}

