// vmk_text_scroller.cct / CTextScrollRendererIsometric / updateDisplay

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateDisplay(_me: LingoMe, i_Text: LingoValue) {
  callMethod("clearArea", _me)
  var t_offsetX = 0;
  var t_offsetY = 0;
  for (var i = 1; i <= i_Text.char.count; ++i) {
  var t_char = i_Text.char[i];
  var t_Img = callMethod("getChar", meProp(_me, "m_BitmapFont"), t_char);
  t_offsetY = lingoBinary("mul", t_offsetX, callNamed("cos", meProp(_me, "m_iAngle")));
  var t_totalOffset = lingoBinary("add", callNamed("rect", t_offsetX, t_offsetY, t_offsetX, t_offsetY), callNamed("rect", meProp(_me, "m_pOffset"), meProp(_me, "m_pOffset")));
  callMethod("copyPixels", meProp(_me, "m_pImage"), t_Img, lingoBinary("add", t_Img.rect, t_totalOffset), t_Img.rect)
  t_offsetX = lingoBinary("add", t_offsetX, t_Img.width);
  }

}

