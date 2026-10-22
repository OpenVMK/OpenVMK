// d0e535313898676eb605277339b50f27.cct / CSettingsPageBase / CloseSettings

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CloseSettings(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rCurPageObj"))) {
  callMethod("Purge", meProp(_me, "m_rCurPageObj"), meProp(_me, "m_rWindow"))
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rCurPageObj")))
  }

  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  callNamed("removeWindow", callMethod("getID", meProp(_me, "m_rWindow")))
  setMeProp(_me, "m_rWindow", undefined);
  callMethod("BuilderClosed", callNamed("getThread", symbol("AvatarFactory")).handler)
  }

  if (callNamed("windowExists", "MessageBar")) {
  if (callMethod("elementExists", callNamed("getWindow", "MessageBar"), "chat.field")) {
  callMethod("setFocus", callMethod("getElement", callNamed("getWindow", "MessageBar"), "chat.field"), 1)
  }

  }

}

