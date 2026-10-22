// vmk_monorail_train_handler.cct / CMonorailTrainHandler / MonorailEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function MonorailEvent(_me: LingoMe, a_rMsg: LingoValue) {
  var tEvent = callMethod("GetIntFrom", a_rMsg.connection);
  callNamed("setVariable", "MonorailState", tEvent)
  switch (tEvent) {
case 0:
  if (callMethod("GetTrainMusicAllowed", callMethod("getInterface", _me))) {
  callNamed("executeMessage", "PlayInterfaceSound", "MRVO-allaboard")
  }

  switch (meProp(_me, "m_currentStop")) {
case "Main Street":
  callMethod("playMusic", callMethod("getInterface", _me), "MR-music-1")
  break;
case "Adventureland":
  callMethod("playMusic", callMethod("getInterface", _me), "MR-music-2")
  break;
case "Frontierland":
  callMethod("playMusic", callMethod("getInterface", _me), "MR-music-3")
  break;
case "Fantasyland":
  callMethod("playMusic", callMethod("getInterface", _me), "MR-music-4")
  break;
case "Tomorrowland":
  callMethod("playMusic", callMethod("getInterface", _me), "MR-music-5")
  break;
case "New Orleans Square":
  callMethod("playMusic", callMethod("getInterface", _me), "MR-music-5")
  break;
  default:
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", "Received monorail-event, type", tEvent), "but we don't have a station"), meProp(_me, "m_currentStop")))
  callMethod("playMusic", callMethod("getInterface", _me), "MR-music-1")
  }

  var t_sText = "Stand clear of the doors";
  callMethod("displayText", callMethod("getInterface", _me), t_sText)
  callNamed("createTimeout", lingoBinary("join", symbol("executeOnce"), theProperty("milliSeconds")), 2000, symbol("TrainLeave"), callMethod("getID", callMethod("getInterface", _me)), undefined, 1)
  callNamed("createTimeout", lingoBinary("join", symbol("executeOnce"), lingoBinary("add", theProperty("milliSeconds"), 1)), 10000, symbol("displayNextStop"), callMethod("getID", callMethod("getInterface", _me)), meProp(_me, "m_currentStop"), 1)
  break;
case 1:
  if (lingoBinary("eq", meProp(_me, "m_currentStop"), "New Orleans Square")) {
  t_sText = lingoBinary("join", meProp(_me, "m_currentStop"), " $");
  } else {
  t_sText = lingoBinary("join", meProp(_me, "m_currentStop"), "  $");
  }

  callMethod("displayText", callMethod("getInterface", _me), t_sText)
  callMethod("TrainStop", callMethod("getInterface", _me))
  break;
case 2:
  callMethod("TrainBetweenStations", callMethod("getInterface", _me))
  break;
case 10:
  t_sText = lingoBinary("joinPad", "Now approaching:", meProp(_me, "m_currentStop"));
  callMethod("displayText", callMethod("getInterface", _me), t_sText)
  callMethod("TrainArrive", callMethod("getInterface", _me))
  break;
  }

  setThePropOf(callMethod("getInterface", _me), "m_bInited", 1);
}

