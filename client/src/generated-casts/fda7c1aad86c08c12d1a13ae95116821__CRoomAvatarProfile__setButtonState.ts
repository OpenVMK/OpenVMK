// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomAvatarProfile / setButtonState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setButtonState(_me: LingoMe, _this: LingoValue, t_sElemName: LingoValue, t_bState: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rControls"))) {
  var tWndObj = callNamed("getWindow", callMethod("getID", meProp(_me, "m_rControls")));
  }

  if (lingoBinary("neq", tWndObj, 0)) {
  var t_rElem = callMethod("getElement", tWndObj, t_sElemName);
  if (lingoBinary("neq", t_rElem, 0)) {
  switch (t_bState) {
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

}

