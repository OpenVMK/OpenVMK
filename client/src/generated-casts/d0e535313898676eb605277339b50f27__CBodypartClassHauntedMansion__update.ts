// d0e535313898676eb605277339b50f27.cct / CBodypartClassHauntedMansion / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  var tAnimCntr = 0;
  var tAction = meProp(_me, "m_sAction");
  var tPart = meProp(_me, "m_sPart");
  setMeProp(_me, "m_iXFix", 0);
  setMeProp(_me, "m_iYFix", 0);
  var t_sActHands = _me.m_sStatusHands;
  var t_sStatusLegs = _me.m_sStatusLegs;
  if (lingoBinary("eq", tPart, "pn")) {
  tAction = t_sStatusLegs;
  }

  if (lingoBinary("eq", tPart, "ch")) {
  tAction = t_sActHands;
  }

  var t_ar_List = _me.m_ar_FaceList;
  var t_iCount = t_ar_List.count;
  if (lingoBinary("eq", t_iCount, 8)) {
  switch (tPart) {
case "hd":
  setMeProp(_me, "m_iBodyDir", _me.m_iHeadDir);
  var tdir = meProp(_me, "m_arFlipList")[lingoBinary("add", meProp(_me, "m_iBodyDir"), 1)];
  t_iCount = t_ar_List.count;
  if (lingoBinary("lte", meProp(_me, "m_iBodyDir"), t_iCount)) {
  var t_Img = t_ar_List[lingoBinary("add", meProp(_me, "m_iBodyDir"), 1)];
  if ((lingoTruthy(callNamed("voidp", t_Img)) ? 0 : 1)) {
  callMethod("copyPixels", _me.m_imgBuffer, t_Img, t_Img.rect, _me.m_imgBuffer.rect)
  }

  var t_ImgAlpha = _me.m_ar_FaceListAlpha[lingoBinary("add", meProp(_me, "m_iBodyDir"), 1)];
  if ((lingoTruthy(callNamed("voidp", t_ImgAlpha)) ? 0 : 1)) {
  callMethod("copyPixels", _me.m_rAlpha, t_ImgAlpha, t_ImgAlpha.rect, _me.m_rAlpha.rect, new LingoPropList([symbol("ink"), 39]))
  }

  }

  return 1;
case "hr":
case "fc":
case "ey":
  return 1;
  break;
  break;
  }

  }

  switch (tPart) {
case "ht":
case "hd":
case "hr":
case "fc":
case "ey":
  setMeProp(_me, "m_iBodyDir", _me.m_iHeadDir);
  tdir = meProp(_me, "m_arFlipList")[lingoBinary("add", meProp(_me, "m_iBodyDir"), 1)];
  break;
  default:
  setMeProp(_me, "m_iBodyDir", _me.m_iBdDir);
  tdir = meProp(_me, "m_arFlipList")[lingoBinary("add", meProp(_me, "m_iBodyDir"), 1)];
  break;
  break;
  break;
  break;
  }

  if (lingoBinary("eq", meProp(_me, "m_iBodyDir"), tdir)) {
  var t_bFlipped = 0;
  } else {
  t_bFlipped = 1;
  }

  switch (tPart) {
case "pn":
case "ch":
  if (lingoBinary("eq", meProp(_me, "m_sAction"), "wlk")) {
  tAnimCntr = _me.m_iAnimCounter;
  }

  break;
case "fc":
  if (_me.m_bActTlk) {
  tAction = "spk";
  tAnimCntr = lingoBinary("mod", _me.m_iAnimCounter, 2);
  }

  break;
case "ey":
  if (lingoBinary("and", _me.m_bActTlk, lingoBinary("eq", lingoBinary("mod", _me.m_iAnimCounter, 2), 0))) {
  setMeProp(_me, "m_iYFix", -float(1));
  }

  break;
  break;
  }

  if (lingoBinary("and", lingoBinary("eq", tAction, "spk"), lingoBinary("eq", tAnimCntr, 1))) {
  tAction = "std";
  tAnimCntr = 0;
  }

  var tMemString = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", tAction, "_"), tPart), "_"), meProp(_me, "m_iModel")), "_"), tdir), "_"), tAnimCntr);
  switch (meProp(_me, "m_sPart")) {
case "pn":
  if (lingoBinary("eq", t_sStatusLegs, "wlk")) {
  tAnimCntr = _me.m_iAnimCounter;
  tMemString = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", t_sStatusLegs, "_"), tPart), "_"), meProp(_me, "m_iModel")), "_"), tdir), "_"), tAnimCntr);
  }

  break;
case "ch":
  if (lingoBinary("eq", t_sStatusLegs, "wlk")) {
  tAnimCntr = _me.m_iAnimCounter;
  tMemString = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", t_sStatusLegs, "_"), tPart), "_"), meProp(_me, "m_iModel")), "_"), tdir), "_"), tAnimCntr);
  }

  if (lingoBinary("eq", _me.m_sStatusHands, "rtl")) {
  tAnimCntr = lingoBinary("mod", _me.m_iAnimCounter, 2);
  tMemString = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "rtl", "_"), tPart), "_"), meProp(_me, "m_iModel")), "_"), tdir), "_"), tAnimCntr);
  }

  if (lingoBinary("eq", _me.m_sStatusHands, "cth")) {
  tAnimCntr = lingoBinary("mod", _me.m_iAnimCounter, 2);
  tMemString = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "cth", "_"), tPart), "_"), meProp(_me, "m_iModel")), "_"), tdir), "_"), tAnimCntr);
  callMethod("ShowBeam", _me, tAnimCntr)
  } else {
  callMethod("ShowBeam", _me)
  }

  break;
case "ri":
  break;
  }

  if (lingoBinary("neq", meProp(_me, "m_sMem"), tMemString)) {
  var t_rCacheData = meProp(_me, "m_rImageCache")[tMemString];
  if ((lingoTruthy(callNamed("voidp", t_rCacheData)) ? 0 : 1)) {
  var tRegPnt = t_rCacheData.point;
  var tX = lingoBinary("add", -float(tRegPnt[1]), 25);
  var tY = lingoBinary("sub", lingoBinary("sub", _me.m_imgBuffer.rect.height, tRegPnt[2]), 20);
  setThePropOf(_me, "pUpdateRect", callNamed("union", _me.pUpdateRect, meProp(_me, "m_rCacheRectA")));
  setMeProp(_me, "m_imgCache", callMethod("duplicate", t_rCacheData.image));
  setMeProp(_me, "m_rCacheRectA", lingoBinary("add", lingoBinary("add", callNamed("rect", tX, tY, lingoBinary("add", tX, meProp(_me, "m_imgCache").width), lingoBinary("add", tY, meProp(_me, "m_imgCache").height)), new LingoList([meProp(_me, "m_iXFix"), meProp(_me, "m_iYFix"), meProp(_me, "m_iXFix"), meProp(_me, "m_iYFix")])), callNamed("rect", _me.m_iLocFix, _me.m_iLocFix)));
  setMeProp(_me, "m_rCacheRectB", meProp(_me, "m_imgCache").rect);
  setThePropOf(_me, "pUpdateRect", callNamed("union", _me.pUpdateRect, meProp(_me, "m_rCacheRectA")));
  } else {
  return;
  }

  }

  if (lingoBinary("and", (lingoTruthy(callNamed("voidp", meProp(_me, "m_imgCache"))) ? 0 : 1), lingoBinary("neq", meProp(_me, "m_imgCache"), 0))) {
  callMethod("copyPixels", _me.m_imgBuffer, meProp(_me, "m_imgCache"), meProp(_me, "m_rCacheRectA"), meProp(_me, "m_rCacheRectB"), meProp(_me, "m_mpDrawProps"))
  var t_rAlpha = t_rCacheData.alpha;
  if ((lingoTruthy(callNamed("voidp", t_rAlpha)) ? 0 : 1)) {
  callMethod("copyPixels", _me.m_rAlpha, t_rAlpha, meProp(_me, "m_rCacheRectA"), meProp(_me, "m_rCacheRectB"), new LingoPropList([symbol("ink"), 39]))
  }

  }

}

