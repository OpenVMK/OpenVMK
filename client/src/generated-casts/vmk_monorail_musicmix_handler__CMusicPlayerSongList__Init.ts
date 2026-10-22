// vmk_monorail_musicmix_handler.cct / CMusicPlayerSongList / Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Init(_me: LingoMe, t_sClientID: LingoValue, t_sWindowTitle: LingoValue, t_ElemID: LingoValue) {
  setMeProp(_me, "m_sClientID", t_sClientID);
  setMeProp(_me, "m_sWindowTitle", t_sWindowTitle);
  setMeProp(_me, "m_ElemID", t_ElemID);
  setMeProp(_me, "m_iActive", 0);
  var tElem = callMethod("getElement", callNamed("getWindow", t_sWindowTitle), t_ElemID);
  if ((lingoTruthy(callNamed("voidp", callMethod("getaProp", tElem.ancestor, symbol("pImage")))) ? 0 : 1)) {
  setMeProp(_me, "m_width", tElem.pImage.width);
  setMeProp(_me, "m_height", tElem.pImage.height);
  setMeProp(_me, "m_pImage", callMethod("getImage", _me));
  callMethod("render", _me, 1)
  var t_sprite = callMethod("getProperty", tElem, symbol("sprite"));
  if ((lingoTruthy(callNamed("voidp", t_sprite)) ? 0 : 1)) {
  callNamed("setEventBroker", t_sprite.spriteNum, callMethod("getID", _me))
  callMethod("registerProcedure", t_sprite, symbol("eventProcInternal"), callMethod("getID", _me), symbol("mouseUp"))
  }

  }

}

