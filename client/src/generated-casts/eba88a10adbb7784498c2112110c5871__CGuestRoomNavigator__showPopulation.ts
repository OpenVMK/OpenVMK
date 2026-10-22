// eba88a10adbb7784498c2112110c5871.cct / CGuestRoomNavigator / showPopulation

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showPopulation(_me: LingoMe) {
  callMethod("clearPopulation", _me)
  var tMem = callNamed("getmemnum", "roomspace.indicator");
  if (callNamed("integerp", meProp(_me, "m_selectedRoomData")["UserCount"])) {
  var t_iPercent = meProp(_me, "m_selectedRoomData")["UserCount"];
  var t_iCount = 0;
  if (lingoBinary("and", lingoBinary("gt", t_iPercent, 0), lingoBinary("lte", t_iPercent, 50))) {
  t_iCount = 1;
  } else {
  if (lingoBinary("and", lingoBinary("gt", t_iPercent, 50), lingoBinary("lt", t_iPercent, 100))) {
  t_iCount = 2;
  } else {
  if (lingoBinary("gte", t_iPercent, 100)) {
  t_iCount = 3;
  if (lingoBinary("gte", t_iPercent, 120)) {
  tMem = callNamed("getmemnum", "roomspace.indicator.full");
  }

  }

  }

  }

  } else {
  t_iCount = 0;
  }

  var tWnd = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  if (lingoBinary("neq", tWnd, 0)) {
  if (lingoBinary("neq", tMem, 0)) {
  var tImg = callNamed("member", tMem).image;
  var tVisibleMickeys = 3;
  for (var i = 1; i <= t_iCount; ++i) {
  var tElem = callMethod("getElement", tWnd, lingoBinary("join", "nav.roominfo.population", i));
  if (lingoBinary("neq", tElem, 0)) {
  callMethod("feedImage", tElem, tImg)
  }

  }

  }

  }

}

