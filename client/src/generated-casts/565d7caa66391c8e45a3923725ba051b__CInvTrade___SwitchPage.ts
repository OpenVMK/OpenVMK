// 565d7caa66391c8e45a3923725ba051b.cct / CInvTrade / _SwitchPage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _SwitchPage(_me: LingoMe, _this: LingoValue, a_kNewPage: LingoValue) {
  setMeProp(_me, "m_kCategory", a_kNewPage);
  callMethod("hide", callMethod("getElement", meProp(_me, "m_rWindow"), "tra.tab.posters.active"))
  callMethod("hide", callMethod("getElement", meProp(_me, "m_rWindow"), "tra.tab.clothes.active"))
  callMethod("hide", callMethod("getElement", meProp(_me, "m_rWindow"), "tra.tab.pins.active"))
  callMethod("hide", callMethod("getElement", meProp(_me, "m_rWindow"), "tra.tab.furniture.active"))
  switch (a_kNewPage) {
case symbol("items"):
  callMethod("show", callMethod("getElement", meProp(_me, "m_rWindow"), "tra.tab.furniture.active"))
  callMethod("_RefreshItemList", _this, meProp(_me, "m_mp_kType_mp_iRef_rItem"), symbol("items"))
  break;
case symbol("pins"):
  callMethod("show", callMethod("getElement", meProp(_me, "m_rWindow"), "tra.tab.pins.active"))
  callMethod("_RefreshItemList", _this, meProp(_me, "m_mp_kType_mp_iRef_rItem"), symbol("pins"))
  break;
case symbol("clothes"):
  callMethod("show", callMethod("getElement", meProp(_me, "m_rWindow"), "tra.tab.clothes.active"))
  callMethod("_RefreshItemList", _this, meProp(_me, "m_mp_kType_mp_iRef_rItem"), symbol("clothes"))
  break;
case symbol("posters"):
  callMethod("show", callMethod("getElement", meProp(_me, "m_rWindow"), "tra.tab.posters.active"))
  callMethod("_RefreshItemList", _this, meProp(_me, "m_mp_kType_mp_iRef_rItem"), symbol("posters"))
  break;
  default:
  callNamed("error", _this, lingoBinary("joinPad", "Fucked up trade page:", a_kNewPage), symbol("_SwitchPage"))
  callMethod("_SwitchPage", _this, symbol("items"))
  }

}

