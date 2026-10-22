// d0e535313898676eb605277339b50f27.cct / CAvatarBuilderPage / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue, a_mp_kType_mp_iRef_rItem: LingoValue, a_kAlteredCategory: LingoValue) {
  switch (a_kAlteredCategory) {
case "MyAvatar":
  setMeProp(_me, "m_ar_MyAvatar", a_mp_kType_mp_iRef_rItem[a_kAlteredCategory]);
  setMeProp(_me, "m_ar_PropsToServer", meProp(_me, "m_ar_MyAvatar"));
  callMethod("CreateFigure", _this)
  callMethod("ShowHideClothesChoosers", _this)
  break;
case "AvailableSets":
  setMeProp(_me, "m_ar_availableSets", a_mp_kType_mp_iRef_rItem[a_kAlteredCategory]);
  callMethod("ShowHideClothesChoosers", _this)
  callMethod("updateFigurePreview", _this)
  callMethod("updateAllPrewIcons", _this)
  break;
case "SloganChanged":
  callMethod("SloganChanged", _this)
  break;
case "avatar":
case symbol("avatar"):
case "Avatar":
  if ((lingoTruthy(callNamed("voidp", a_mp_kType_mp_iRef_rItem)) ? 0 : 1)) {
  if (lingoBinary("gt", callMethod("findPos", a_mp_kType_mp_iRef_rItem, "MyAvatar"), 0)) {
  setMeProp(_me, "m_ar_MyAvatar", a_mp_kType_mp_iRef_rItem["MyAvatar"]);
  setMeProp(_me, "m_ar_PropsToServer", meProp(_me, "m_ar_MyAvatar"));
  callMethod("CreateFigure", _this)
  }

  if (lingoBinary("gt", callMethod("findPos", a_mp_kType_mp_iRef_rItem, "AvailableSets"), 0)) {
  setMeProp(_me, "m_ar_availableSets", a_mp_kType_mp_iRef_rItem["AvailableSets"]);
  }

  callMethod("ShowHideClothesChoosers", _this)
  }

  break;
  break;
  break;
  }

}

