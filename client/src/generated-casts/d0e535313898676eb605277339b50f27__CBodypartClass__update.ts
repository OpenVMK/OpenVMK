// d0e535313898676eb605277339b50f27.cct / CBodypartClass / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  if ((lingoTruthy(callNamed("objectp", meProp(_me, "ancestor"))) ? 0 : 1)) {
  return;
  }

  if (lingoBinary("eq", meProp(_me, "m_sAction"), "null")) {
  return;
  }

  var tAnimCntr = 0;
  var tAction = meProp(_me, "m_sAction");
  var tPart = meProp(_me, "m_sPart");
  setMeProp(_me, "m_iXFix", 0);
  setMeProp(_me, "m_iYFix", 0);
  var t_sActLeftHand = _me.m_sStatusLeftHand;
  var t_sActRightHand = _me.m_sStatusRightHand;
  var t_sStatusLegs = _me.m_sStatusLegs;
  switch (tPart) {
case "ht":
case "hd":
case "hr":
case "fc":
case "ey":
  setMeProp(_me, "m_iBodyDir", _me.m_iHeadDir);
  var tdir = meProp(_me, "m_arFlipList")[lingoBinary("add", meProp(_me, "m_iBodyDir"), 1)];
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

  switch (meProp(_me, "m_sPart")) {
case "bd":
case "llg":
case "lsh":
case "lpn":
case "rlg":
case "rsh":
case "rpn":
  if (lingoBinary("eq", meProp(_me, "m_sAction"), "wlk")) {
  tAnimCntr = _me.m_iAnimCounter;
  }

  break;
case "lh":
case "ls":
  if ((lingoTruthy(t_bFlipped) ? 0 : 1)) {
  tAction = t_sActLeftHand;
  } else {
  tAction = t_sActRightHand;
  }

  if (lingoBinary("eq", tAction, "wlk")) {
  tAnimCntr = _me.m_iAnimCounter;
  } else {
  if (lingoBinary("eq", tAction, "wav")) {
  tAnimCntr = lingoBinary("mod", _me.m_iAnimCounter, 2);
  }

  }

  break;
case "rh":
case "rs":
  if ((lingoTruthy(t_bFlipped) ? 0 : 1)) {
  tAction = t_sActRightHand;
  } else {
  tAction = t_sActLeftHand;
  }

  if (lingoBinary("eq", tAction, "wlk")) {
  tAnimCntr = _me.m_iAnimCounter;
  } else {
  if (lingoBinary("eq", tAction, "wav")) {
  tAnimCntr = lingoBinary("mod", _me.m_iAnimCounter, 2);
  }

  }

  break;
case "fc":
  if (_me.m_bActTlk) {
  tAction = "spk";
  tAnimCntr = lingoBinary("mod", _me.m_iAnimCounter, 2);
  }

  break;
case "ey":
  break;
case "tr":
  if (lingoBinary("or", lingoBinary("eq", tAction, "wlk"), _me.m_bActSit)) {
  tAction = "std";
  }

  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  }

  if (lingoBinary("and", lingoBinary("eq", tAction, "spk"), lingoBinary("eq", tAnimCntr, 1))) {
  tAction = "std";
  tAnimCntr = 0;
  }

  if (lingoBinary("eq", tAction, "drk")) {
  tAnimCntr = lingoBinary("mod", _me.m_iAnimCounter, 2);
  }

  var t_sAction = undefined;
  switch (meProp(_me, "m_sPart")) {
case "lh":
case "ls":
  if (lingoBinary("eq", tAction, "crr")) {
  tAnimCntr = 0;
  tAction = "drk";
  }

  break;
case "rh":
case "rs":
  if (lingoBinary("eq", tAction, "crr")) {
  tAnimCntr = 0;
  tAction = "drk";
  }

  break;
  break;
  break;
  }

  if (lingoBinary("eq", tAction, "wav2")) {
  tAnimCntr = 1;
  tAction = "wav";
  }

  if (lingoBinary("and", lingoBinary("neq", tPart, "li"), lingoBinary("neq", tPart, "ri"))) {
  var tMemString = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", tAction, "_"), tPart), "_"), meProp(_me, "m_iModel")), "_"), tdir), "_"), tAnimCntr);
  } else {
  if (lingoBinary("eq", tPart, "li")) {
  setMeProp(_me, "m_iModel", _me.m_iItemLeftHand);
  if ((lingoTruthy(t_bFlipped) ? 0 : 1)) {
  if (lingoBinary("eq", t_sActLeftHand, "drk")) {
  tAnimCntr = lingoBinary("mod", _me.m_iAnimCounter, 2);
  if (lingoBinary("neq", meProp(_me, "m_iModel"), 1001)) {
  tMemString = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "drk_lfood_", meProp(_me, "m_iModel")), "_"), tdir), "_"), tAnimCntr);
  } else {
  tMemString = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "drk_vmks_item_", 1), "_"), tdir), "_"), tAnimCntr);
  }

  } else {
  if (lingoBinary("eq", t_sActLeftHand, "crr")) {
  tAnimCntr = 0;
  tAction = "drk";
  }

  if (lingoBinary("neq", meProp(_me, "m_iModel"), 1001)) {
  tMemString = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "drk_lfood_", meProp(_me, "m_iModel")), "_"), tdir), "_"), tAnimCntr);
  } else {
  tMemString = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "drk_vmks_item_", 1), "_"), tdir), "_"), tAnimCntr);
  }

  }

  } else {
  if (lingoBinary("eq", t_sActLeftHand, "drk")) {
  tAnimCntr = lingoBinary("mod", _me.m_iAnimCounter, 2);
  if (lingoBinary("neq", meProp(_me, "m_iModel"), 1001)) {
  tMemString = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "drk_rfood_", meProp(_me, "m_iModel")), "_"), tdir), "_"), tAnimCntr);
  } else {
  tMemString = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "drk_vmks_item_", 1), "_"), tdir), "_"), tAnimCntr);
  }

  } else {
  if (lingoBinary("eq", t_sActLeftHand, "crr")) {
  tAnimCntr = 0;
  tAction = "drk";
  }

  if (lingoBinary("neq", meProp(_me, "m_iModel"), 1001)) {
  tMemString = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "drk_rfood_", meProp(_me, "m_iModel")), "_"), tdir), "_"), tAnimCntr);
  } else {
  tMemString = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "drk_vmks_item_", 1), "_"), tdir), "_"), tAnimCntr);
  }

  }

  }

  }

  if (lingoBinary("eq", tPart, "ri")) {
  setMeProp(_me, "m_iModel", _me.m_iItemRightHand);
  if ((lingoTruthy(t_bFlipped) ? 0 : 1)) {
  if (lingoBinary("eq", t_sActLeftHand, "drk")) {
  tAnimCntr = lingoBinary("mod", _me.m_iAnimCounter, 2);
  if (lingoBinary("neq", meProp(_me, "m_iModel"), 1001)) {
  tMemString = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "drk_rfood_", meProp(_me, "m_iModel")), "_"), tdir), "_"), tAnimCntr);
  } else {
  tMemString = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "drk_vmks_item_", 1), "_"), tdir), "_"), tAnimCntr);
  }

  } else {
  if (lingoBinary("eq", t_sActLeftHand, "crr")) {
  tAnimCntr = 0;
  tAction = "drk";
  }

  if (lingoBinary("neq", meProp(_me, "m_iModel"), 1001)) {
  tMemString = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "drk_lfood_", meProp(_me, "m_iModel")), "_"), tdir), "_"), tAnimCntr);
  } else {
  tMemString = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "drk_vmks_item_", 1), "_"), tdir), "_"), tAnimCntr);
  }

  }

  } else {
  if (lingoBinary("eq", t_sActRightHand, "drk")) {
  tAnimCntr = lingoBinary("mod", _me.m_iAnimCounter, 2);
  if (lingoBinary("neq", meProp(_me, "m_iModel"), 1001)) {
  tMemString = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "drk_lfood_", meProp(_me, "m_iModel")), "_"), tdir), "_"), tAnimCntr);
  } else {
  tMemString = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "drk_vmks_item_", 1), "_"), tdir), "_"), tAnimCntr);
  }

  } else {
  if (lingoBinary("eq", t_sActRightHand, "crr")) {
  tAnimCntr = 0;
  tAction = "drk";
  }

  if (lingoBinary("neq", meProp(_me, "m_iModel"), 1001)) {
  tMemString = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "drk_lfood_", meProp(_me, "m_iModel")), "_"), tdir), "_"), tAnimCntr);
  } else {
  tMemString = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "drk_vmks_item_", 1), "_"), tdir), "_"), tAnimCntr);
  }

  }

  }

  }

  }

  if (_me.m_bAnimating) {
  switch (meProp(_me, "m_sPart")) {
case "lh":
case "ls":
  if ((lingoTruthy(t_bFlipped) ? 0 : 1)) {
  if (lingoBinary("eq", _me.m_sStatusLeftHand, "wav")) {
  tAnimCntr = lingoBinary("mod", _me.m_iAnimCounter, 2);
  tMemString = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "wav", "_"), tPart), "_"), meProp(_me, "m_iModel")), "_"), tdir), "_"), tAnimCntr);
  } else {
  if (lingoBinary("eq", _me.m_sStatusLeftHand, "dnc")) {
  tMemString = callMethod("animate", _me);
  }

  }

  } else {
  if (lingoBinary("eq", _me.m_sStatusRightHand, "wav")) {
  tAnimCntr = lingoBinary("mod", _me.m_iAnimCounter, 2);
  tMemString = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "wav", "_"), tPart), "_"), meProp(_me, "m_iModel")), "_"), tdir), "_"), tAnimCntr);
  } else {
  if (lingoBinary("eq", _me.m_sStatusRightHand, "dnc")) {
  tMemString = callMethod("animate", _me);
  }

  }

  }

  break;
case "rh":
case "rs":
  if ((lingoTruthy(t_bFlipped) ? 0 : 1)) {
  if (lingoBinary("eq", _me.m_sStatusRightHand, "wav")) {
  tAnimCntr = lingoBinary("mod", _me.m_iAnimCounter, 2);
  tMemString = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "wav", "_"), tPart), "_"), meProp(_me, "m_iModel")), "_"), tdir), "_"), tAnimCntr);
  } else {
  if (lingoBinary("eq", _me.m_sStatusRightHand, "dnc")) {
  tMemString = callMethod("animate", _me);
  }

  }

  } else {
  if (lingoBinary("eq", _me.m_sStatusLeftHand, "wav")) {
  tAnimCntr = lingoBinary("mod", _me.m_iAnimCounter, 2);
  tMemString = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "wav", "_"), tPart), "_"), meProp(_me, "m_iModel")), "_"), tdir), "_"), tAnimCntr);
  } else {
  if (lingoBinary("eq", _me.m_sStatusLeftHand, "dnc")) {
  tMemString = callMethod("animate", _me);
  }

  }

  }

  break;
case "llg":
case "lsh":
case "lpn":
case "rlg":
case "rsh":
case "rpn":
  if (lingoBinary("eq", t_sStatusLegs, "dnc")) {
  tMemString = callMethod("animate", _me);
  } else {
  if (lingoBinary("eq", t_sStatusLegs, "wlk")) {
  tAnimCntr = _me.m_iAnimCounter;
  tMemString = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", t_sStatusLegs, "_"), tPart), "_"), meProp(_me, "m_iModel")), "_"), tdir), "_"), tAnimCntr);
  }

  }

  break;
  default:
  if (lingoBinary("eq", lingoBinary("mod", _me.m_iAnimCounter, 2), 1)) {
  tMemString = callMethod("animate", _me);
  }

  break;
  break;
  break;
  break;
  break;
  break;
  break;
  }

  }

  if (lingoBinary("eq", tAction, "float")) {
  switch (meProp(_me, "m_sPart")) {
case "lh":
  if (t_bFlipped) {
  tMemString = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "wlk_rh_", meProp(_me, "m_iModel")), "_"), tdir), "_"), 2);
  } else {
  tMemString = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "wlk_lh_", meProp(_me, "m_iModel")), "_"), tdir), "_"), 2);
  }

  break;
case "ls":
  if (t_bFlipped) {
  } else {
  tMemString = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "wlk_ls_", meProp(_me, "m_iModel")), "_"), tdir), "_"), 2);
  }

  break;
  }

  }

  if (lingoBinary("neq", undefined, meProp(_me, "m_sSetAnimFrame"))) {
  tMemString = meProp(_me, "m_sSetAnimFrame");
  }

  if (lingoBinary("neq", meProp(_me, "m_sMem"), tMemString)) {
  var t_mp_rCacheData = meProp(_me, "m_rImageCache")[tMemString];
  if ((lingoTruthy(callNamed("voidp", t_mp_rCacheData)) ? 0 : 1)) {
  var tRegPnt = t_mp_rCacheData.point;
  var tX = lingoBinary("add", -float(tRegPnt[1]), 40);
  var tY = lingoBinary("sub", lingoBinary("sub", _me.m_imgBuffer.rect.height, tRegPnt[2]), 20);
  setThePropOf(_me, "pUpdateRect", callNamed("union", _me.pUpdateRect, meProp(_me, "m_rCacheRectA")));
  setMeProp(_me, "m_imgCache", t_mp_rCacheData.image);
  setMeProp(_me, "m_rCacheRectA", lingoBinary("add", lingoBinary("add", callNamed("rect", tX, tY, lingoBinary("add", tX, meProp(_me, "m_imgCache").width), lingoBinary("add", tY, meProp(_me, "m_imgCache").height)), new LingoList([meProp(_me, "m_iXFix"), meProp(_me, "m_iYFix"), meProp(_me, "m_iXFix"), meProp(_me, "m_iYFix")])), callNamed("rect", _me.m_iLocFix, _me.m_iLocFix)));
  setMeProp(_me, "m_rCacheRectB", meProp(_me, "m_imgCache").rect);
  setThePropOf(_me, "pUpdateRect", callNamed("union", _me.pUpdateRect, meProp(_me, "m_rCacheRectA")));
  callMethod("copyPixels", _me.m_imgBuffer, meProp(_me, "m_imgCache"), meProp(_me, "m_rCacheRectA"), meProp(_me, "m_rCacheRectB"), meProp(_me, "m_mpDrawProps"))
  var t_ImgAlpha = t_mp_rCacheData.alpha;
  if ((lingoTruthy(callNamed("voidp", t_ImgAlpha)) ? 0 : 1)) {
  callMethod("copyPixels", _me.m_rAlpha, t_ImgAlpha, meProp(_me, "m_rCacheRectA"), meProp(_me, "m_rCacheRectB"), new LingoPropList([symbol("ink"), 39]))
  }

  if (lingoBinary("neq", undefined, meProp(_me, "m_sSetAnimFrame"))) {
  setMeProp(_me, "m_sSetAnimFrame", undefined);
  }

  }

  }

}

