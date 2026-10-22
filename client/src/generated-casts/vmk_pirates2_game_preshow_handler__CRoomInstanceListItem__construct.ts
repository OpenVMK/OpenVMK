// vmk_pirates2_game_preshow_handler.cct / CRoomInstanceListItem / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_Img", undefined);
  setMeProp(_me, "m_sWriterPlainID", lingoBinary("join", "RoomInstanceItem", callNamed("getUniqueID")));
  setMeProp(_me, "m_sWriterBoldID", lingoBinary("join", "RoomInstanceItem", callNamed("getUniqueID")));
  setMeProp(_me, "m_iMargin", 0);
  setMeProp(_me, "m_bState", 0);
  setMeProp(_me, "m_bSpecial", 0);
  setMeProp(_me, "m_iType", 2);
  setMeProp(_me, "m_sLand", undefined);
  setMeProp(_me, "m_tText", "");
  var tPlain = callNamed("getStructVariable", "struct.font.plain");
  var tBold = callNamed("getStructVariable", "struct.font.bold");
  var tLink = callNamed("getStructVariable", "struct.font.link");
  setThePropOf(tBold, "color", callNamed("rgb", 255, 80, 80));
  callNamed("createWriter", meProp(_me, "m_sWriterPlainID"), tPlain)
  callNamed("createWriter", meProp(_me, "m_sWriterBoldID"), tBold)
  callMethod("ResolveImage", _me)
}

