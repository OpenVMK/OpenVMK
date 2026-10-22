// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogFurniView / UpdatePreview

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdatePreview(_me: LingoMe, _this: LingoValue, a_mpItemList: LingoValue) {
  if (callNamed("listp", a_mpItemList)) {
  if (callNamed("objectp", meProp(_me, "m_rWndObj"))) {
  setMeProp(_me, "m_bGridRendered", 0);
  callMethod("ShowThumbs", _this, a_mpItemList[1])
  callMethod("ShowItemInfo", _this)
  }

  }

}

