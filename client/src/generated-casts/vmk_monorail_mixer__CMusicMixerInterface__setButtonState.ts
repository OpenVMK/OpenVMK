// vmk_monorail_mixer.cct / CMusicMixerInterface / setButtonState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setButtonState(_me: LingoMe, t_elemName: LingoValue, t_state: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowID"));
  if (lingoBinary("neq", tWndObj, 0)) {
  var t_Elem = callMethod("getElement", tWndObj, t_elemName);
  if (lingoBinary("neq", t_Elem, 0)) {
  switch (t_state) {
case 1:
  callMethod("setProperty", t_Elem, symbol("cursor"), new LingoList(["cursor.finger", "cursor.finger.mask"]))
  callMethod("Activate", t_Elem)
  break;
case 0:
  callMethod("setProperty", t_Elem, symbol("cursor"), symbol("arrow"))
  callMethod("deactivate", t_Elem)
  break;
  }

  }

  }

}

