// d0e535313898676eb605277339b50f27.cct / CMagicFactor / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, a_veAvatarLoc: LingoValue, a_SprAvatar: LingoValue) {
  setMeProp(_me, "m_veAvatarLoc", a_veAvatarLoc);
  if (lingoBinary("eq", meProp(_me, "m_iMagicFx"), 9)) {
  if (callNamed("listp", meProp(_me, "m_ar_StormImgList"))) {
  var t_Img = meProp(_me, "m_ar_StormImgList")[meProp(_me, "m_iStormCounter")];
  if (lingoBinary("neq", lingoBinary("sub", meProp(_me, "m_iStormCounter"), 1), meProp(_me, "m_arFlipList")[meProp(_me, "m_iStormCounter")])) {
  var t_img2 = callNamed("image", 80, 160, 32);
  callMethod("setAlpha", t_img2, callNamed("image", 80, 160, 8))
  setThePropOf(t_img2, "useAlpha", 1);
  var tQuad = new LingoList([callNamed("point", t_Img.width, 0), callNamed("point", 0, 0), callNamed("point", 0, t_Img.height), callNamed("point", t_Img.width, t_Img.height)]);
  callMethod("copyPixels", t_img2, t_Img, tQuad, t_Img.rect, lingoBinary("eq", symbol("useFastQuads"), 1))
  t_Img = t_img2;
  }

  setThePropOf(a_SprAvatar.member, "image", t_Img);
  var t_iH = lingoBinary("div", t_Img.width, 2);
  var t_iV = lingoBinary("sub", t_Img.height, 16);
  var t_pnt = callNamed("point", t_iH, t_iV);
  setThePropOf(a_SprAvatar.member, "regPoint", t_pnt);
  setMeProp(_me, "m_iStormCounter", lingoBinary("add", meProp(_me, "m_iStormCounter"), 1));
  if (lingoBinary("gt", meProp(_me, "m_iStormCounter"), 8)) {
  setMeProp(_me, "m_iStormCounter", 1);
  }

  }

  }

  var t_Mem_AvatImage = a_SprAvatar.member;
  if (lingoBinary("eq", meProp(_me, "m_iMagicFx"), 10)) {
  var t_ImgAvatar = callMethod("DrawMagicCarpet", _me, t_Mem_AvatImage);
  }

  if (lingoBinary("eq", meProp(_me, "m_iMagicFx"), 11)) {
  t_ImgAvatar = callMethod("DrawMagicBatIn", _me, t_Mem_AvatImage);
  }

  if (lingoBinary("eq", meProp(_me, "m_iMagicFx"), 15)) {
  t_ImgAvatar = callMethod("DrawMagicBatOut", _me, t_Mem_AvatImage);
  }

  if (lingoBinary("eq", meProp(_me, "m_iMagicFx"), 16)) {
  t_ImgAvatar = callMethod("DrawPushTheTrashcan", _me, t_Mem_AvatImage);
  }

  if (lingoBinary("eq", meProp(_me, "m_iMagicFx"), 17)) {
  t_ImgAvatar = callMethod("DrawDiveEffects", _me, t_Mem_AvatImage);
  }

  if (lingoBinary("eq", meProp(_me, "m_iMagicFx"), 18)) {
  t_ImgAvatar = callMethod("DrawSpaceWalkEffects", _me, t_Mem_AvatImage);
  }

  if (lingoBinary("eq", meProp(_me, "m_iMagicFx"), 20)) {
  t_ImgAvatar = callMethod("DrawSwimming", _me, t_Mem_AvatImage);
  }

  if (lingoBinary("eq", meProp(_me, "m_iMagicFx"), 25)) {
  t_ImgAvatar = callMethod("DrawMagicSharkIn", _me, t_Mem_AvatImage);
  }

  if (lingoBinary("eq", meProp(_me, "m_iMagicFx"), 26)) {
  t_ImgAvatar = callMethod("DrawMagicSharkOut", _me, t_Mem_AvatImage);
  }

  if (lingoBinary("eq", meProp(_me, "m_iMagicFx"), 27)) {
  t_ImgAvatar = callMethod("DrawLightning", _me, t_Mem_AvatImage);
  }

  // HAND-CORRECTED: Confetti (34), from a later build's CMagicFactor_new.
  if (lingoBinary("eq", meProp(_me, "m_iMagicFx"), 34)) {
  t_ImgAvatar = callMethod("DrawConfetti", _me, t_Mem_AvatImage);
  }

  if (lingoBinary("eq", meProp(_me, "m_iMagicFx"), 90)) {
  t_ImgAvatar = callMethod("DrawLoader", _me, t_Mem_AvatImage);
  }

  if (lingoBinary("gt", meProp(_me, "m_iMagicFx"), 99)) {
  t_ImgAvatar = callMethod("DrawCarPants", _me, t_Mem_AvatImage);
  }

  var t_ar_DrawList = new LingoList([]);
  var t_mp_ListBack = meProp(_me, "m_mp_Framelist").back;
  var t_mp_ListFront = meProp(_me, "m_mp_Framelist").front;
  var t_i_ListBackCount = t_mp_ListBack.count;
  var t_i_ListFrontCount = t_mp_ListFront.count;
  if (lingoBinary("gt", t_i_ListBackCount, 0)) {
  for (var i = 1; i <= t_i_ListBackCount; ++i) {
  if (lingoBinary("lte", i, t_i_ListBackCount)) {
  setThePropOf(t_mp_ListBack[i], "counter", lingoBinary("add", t_mp_ListBack[i].counter, 1));
  var t_iFrameCount = t_mp_ListBack[i].frames.count;
  if (lingoBinary("gt", t_mp_ListBack[i].counter, t_iFrameCount)) {
  var t_bLoop = t_mp_ListBack[i].loop;
  if (t_bLoop) {
  setThePropOf(t_mp_ListBack[i], "counter", 1);
  } else {
  setThePropOf(t_mp_ListBack[i], "counter", t_iFrameCount);
  }

  }

  var t_rMem = t_mp_ListBack[i].frames[t_mp_ListBack[i].counter];
  callMethod("add", t_ar_DrawList, t_rMem)
  continue;
  }

  break;
  }

  }

  if (lingoBinary("or", lingoBinary("gt", t_i_ListBackCount, 0), lingoBinary("gt", t_i_ListFrontCount, 0))) {
  if (lingoBinary("eq", meProp(_me, "m_iMagicFx"), 12)) {
  setMeProp(_me, "m_iMagicFrameCounter", lingoBinary("add", meProp(_me, "m_iMagicFrameCounter"), 1));
  if (lingoBinary("lt", meProp(_me, "m_iMagicFrameCounter"), 10)) {
  callMethod("add", t_ar_DrawList, t_Mem_AvatImage)
  }

  } else {
  callMethod("add", t_ar_DrawList, t_Mem_AvatImage)
  }

  }

  if (lingoBinary("gt", t_i_ListFrontCount, 0)) {
  for (var i = 1; i <= t_i_ListFrontCount; ++i) {
  if (lingoBinary("lte", i, t_i_ListFrontCount)) {
  setThePropOf(t_mp_ListFront[i], "counter", lingoBinary("add", t_mp_ListFront[i].counter, 1));
  t_iFrameCount = t_mp_ListFront[i].frames.count;
  if (lingoBinary("gt", t_mp_ListFront[i].counter, t_mp_ListFront[i].frames.count)) {
  t_bLoop = t_mp_ListFront[i].loop;
  if (t_bLoop) {
  setThePropOf(t_mp_ListFront[i], "counter", 1);
  } else {
  setThePropOf(t_mp_ListFront[i], "counter", t_iFrameCount);
  }

  }

  t_rMem = t_mp_ListFront[i].frames[t_mp_ListFront[i].counter];
  callMethod("add", t_ar_DrawList, t_rMem)
  continue;
  }

  break;
  }

  }

  if (lingoBinary("or", lingoBinary("gt", t_i_ListBackCount, 0), lingoBinary("gt", t_i_ListFrontCount, 0))) {
  t_ImgAvatar = callMethod("createUnionImageFromMemberList", _me, t_ar_DrawList, callNamed("point", 0, 0));
  }

  if (lingoBinary("gt", meProp(_me, "m_ar_SpriteList").count, 0)) {
  if ((lingoTruthy(callNamed("timeoutExists", lingoBinary("join", "FxLocator", meProp(_me, "m_iMyRef")))) ? 0 : 1)) {
  callNamed("createTimeout", lingoBinary("join", "FxLocator", meProp(_me, "m_iMyRef")), 50, symbol("GetActualPos"), callMethod("getID", _me), undefined, 0)
  }

  }

  return t_ImgAvatar;
}

