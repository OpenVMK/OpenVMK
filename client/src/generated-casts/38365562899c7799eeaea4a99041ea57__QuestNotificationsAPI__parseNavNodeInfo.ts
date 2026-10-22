// 38365562899c7799eeaea4a99041ea57.cct / QuestNotificationsAPI / parseNavNodeInfo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function parseNavNodeInfo(_me: LingoMe, t_ar_List: LingoValue) {
  var t_sNodeText = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "\t", "\t"), "<ITEM ID="), "\""), "%code%"), "\""), ">"), "\r"), "\t"), "\t"), "\t"), "<NODE ID="), "\""), "1"), "\""), " CAPTION="), "\""), "ROOM.%code%.NAME"), "\""), " EVENT="), "\""), "room.%code%"), "\""), " />"), "\r"), "\t"), "\t"), "</ITEM>");
  var t_sContent = "\r";
  if (callNamed("listp", t_ar_List)) {
  for (var t_rNode of t_ar_List.toArray()) {
  if (callNamed("listp", t_rNode)) {
  var t_iTag = t_rNode[symbol("tag")];
  t_sContent = lingoBinary("join", lingoBinary("join", t_sContent, callNamed("replaceChunks", t_sNodeText, "%code%", t_iTag)), "\r");
  }

  }

  }

  callNamed("put", t_sContent)
}

