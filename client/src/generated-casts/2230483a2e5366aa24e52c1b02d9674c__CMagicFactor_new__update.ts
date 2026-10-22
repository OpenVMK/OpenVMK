// 2230483a2e5366aa24e52c1b02d9674c.cct / CMagicFactor_new / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, a_veAvatarLoc: LingoValue, a_SprAvatar: LingoValue) {
  /* global */ var pTemp = globalVar("pTemp");
  setThePropOf(_me, "m_veAvatarLoc", a_veAvatarLoc);
  if (lingoBinary("eq", _me.m_iMagicFx, 9)) {
  if (callNamed("listp", _me.m_ar_StormImgList)) {
  var t_Img = _me.m_ar_StormImgList[_me.m_iStormCounter];
  if (lingoBinary("neq", lingoBinary("sub", _me.m_iStormCounter, 1), _me.m_arFlipList[_me.m_iStormCounter])) {
  var t_img2 = callNamed("image", 80, 160, 32);
  callNamed("setAlpha", t_img2, callNamed("image", 80, 160, 8))
  setThePropOf(_me, "useAlpha", 1);
  var tQuad = new LingoList([callNamed("point", t_Img.width, 0), callNamed("point", 0, 0), callNamed("point", 0, t_Img.height), callNamed("point", t_Img.width, t_Img.height)]);
  callNamed("copyPixels", t_img2, t_img2, t_Img, tQuad, t_Img.rect)
  t_Img = t_img2;
  }

  setThePropOf(a_SprAvatar.member, "image", t_Img);
  var t_iH = lingoBinary("div", t_Img.width, 2);
  var t_iV = lingoBinary("sub", t_Img.height, 16);
  var t_pnt = callNamed("point", t_iH, t_iV);
  setThePropOf(a_SprAvatar.member, "regPoint", t_pnt);
  setThePropOf(_me, "m_iStormCounter", lingoBinary("add", _me.m_iStormCounter, 1));
  if (lingoBinary("gt", _me.m_iStormCounter, 8)) {
  setThePropOf(_me, "m_iStormCounter", 1);
  }

  }

  var t_Mem_AvatImage = a_SprAvatar.member;
  }

  if (lingoBinary("eq", _me.m_iMagicFx, 10)) {
  var t_ImgAvatar = callNamed("DrawMagicCarpet", _me, t_Mem_AvatImage);
  }

  if (lingoBinary("eq", _me.m_iMagicFx, 11)) {
  t_ImgAvatar = callNamed("DrawMagicBatIn", _me, t_Mem_AvatImage);
  }

  if (lingoBinary("eq", _me.m_iMagicFx, 15)) {
  t_ImgAvatar = callNamed("DrawMagicBatOut", _me, t_Mem_AvatImage);
  }

  if (lingoBinary("eq", _me.m_iMagicFx, 16)) {
  t_ImgAvatar = callNamed("DrawPushTheTrashcan", _me, t_Mem_AvatImage);
  }

  if (lingoBinary("eq", _me.m_iMagicFx, 17)) {
  t_ImgAvatar = callNamed("DrawDiveEffects", _me, t_Mem_AvatImage);
  }

  if (lingoBinary("eq", _me.m_iMagicFx, 18)) {
  t_ImgAvatar = callNamed("DrawSpaceWalkEffects", _me, t_Mem_AvatImage);
  }

  if (lingoBinary("eq", _me.m_iMagicFx, 20)) {
  t_ImgAvatar = callNamed("DrawSwimming", _me, t_Mem_AvatImage);
  }

  if (lingoBinary("eq", _me.m_iMagicFx, 25)) {
  t_ImgAvatar = callNamed("DrawMagicSharkIn", _me, t_Mem_AvatImage);
  }

  if (lingoBinary("eq", _me.m_iMagicFx, 26)) {
  t_ImgAvatar = callNamed("DrawMagicSharkOut", _me, t_Mem_AvatImage);
  }

  if (lingoBinary("eq", _me.m_iMagicFx, 27)) {
  t_ImgAvatar = callNamed("DrawLightning", _me, t_Mem_AvatImage);
  }

  if (lingoBinary("eq", _me.m_iMagicFx, 34)) {
  t_ImgAvatar = callNamed("DrawConfetti", _me, t_Mem_AvatImage);
  }

  if (lingoBinary("eq", _me.m_iMagicFx, 90)) {
  t_ImgAvatar = callNamed("DrawLoader", _me, t_Mem_AvatImage);
  }

  if (lingoBinary("gt", _me.m_iMagicFx, 99)) {
  t_ImgAvatar = callNamed("DrawCarPants", _me, t_Mem_AvatImage);
  }

  var t_ar_DrawList = new LingoList([]);
  var t_mp_ListBack = _me.m_mp_Framelist.back;
  var t_mp_ListFront = _me.m_mp_Framelist.front;
  var t_i_ListBackCount = t_mp_ListBack.count;
  var t_i_ListFrontCount = t_mp_ListFront.count;
  if (lingoBinary("gt", t_i_ListBackCount, 0)) {
  for (var i = 1; i <= t_i_ListBackCount; ++i) {
  if (lingoBinary("lte", i, t_i_ListBackCount)) {
  setThePropOf(_me, "counter", lingoBinary("add", t_mp_ListBack[i].counter, 1));
  var t_iFrameCount = t_mp_ListBack[i].frames.count;
  if (lingoBinary("gt", t_mp_ListBack[i].counter, t_iFrameCount)) {
  var t_bLoop = t_mp_ListBack[i].loop;
  if (lingoBinary("eq", symbol("useFastQuads"), 1)) {
  setThePropOf(_me, "counter", 1);
  }

  setThePropOf(_me, "counter", t_iFrameCount);
  }

  var t_rMem = callNamed("getProp", t_mp_ListBack[i], symbol("frames"), t_mp_ListBack[i].counter);
  callMethod("add", t_ar_DrawList, t_rMem)
  }

  }

  if (lingoBinary("or", lingoBinary("gt", t_i_ListFrontCount, 0), lingoBinary("gt", t_i_ListBackCount, 0))) {
  if (lingoBinary("eq", _me.m_iMagicFx, 12)) {
  setThePropOf(_me, "m_iMagicFrameCounter", lingoBinary("add", _me.m_iMagicFrameCounter, 1));
  if (lingoBinary("lt", _me.m_iMagicFrameCounter, 10)) {
  callMethod("add", t_ar_DrawList, t_Mem_AvatImage)
  }

  }

  callMethod("add", t_ar_DrawList, t_Mem_AvatImage)
  }

  if (lingoBinary("gt", t_i_ListFrontCount, 0)) {
  for (var i = 1; i <= t_i_ListFrontCount; ++i) {
  if (lingoBinary("lte", i, t_i_ListFrontCount)) {
  setThePropOf(_me, "counter", lingoBinary("add", t_mp_ListFront[i].counter, 1));
  t_iFrameCount = t_mp_ListFront[i].frames.count;
  if (lingoBinary("gt", t_mp_ListFront[i].counter, t_mp_ListFront[i].frames.count)) {
  t_bLoop = t_mp_ListFront[i].loop;
  if (t_bLoop) {
  setThePropOf(_me, "counter", 1);
  }

  setThePropOf(_me, "counter", t_iFrameCount);
  }

  t_rMem = callNamed("getProp", t_mp_ListFront[i], symbol("frames"), t_mp_ListFront[i].counter);
  callMethod("add", t_ar_DrawList, t_rMem)
  }

  }

  if (lingoBinary("or", lingoBinary("gt", t_i_ListFrontCount, 0), lingoBinary("gt", t_i_ListBackCount, 0))) {
  t_ImgAvatar = callNamed("createUnionImageFromMemberList", _me, t_ar_DrawList, callNamed("point", 0, 0));
  }

  if (lingoBinary("gt", _me.m_ar_SpriteList.count, 0)) {
  if ((lingoTruthy(callNamed("timeoutExists", lingoBinary("join", "FxLocator", _me.m_iMyRef))) ? 0 : 1)) {
  callNamed("createTimeout", lingoBinary("join", "FxLocator", _me.m_iMyRef), 50, symbol("GetActualPos"), callMethod("getID", _me), undefined, 0)
  }

  }

  return t_ImgAvatar;
  }

  }

}

