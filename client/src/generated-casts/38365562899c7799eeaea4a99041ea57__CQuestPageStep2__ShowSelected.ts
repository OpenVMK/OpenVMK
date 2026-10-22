// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep2 / ShowSelected

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowSelected(_me: LingoMe) {
  var t_rItem = callMethod("GetSelected", meProp(_me, "m_rGridRenderer"));
  var t_iCode = t_rItem.code;
  var t_rBack = callMethod("duplicate", callNamed("getMember", "previewbox").image);
  if (lingoBinary("lt", t_iCode, 0)) {
  }

}

