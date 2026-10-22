// vmk_domestic.cct / CDomesticHandler / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setThePropOf(_this, "m_rXMLDomestic", callNamed("CreateXML", callNamed("getMember", "room.object.domestic.xml").text));
  callMethod("Search", _this.m_rXMLDomestic, "type", "NODE")
  callNamed("setVariable", "room.class.factor.domestic", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "[", "\""), "CRoomWorker"), "\""), ", "), "\""), "CRoomFactorDomestic"), "\""), "]"))
  callNamed("setVariable", "room.class.visual.domestic", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "[", "\""), "CRoomWorker"), "\""), ", "), "\""), "CRoomAnchor"), "\""), ", "), "\""), "CRoomVisualDomestic"), "\""), "]"))
  callMethod("regMsgList", _this, 1)
}

