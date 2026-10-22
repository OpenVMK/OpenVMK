// 38365562899c7799eeaea4a99041ea57.cct / CQuestBasePage / _ShowHideUI

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ShowHideUI(_me: LingoMe) {
  if (meProp(_me, "m_bVisible")) {
  callMethod("close", _me)
  } else {
  callMethod("open", _me)
  }

}

