// vmk_hm_minigame.cct / CHMStage / load

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function load(_me: LingoMe, a_sName: LingoValue, i_iVersion: LingoValue) {
  setMeProp(_me, "m_sMusicName", "");
  callNamed("put", lingoBinary("joinPad", "CHMStage.Load()", a_sName))
  if (lingoBinary("contains", a_sName, ".xml")) {
  var t_rXML = callNamed("CreateXML", callNamed("member", a_sName).text);
  } else {
  t_rXML = callNamed("CreateXML", callNamed("member", lingoBinary("join", lingoBinary("join", "stage.", a_sName), ".xml")).text);
  }

  if (callMethod("Search", t_rXML, "type", "HAUNTED_MANSION", 0)) {
  var t_iVersion = callNamed("value", callMethod("GetParam", t_rXML, "VERSION"));
  var t_bVersionOK = 0;
  if (lingoBinary("eq", t_iVersion, i_iVersion)) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", "Stage versions MATCH client:", t_iVersion), "server:"), i_iVersion))
  t_bVersionOK = 1;
  } else {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", "Stage MisMatch client:", t_iVersion), "server:"), i_iVersion))
  }

  if (callMethod("Search", t_rXML, "type", "ITEMS", 1)) {
  setMeProp(_me, "m_ar_items", new LingoList([]));
  var tCount = callMethod("count", t_rXML);
  for (var i = 1; i <= tCount; ++i) {
  var tItem = t_rXML[i];
  callMethod("append", meProp(_me, "m_ar_items"), tItem)
  }

  }

  if (callMethod("Search", t_rXML, "type", "ROOM", 1)) {
  setMeProp(_me, "m_sVisual", callMethod("GetParam", t_rXML, "NAME"));
  } else {
  setMeProp(_me, "m_sVisual", "");
  }

  if (callMethod("Search", t_rXML, "type", "MUSIC", 1)) {
  setMeProp(_me, "m_sMusicName", callMethod("GetParam", t_rXML, "PLAY"));
  } else {
  setMeProp(_me, "m_sMusicName", "");
  }

  } else {
  callNamed("put", "Haunted Mansion stage-file, in incorrect format!")
  }

  callNamed("createTimeout", "hmstartroomsound", 1000, symbol("startSound"), callMethod("getID", _me), undefined, 1)
}

