// eba88a10adbb7784498c2112110c5871.cct / CAdvancedNavItemList / click

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function click(_me: LingoMe, a_Pnt: LingoValue) {
  for (var tTopic of meProp(_me, "m_ar_pTopics").toArray()) {
  callMethod("setState", tTopic, 0)
  }

  var t_mpList = meProp(_me, "m_ar_rects");
  if (lingoBinary("gt", t_mpList.count, 0)) {
  if (lingoBinary("gt", t_mpList[t_mpList.count].bottom, a_Pnt.locV)) {
  for (var i = 1; i <= t_mpList.count; ++i) {
  if ((lingoTruthy(lingoBinary("gt", a_Pnt.locV, meProp(_me, "m_ar_rects")[i].bottom)) ? 0 : 1)) {
  var t_iPos = i;
  break;
  }

  }

  if (lingoBinary("and", lingoBinary("lt", t_mpList[t_iPos].left, a_Pnt.locH), lingoBinary("gt", t_mpList[t_iPos].right, a_Pnt.locH))) {
  callMethod("setState", meProp(_me, "m_ar_pTopics")[t_iPos], 1)
  }

  }

  }

  callMethod("render", _me)
  return meProp(_me, "m_Img");
}

