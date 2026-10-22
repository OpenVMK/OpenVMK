// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoInterface / RestorePrivateName

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RestorePrivateName(_me: LingoMe) {
  if (callNamed("windowExists", meProp(_me, "m_windowTitle"))) {
  var t_rWindow = callNamed("getWindow", meProp(_me, "m_windowTitle"));
  var t_nameField = callMethod("getElement", t_rWindow, "popup.hd");
  callMethod("setText", t_nameField, meProp(_me, "m_sRoomNameOld"))
  var t_DescField = callMethod("getElement", t_rWindow, "roominfog.info");
  callMethod("setText", t_DescField, meProp(_me, "m_sRoomDescOld"))
  }

  setMeProp(_me, "m_sRoomName", meProp(_me, "m_sRoomNameOld"));
  setMeProp(_me, "m_sRoomDesc", meProp(_me, "m_sRoomDescOld"));
}

