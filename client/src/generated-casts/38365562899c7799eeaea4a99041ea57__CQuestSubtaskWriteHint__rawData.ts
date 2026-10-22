// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskWriteHint / rawData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function rawData(_me: LingoMe, t_ar_data: LingoValue) {
  callNamed("put", lingoBinary("joinPad", "Fill blanks (Write Hint)", t_ar_data[symbol("desc")]))
  var t_sNewLine = callNamed("numToChar", 10);
  var t_sReturn = callNamed("numToChar", 13);
  var t_sDesc = callNamed("replaceChunks", t_ar_data[symbol("desc")], t_sNewLine, t_sReturn);
  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.taskhint.input", t_sDesc)
  setMeProp(_me, "m_iCurrentID", t_ar_data[symbol("photoId")]);
  callMethod("reDraw", _me)
}

