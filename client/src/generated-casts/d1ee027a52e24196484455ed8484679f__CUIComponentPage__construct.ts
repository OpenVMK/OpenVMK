// d1ee027a52e24196484455ed8484679f.cct / CUIComponentPage / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  var t_sWriterID = lingoBinary("join", "UIComponenPageWriter", callNamed("getUniqueID"));
  var t_iMemNum = callNamed("createMember", t_sWriterID, symbol("text"));
  var t_rMem = callNamed("member", t_iMemNum);
  setThePropOf(t_rMem, "font", "Arial");
  setThePropOf(t_rMem, "wordWrap", 0);
  setThePropOf(t_rMem, "fontStyle", new LingoList([symbol("plain")]));
  setThePropOf(t_rMem, "fontSize", 12);
  setThePropOf(t_rMem, "antialias", 0);
  setThePropOf(t_rMem, "antiAliasThreshold", 11);
  setThePropOf(t_rMem, "color", callNamed("rgb", 250, 250, 250));
  setMeProp(_me, "m_rWriter", t_rMem);
  setMeProp(_me, "m_ar_components", new LingoList([]));
  setMeProp(_me, "m_bHasController", 0);
  setMeProp(_me, "m_iSortingOrder", symbol("fifo"));
  setMeProp(_me, "m_bNeedSorting", 1);
  setMeProp(_me, "m_rBlinker", callNamed("createObject", symbol("random"), "CCellBlinker"));
  setMeProp(_me, "m_rImgElement", undefined);
  setMeProp(_me, "m_ar_lastEvent", undefined);
  return 1;
}

