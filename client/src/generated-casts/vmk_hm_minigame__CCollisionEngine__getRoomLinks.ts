// vmk_hm_minigame.cct / CCollisionEngine / getRoomLinks

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getRoomLinks(_me: LingoMe, t_rContext: LingoValue) {
  var t_ar_links = new LingoList([]);
  callMethod("sort", t_ar_links)
  var t_rIterator = callMethod("GetIterator", t_rContext, "link");
  if (callMethod("FirstToken", t_rIterator)) {
  while (1) {
  var t_rLink = callMethod("getToken", t_rIterator);
  if ((lingoTruthy(callNamed("objectp", t_rLink)) ? 0 : 1)) {
  break;
  }

  var t_ar_Link = new LingoList([]);
  for (var i = 1; i <= callMethod("GetCount", t_rLink); ++i) {
  callMethod("append", t_ar_Link, callMethod("GetParam", t_rLink[i], "REF"))
  }

  callMethod("append", t_ar_links, t_ar_Link)
  if ((lingoTruthy(callMethod("NextToken", t_rIterator)) ? 0 : 1)) {
  break;
  }

  }

  } else {
  var t_roomXML = callMethod("getComponent", callNamed("getThread", "room")).m_rRoomXML;
  if (callMethod("Search", t_roomXML, "type", "LINKS")) {
  for (var i = 1; i <= t_roomXML.child.count; ++i) {
  t_ar_Link = new LingoList([]);
  if (lingoBinary("eq", callMethod("getaProp", t_roomXML[i].param, "CLASS"), "link")) {
  for (var c = 1; c <= t_roomXML[i].child.count; ++c) {
  callMethod("append", t_ar_Link, callMethod("getaProp", t_roomXML[i].child[c].param, "REF"))
  }

  }

  callMethod("append", t_ar_links, t_ar_Link)
  }

  } else {
  callNamed("put", lingoBinary("joinPad", "Could not find links from room", t_roomXML))
  }

  }

  return t_ar_links;
}

