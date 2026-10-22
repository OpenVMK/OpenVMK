// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerView / setButtonState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setButtonState(_me: LingoMe, a_sElem: LingoValue, a_bState: LingoValue) {
  var t_rElem = callMethod("getElement", _me.m_rWindow, a_sElem);
  if (callNamed("objectp", t_rElem)) {
  switch (a_bState) {
case 1:
  callMethod("setProperty", t_rElem, symbol("cursor"), new LingoList(["cursor.finger", "cursor.finger.mask"]))
  callMethod("Activate", t_rElem)
  break;
case 0:
  callMethod("setProperty", t_rElem, symbol("cursor"), symbol("arrow"))
  callMethod("deactivate", t_rElem)
  break;
  }

  }

}

