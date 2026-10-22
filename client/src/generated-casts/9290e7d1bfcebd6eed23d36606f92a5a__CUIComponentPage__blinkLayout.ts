// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CUIComponentPage / blinkLayout

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function blinkLayout(_me: LingoMe, nodeData: LingoValue, nodeCell: LingoValue) {
  var t_ar_layOut = new LingoPropList([symbol("data"), nodeData, symbol("cell"), nodeCell, symbol("found"), new LingoList([])]);
  callNamed("executeMessage", symbol("SearchCellContainingData"), t_ar_layOut)
  var t_ar_found = t_ar_layOut[symbol("found")];
  if (lingoBinary("gt", t_ar_found.count, 0)) {
  var t_rLayout = t_ar_found[1];
  var t_pOffset = callMethod("GetComponentOffset", _me, callMethod("GetParentComponent", t_rLayout));
  var t_rRect = lingoBinary("add", callNamed("rect", t_pOffset, t_pOffset), callMethod("getRect", t_rLayout));
  var t_rBlinkImg = callMethod("GetBlinker", t_rLayout);
  if ((lingoTruthy(callNamed("objectp", t_rBlinkImg)) ? 0 : 1)) {
  t_rBlinkImg = callNamed("member", "emoticon_tn_6").image;
  }

  var t_rImg = t_rLayout.m_rRender;
  var t_rOffset = lingoBinary("div", lingoBinary("sub", t_rImg.rect, t_rBlinkImg.rect), 2);
  var t_pRectOff = callNamed("point", t_rOffset.width, t_rOffset.height);
  callMethod("copyPixels", t_rImg, t_rBlinkImg, lingoBinary("add", t_rBlinkImg.rect, callNamed("rect", t_pRectOff, t_pRectOff)), t_rBlinkImg.rect)
  t_pOffset = callNamed("point", t_rRect.left, t_rRect.top);
  callMethod("Init", meProp(_me, "m_rBlinker"), meProp(_me, "m_rImgElement"), t_rImg, t_pOffset)
  }

}

