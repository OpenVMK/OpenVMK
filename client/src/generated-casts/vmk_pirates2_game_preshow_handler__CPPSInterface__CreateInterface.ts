// vmk_pirates2_game_preshow_handler.cct / CPPSInterface / CreateInterface

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateInterface(_me: LingoMe) {
  callNamed("createWindow", meProp(_me, "m_sGamelistWndTitle"), "vmk_pirates_preshow_signup.window")
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sGamelistWndTitle"));
  if ((lingoTruthy(callNamed("voidp", tWndObj)) ? 0 : 1)) {
  callMethod("moveTo", tWndObj, 53, 418)
  } else {
  return callNamed("error", _me, "Unable to create game list window", symbol("construct"));
  }

  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("PPSEventProc"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("hide", callMethod("getElement", tWndObj, "button.leave.redteam"))
  callMethod("hide", callMethod("getElement", tWndObj, "button.leave.blueteam"))
  callMethod("hide", callMethod("getElement", tWndObj, "button.leave.redteam2"))
  callMethod("hide", callMethod("getElement", tWndObj, "button.leave.blueteam2"))
  callMethod("DisableStartAndMoreRooms", _me)
  for (var side of new LingoList(["", 2]).toArray()) {
  for (var team of new LingoList(["red", "blue"]).toArray()) {
  for (var player of new LingoList([1, 2, 3, 4]).toArray()) {
  var t_sIconName = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "piratesship", side), "."), team), player);
  var t_sButtonName = lingoBinary("join", "button.", t_sIconName);
  var t_rIcon = callMethod("getElement", tWndObj, t_sIconName);
  var t_rButton = callMethod("getElement", tWndObj, t_sButtonName);
  if (callNamed("objectp", t_rIcon)) {
  callMethod("hide", t_rIcon)
  }

  if (callNamed("objectp", t_rButton)) {
  callMethod("hide", t_rButton)
  }

  }

  }

  }

  callMethod("ClearGameDisplays", _me)
  callMethod("deactivate", callNamed("getWindowManager"), meProp(_me, "m_sGamelistWndTitle"))
}

