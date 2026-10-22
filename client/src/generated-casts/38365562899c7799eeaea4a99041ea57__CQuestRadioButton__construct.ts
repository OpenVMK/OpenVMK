// 38365562899c7799eeaea4a99041ea57.cct / CQuestRadioButton / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_ar_Elements", new LingoList([]));
  setMeProp(_me, "m_rWindow", "");
  setMeProp(_me, "m_ar_image", new LingoPropList([symbol("round"), new LingoPropList([]), symbol("rect"), new LingoPropList([])]));
  meProp(_me, "m_ar_image").round[symbol("Active")] = callNamed("member", callNamed("getmemnum", "button.radiobuttonb.1")).image;
  meProp(_me, "m_ar_image").round[symbol("passive")] = callNamed("member", callNamed("getmemnum", "button.radiobutton.0")).image;
  meProp(_me, "m_ar_image").rect[symbol("Active")] = callNamed("member", callNamed("getmemnum", "button.checkbox.1")).image;
  meProp(_me, "m_ar_image").rect[symbol("passive")] = callNamed("member", callNamed("getmemnum", "button.checkbox.0")).image;
}

