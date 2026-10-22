// vmk_monorail_station_handler.cct / CMonorailStationInterface / MonorailInit

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function MonorailInit(_me: LingoMe, iMsg: LingoValue) {
  if ((lingoTruthy(callNamed("variableExists", "MonorailState")) ? 0 : 1)) {
  callNamed("createVariable", "MonorailState", iMsg)
  } else {
  callNamed("setVariable", "MonorailState", iMsg)
  }

  var t_iMsgDeltaTime = lingoBinary("sub", theProperty("milliSeconds"), meProp(_me, "m_iLastMsgReceived"));
  if (lingoBinary("gt", t_iMsgDeltaTime, 1000)) {
  setMeProp(_me, "m_iLastMsgReceived", theProperty("milliSeconds"));
  } else {
  return;
  }

  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", "MonorailAction", meProp(_me, "m_bMonorailReady")), iMsg))
  if ((lingoTruthy(meProp(_me, "m_bMonorailReady")) ? 0 : 1)) {
  switch (iMsg) {
case 0:
  callNamed("put", "Monorail Init: Train Leaves {Close Doors, leave station}")
  callMethod("leaveStationFast", _me)
  break;
case 1:
  callNamed("put", "Monorail Init: Train Stopped {Hide Masks, Open Doors}")
  callMethod("showTrainWithDoorsOpen", _me)
  callMethod("showExits", _me)
  break;
case 2:
  callNamed("put", "Monorail Init: Train Hidden {Hide All}")
  break;
case 10:
  callNamed("put", "Monorail Init: Train Approaches {Hide Doors+Masks, start train animation}")
  callMethod("TrainApproaches", _me)
  break;
  }

  setMeProp(_me, "m_bMonorailReady", 1);
  } else {
  switch (iMsg) {
case 0:
  callNamed("put", "train moves out")
  callMethod("resetTrainRegPoints", callMethod("getInterface", _me))
  callMethod("TrainLeave", callMethod("getInterface", _me))
  break;
case 1:
  callMethod("TrainStops", callMethod("getInterface", _me))
  callNamed("put", "train stops")
  break;
case 10:
  callNamed("put", "train pulls in")
  callMethod("TrainApproaches", callMethod("getInterface", _me))
  break;
  }

  }

}

