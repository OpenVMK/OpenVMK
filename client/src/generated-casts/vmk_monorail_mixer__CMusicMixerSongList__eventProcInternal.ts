// vmk_monorail_mixer.cct / CMusicMixerSongList / eventProcInternal

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function eventProcInternal(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  var tX = 0;
  var tY = 0;
  var tClickedLine = 0;
  var tElem = callMethod("getElement", callNamed("getWindow", meProp(_me, "m_sWindowTitle")), meProp(_me, "m_ElemID"));
  var t_sprite = callMethod("getProperty", tElem, symbol("sprite"));
  var passEvent = 1;
  var eventReceiver = symbol("eventProcSongList");
  var tObject = callMethod("get", callNamed("getObjectManager"), meProp(_me, "m_sClientID"));
  var tOffset = callNamed("point", 0, 0);
  if ((lingoTruthy(callNamed("voidp", t_sprite)) ? 0 : 1)) {
  tX = lingoBinary("add", lingoBinary("sub", _mouse.clickLoc.locH, t_sprite.locH), tOffset.locH);
  tY = lingoBinary("add", lingoBinary("sub", _mouse.clickLoc.locV, t_sprite.locV), tOffset.locV);
  tClickedLine = callNamed("integer", lingoBinary("add", lingoBinary("div", tY, meProp(_me, "m_iLineHeight")), 0.5));
  }

  if (lingoBinary("eq", tObject, 0)) {
  passEvent = 0;
  } else {
  if (lingoBinary("eq", callMethod("getOne", callMethod("handlers", tObject), eventReceiver), 0)) {
  passEvent = 0;
  }

  }

  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  if (lingoBinary("lte", tClickedLine, meProp(_me, "m_pSongs").count)) {
  if (lingoBinary("and", lingoBinary("neq", tClickedLine, 0), lingoBinary("neq", tClickedLine, meProp(_me, "m_pActive")))) {
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  if (lingoBinary("neq", meProp(_me, "m_pActive"), 0)) {
  callMethod("deactivate", meProp(_me, "m_pSongs")[meProp(_me, "m_pActive")])
  }

  setMeProp(_me, "m_pActive", tClickedLine);
  callMethod("Activate", meProp(_me, "m_pSongs")[meProp(_me, "m_pActive")])
  callMethod("render", _me)
  }

  } else {
  if (lingoBinary("neq", meProp(_me, "m_pActive"), 0)) {
  callMethod("deactivate", meProp(_me, "m_pSongs")[meProp(_me, "m_pActive")])
  setMeProp(_me, "m_pActive", 0);
  callMethod("render", _me)
  }

  }

  if (passEvent) {
  callNamed("call", eventReceiver, tObject, tEvent, meProp(_me, "m_pActive"))
  }

  }

}

