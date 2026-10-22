// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomHandler / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_rXMLElement", callNamed("CreateXML", callNamed("getMember", "room.object.element.xml").text));
  callMethod("Search", meProp(_me, "m_rXMLElement"), "type", "NODE")
  setMeProp(_me, "m_rXMLAvatar", callNamed("CreateXML", callNamed("getMember", "room.object.avatar.xml").text));
  callMethod("Search", meProp(_me, "m_rXMLAvatar"), "type", "NODE")
  setMeProp(_me, "m_rXMLPoster", callNamed("CreateXML", callNamed("getMember", "room.object.poster.xml").text));
  callMethod("Search", meProp(_me, "m_rXMLPoster"), "type", "NODE")
  setMeProp(_me, "m_rXMLCollectable", callNamed("CreateXML", callNamed("getMember", "room.object.collectable.xml").text));
  callMethod("Search", meProp(_me, "m_rXMLCollectable"), "type", "NODE")
  setMeProp(_me, "m_iIDMaker", 0);
  return callMethod("_Config", _this, 1);
}

