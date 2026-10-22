// vmk_hm_lobby_handler.cct / CHMLobbyInterface / CreateInterface

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateInterface(_me: LingoMe) {
  callNamed("createWindow", meProp(_me, "m_sGamelistWndTitle"), "vmk_hauntedmansion_signup.window")
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sGamelistWndTitle"));
  if (lingoBinary("neq", tWndObj, 0)) {
  callMethod("moveTo", tWndObj, 140, 485)
  } else {
  return callNamed("error", _me, "Unable to create game list window", symbol("construct"));
  }

  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("HMPSEventProc"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("hide", callMethod("getElement", tWndObj, "button.leave.redteam"))
  callMethod("hide", callMethod("getElement", tWndObj, "button.leave.blueteam"))
  callMethod("hide", callMethod("getElement", tWndObj, "button.leave.redteam2"))
  callMethod("hide", callMethod("getElement", tWndObj, "button.leave.blueteam2"))
  callMethod("ClearGameDisplays", _me)
  callNamed("activateWindow", "MessageBar")
  callMethod("deactivate", callNamed("getWindowManager"), meProp(_me, "m_sGamelistWndTitle"))
}

