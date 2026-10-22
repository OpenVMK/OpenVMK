// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoComponent / findAvatarinRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function findAvatarinRoom(_me: LingoMe, i_sAvatarName: LingoValue, i_ar_avatarInfo: LingoValue) {
  var tRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", symbol("room"))));
  if (callNamed("voidp", tRoomContext)) {
  return 0;
  }

  var t_rXML = callMethod("GetRoot", tRoomContext);
  for (var tNode of t_rXML.child.toArray()) {
  switch (tNode[symbol("type")]) {
case "NODE":
  if (lingoBinary("eq", tNode[symbol("param")]["CLASS"], "avatar")) {
  if (lingoBinary("eq", tNode[symbol("param")]["NAME"], i_sAvatarName)) {
  i_ar_avatarInfo["NAME"] = tNode[symbol("param")]["NAME"];
  i_ar_avatarInfo["SEX"] = tNode[symbol("param")]["SEX"];
  i_ar_avatarInfo["REF"] = tNode[symbol("param")]["REF"];
  i_ar_avatarInfo["DESC"] = tNode[symbol("param")]["DESC"];
  return 1;
  }

  }

  break;
  }

  }

  return 0;
}

