// a279e21ea21f619ce478fa3a7b42b3ef.cct / CCameraInterface / eventProcCamera

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function eventProcCamera(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  if (lingoBinary("eq", tEvent, symbol("mouseDown"))) {
  switch (tElemID) {
case "help":
  callNamed("executeMessage", symbol("open_help_page"), "help.stuff.camera")
  break;
case "camera.takepicture.button":
  callNamed("executeMessage", "PlayInterfaceSound", "VMK-camera")
  for (var t_receiver of meProp(_me, "m_procedureReceiverList").toArray()) {
  callMethod("EventProc", t_receiver, tEvent, tElemID, tParm)
  }

  var tRect = callMethod("getElement", callNamed("getWindow", meProp(_me, "m_sCameraWindowName")), "camera.picture").pSprite.rect;
  callMethod("TakePhoto", _me, tRect)
  for (var t_receiver of meProp(_me, "m_procedureReceiverList").toArray()) {
  callMethod("photoTaken", t_receiver)
  }

  callNamed("updateStage")
  break;
case "close":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callMethod("hideCamera", _me)
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Camera", new LingoList([tEvent, tElemID, tParm])))
  callNamed("pass")
  }

  }

}

