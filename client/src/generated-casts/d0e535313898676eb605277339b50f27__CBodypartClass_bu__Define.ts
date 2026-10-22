// d0e535313898676eb605277339b50f27.cct / CBodypartClass_bu / Define

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Define(_me: LingoMe, tPart: LingoValue, tmodel: LingoValue, tColor: LingoValue, tDirection: LingoValue, tAction: LingoValue, tAncestor: LingoValue) {
  setMeProp(_me, "ancestor", tAncestor);
  setMeProp(_me, "m_sPart", tPart);
  setMeProp(_me, "m_iModel", tmodel);
  setMeProp(_me, "m_mpDrawProps", new LingoPropList([symbol("maskImage"), 0, symbol("ink"), 0, symbol("bgColor"), 0]));
  setMeProp(_me, "m_imgCache", 0);
  setMeProp(_me, "m_rCacheRectA", callNamed("rect", 0, 0, 0, 0));
  setMeProp(_me, "m_rCacheRectB", callNamed("rect", 0, 0, 0, 0));
  setMeProp(_me, "m_iBodyDir", tDirection);
  setMeProp(_me, "m_sAction", tAction);
  setMeProp(_me, "m_sActionLh", tAction);
  setMeProp(_me, "m_sActionRh", tAction);
  setMeProp(_me, "m_sMem", "");
  setMeProp(_me, "m_iXFix", 0);
  setMeProp(_me, "m_iYFix", 0);
  setMeProp(_me, "m_bAnimation", 0);
  setMeProp(_me, "m_iAnimFrame", 1);
  setMeProp(_me, "m_iTotalFrame", 1);
  setMeProp(_me, "m_iXcorrection", 0);
  setMeProp(_me, "m_iYcorrection", 0);
  setMeProp(_me, "m_rImageCache", callMethod("GetImageCache", callMethod("GetClothAssetManager", callNamed("getThread", symbol("AvatarFactory")).component)));
  if (lingoBinary("gt", tmodel, 0)) {
  callMethod("defineInk", _me)
  }

  callMethod("setColor", _me, tColor)
  setMeProp(_me, "m_Color", tColor);
  setMeProp(_me, "m_sSetID", undefined);
  setMeProp(_me, "m_arFlipList", new LingoList([0, 1, 2, 3, 4, 3, 2, 1]));
  return 1;
}

