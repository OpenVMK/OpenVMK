// d0e535313898676eb605277339b50f27.cct / CAvatarFactoryComponent / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_ar_PropsToServer", new LingoPropList([]));
  setMeProp(_me, "m_ar_availableSets", new LingoPropList([]));
  setMeProp(_me, "m_mp_AllSets", new LingoList([]));
  setMeProp(_me, "m_mp_AvatarInstances", new LingoPropList([]));
  setMeProp(_me, "m_ar_MyAvatar", undefined);
  setMeProp(_me, "m_ar_HatList", undefined);
  setMeProp(_me, "m_objFigureSetLoader", undefined);
  setMeProp(_me, "m_mp_AvatarBuilderData", new LingoPropList([]));
  setMeProp(_me, "m_mp_ClothesPreviewImages", undefined);
  setMeProp(_me, "m_iRenderTimer", 0);
  setMeProp(_me, "m_bClothesRendered", 0);
  setMeProp(_me, "m_mp_AvatarImageResource", new LingoPropList([]));
  setMeProp(_me, "m_objAnimator", callNamed("createObject", "AvatarAnimation", "CAvatarAnimator"));
  callNamed("createObject", "ClothesPreviewRenderer", "CClothesThumbHandler")
  setMeProp(_me, "m_ar_rSetContents", new LingoPropList(["hr", new LingoList(["hr"]), "hd", new LingoList(["tr", "ey", "fc", "hd", "lh", "rh", "llg", "rlg"]), "ch", new LingoList(["ch", "ch2", "ls", "rs"]), "pn", new LingoList(["lpn", "rpn"]), "sh", new LingoList(["lsh", "rsh"]), "ht", new LingoList(["ht"])]));
  callNamed("setVariable", "SetContents", meProp(_me, "m_ar_rSetContents"))
  callNamed("registerMessage", "CreateAvatar", callMethod("getID", _this), symbol("CreateAvatar"))
  callNamed("registerMessage", "RandomAvatar", callMethod("getID", _this), symbol("createRandomAvat"))
  callNamed("registerMessage", "CatalogAvatar", callMethod("getID", _this), symbol("createCatPreview"))
  callNamed("registerMessage", "GetAvatarImage", callMethod("getID", _this), symbol("GetAvatarImage"))
  callNamed("registerMessage", symbol("Initialize"), callMethod("getID", _this), symbol("AllCastsDone"))
  callNamed("registerMessage", symbol("MinigameState"), callMethod("getID", _this), symbol("MinigameStateChange"))
  callNamed("registerMessage", "AddAvatarPieceImage", callMethod("getID", _this), symbol("AddAvatarImagePiece"))
  setMeProp(_me, "m_sSex", "M");
  var m_ObjList = new LingoList([]);
  return 1;
}

