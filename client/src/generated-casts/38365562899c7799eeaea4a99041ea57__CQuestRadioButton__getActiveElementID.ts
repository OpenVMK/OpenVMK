// 38365562899c7799eeaea4a99041ea57.cct / CQuestRadioButton / getActiveElementID

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getActiveElementID(_me: LingoMe) {
  if (meProp(_me, "m_ar_Elements")[1].Active) {
  return 1;
  }

  if (meProp(_me, "m_ar_Elements")[2].Active) {
  return 2;
  }

  if (meProp(_me, "m_ar_Elements")[3].Active) {
  return 0;
  }

  return 0;
}

