// vmk_central_handler.cct / HMMickeyDetailsListItem / ResolveImage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ResolveImage(_me: LingoMe) {
  setMeProp(_me, "m_bSpecial", 0);
  if ((lingoTruthy(meProp(_me, "m_bState")) ? 0 : 1)) {
  setMeProp(_me, "m_ImgBg", callNamed("image", meProp(_me, "m_iWidth"), meProp(_me, "m_iHeight"), 32));
  callMethod("fill", meProp(_me, "m_ImgBg"), meProp(_me, "m_ImgBg").rect, new LingoPropList([symbol("shapeType"), symbol("rect"), symbol("color"), callNamed("rgb", "#001F55")]))
  } else {
  setMeProp(_me, "m_ImgBg", callNamed("image", meProp(_me, "m_iWidth"), meProp(_me, "m_iHeight"), 32));
  callMethod("fill", meProp(_me, "m_ImgBg"), meProp(_me, "m_ImgBg").rect, new LingoPropList([symbol("shapeType"), symbol("rect"), symbol("color"), callNamed("rgb", "#038BBD")]))
  }

}

