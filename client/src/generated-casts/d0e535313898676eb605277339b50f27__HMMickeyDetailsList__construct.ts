// d0e535313898676eb605277339b50f27.cct / HMMickeyDetailsList / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_mp_List", new LingoPropList([]));
  setMeProp(_me, "m_objTopics", undefined);
  setMeProp(_me, "m_rWndObj", undefined);
  setMeProp(_me, "m_rClientElement", undefined);
  setMeProp(_me, "m_Img", undefined);
  setMeProp(_me, "m_ar_pTopics", new LingoList([]));
  setMeProp(_me, "m_ar_pLinks", new LingoList([]));
  setMeProp(_me, "m_ar_rects", new LingoList([]));
  setMeProp(_me, "m_fillColor", callNamed("rgb", "#001F55"));
  setMeProp(_me, "m_iItemWidth", 0);
  setMeProp(_me, "m_iItemHeight", 0);
  return 1;
}

