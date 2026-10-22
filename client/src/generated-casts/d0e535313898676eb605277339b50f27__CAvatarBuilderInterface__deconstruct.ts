// d0e535313898676eb605277339b50f27.cct / CAvatarBuilderInterface / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rCurPageObj"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rCurPageObj")))
  setMeProp(_me, "m_rCurPageObj", undefined);
  }

  if (callNamed("objectp", meProp(_me, "m_rCurPageObj2"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rCurPageObj2")))
  setMeProp(_me, "m_rCurPageObj2", undefined);
  }

  callNamed("removeObject", "EmoticonMenu")
  callNamed("removeObject", "MagicMenu")
  callNamed("unregisterMessage", "ui_AvatarBuilder", callMethod("getID", _this))
  callNamed("unregisterMessage", "close_AvatarBuilder", callMethod("getID", _this))
  callNamed("unregisterMessage", "ui_Settings", callMethod("getID", _this))
  callNamed("unregisterMessage", "close_Settings", callMethod("getID", _this))
  callNamed("unregisterMessage", "room_leave", callMethod("getID", _this))
  callNamed("unregisterMessage", symbol("MinigameState"), callMethod("getID", _this))
  return 1;
}

