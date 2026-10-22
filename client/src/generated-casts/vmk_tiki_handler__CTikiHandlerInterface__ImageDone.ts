// vmk_tiki_handler.cct / CTikiHandlerInterface / ImageDone

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ImageDone(_me: LingoMe, a_img: LingoValue, a_mp_BoatData: LingoValue) {
  var tObject = callMethod("CreateRoomObject", _me, "boat", meProp(_me, "m_iRefCounter"), new LingoPropList(["Reference", meProp(_me, "m_iRefCounter"), "RailPosition", float(0), "AvatarFigure", a_mp_BoatData[2], "Color", a_mp_BoatData[1], "Steer", float(0), "AvatarOn", 1, "SpotOn", 1, "Direction", "up"]));
  if (callNamed("objectp", tObject)) {
  callMethod("SetAbsPos", tObject, callNamed("vector", 0, 0, 30000))
  callMethod("SetAvatarImage", callMethod("GetVisual", tObject), a_img)
  callMethod("append", meProp(_me, "m_ar_rBoats"), tObject)
  setMeProp(_me, "m_iRefCounter", lingoBinary("add", meProp(_me, "m_iRefCounter"), 1));
  var tRailpos = lingoBinary("mul", lingoBinary("div", a_mp_BoatData[3], float(1000)), meProp(_me, "m_knotspersec"));
  callMethod("SetParam", tObject, "RailPosition", tRailpos)
  }

}

