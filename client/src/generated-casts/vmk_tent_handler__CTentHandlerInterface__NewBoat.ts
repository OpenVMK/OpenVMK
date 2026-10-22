// vmk_tent_handler.cct / CTentHandlerInterface / NewBoat

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function NewBoat(_me: LingoMe, a_iBoatColor: LingoValue, a_ar_iAvatarFigure: LingoValue, a_iAnimationAge: LingoValue) {
  var tObject = callMethod("CreateRoomObject", _me, "boat", meProp(_me, "m_iRefCounter"), new LingoPropList(["Reference", meProp(_me, "m_iRefCounter"), "RailPosition", float(0), "AvatarFigure", a_ar_iAvatarFigure, "Color", a_iBoatColor, "Steer", float(0), "AvatarOn", 1, "SpotOn", 1, "Direction", "down"]));
  callMethod("SetAbsPos", tObject, callNamed("vector", 0, 0, 30000))
  var t_mpList = new LingoPropList([symbol("figure"), a_ar_iAvatarFigure, symbol("Dir"), new LingoList([3, 3]), symbol("act"), new LingoList([100, 0]), symbol("Output"), undefined]);
  callNamed("executeMessage", "GetAvatarImage", t_mpList)
  callMethod("SetAvatarImage", callMethod("GetVisual", tObject), t_mpList[symbol("Output")])
  setMeProp(_me, "m_iRefCounter", lingoBinary("add", meProp(_me, "m_iRefCounter"), 1));
  callMethod("append", meProp(_me, "m_ar_rBoats"), tObject)
  var tRailpos = lingoBinary("mul", lingoBinary("div", a_iAnimationAge, float(1000)), meProp(_me, "m_knotspersec"));
  callMethod("SetParam", tObject, "RailPosition", tRailpos)
}

