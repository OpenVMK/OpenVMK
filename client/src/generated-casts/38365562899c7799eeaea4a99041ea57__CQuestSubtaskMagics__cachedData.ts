// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskMagics / cachedData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function cachedData(_me: LingoMe, t_ar_data: LingoValue) {
  var t_ar_magics = callNamed("getAvailableMagics");
  callMethod("render", meProp(_me, "m_rGrid"), t_ar_magics, callMethod("getElement", meProp(_me, "m_rWindow"), "quest.magics"))
}

