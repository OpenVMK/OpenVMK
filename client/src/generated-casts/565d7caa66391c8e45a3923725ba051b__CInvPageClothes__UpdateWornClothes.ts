// 565d7caa66391c8e45a3923725ba051b.cct / CInvPageClothes / UpdateWornClothes

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateWornClothes(_me: LingoMe, _this: LingoValue, a_mp_kType_mp_iRef_rItem: LingoValue, a_kAlteredCategory: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  if (lingoBinary("eq", a_kAlteredCategory, symbol("clothes"))) {
  var t_iCount = a_mp_kType_mp_iRef_rItem[symbol("clothes")].count;
  if (lingoBinary("gt", t_iCount, 0)) {
  var t_iCode = a_mp_kType_mp_iRef_rItem[symbol("clothes")][1].code;
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.clothes.onavatar1"), callNamed("getText", lingoBinary("join", "item.", t_iCode)))
  } else {
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.clothes.onavatar1"), "")
  }

  if (lingoBinary("gt", t_iCount, 1)) {
  t_iCode = a_mp_kType_mp_iRef_rItem[symbol("clothes")][2].code;
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.clothes.onavatar2"), callNamed("getText", lingoBinary("join", "item.", t_iCode)))
  } else {
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.clothes.onavatar2"), "")
  }

  if (lingoBinary("gt", t_iCount, 2)) {
  t_iCode = a_mp_kType_mp_iRef_rItem[symbol("clothes")][3].code;
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.clothes.onavatar3"), callNamed("getText", lingoBinary("join", "item.", t_iCode)))
  } else {
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.clothes.onavatar3"), "")
  }

  if (lingoBinary("gt", t_iCount, 3)) {
  t_iCode = a_mp_kType_mp_iRef_rItem[symbol("clothes")][4].code;
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.clothes.onavatar4"), callNamed("getText", lingoBinary("join", "item.", t_iCode)))
  } else {
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.clothes.onavatar4"), "")
  }

  }

  }

}

