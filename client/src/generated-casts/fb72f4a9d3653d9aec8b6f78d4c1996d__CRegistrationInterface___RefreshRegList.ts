// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegistrationInterface / _RefreshRegList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _RefreshRegList(_me: LingoMe, _this: LingoValue, a_mp_kType_mp_iRef_rItem: LingoValue, a_kAlteredCategory: LingoValue) {
  if (lingoBinary("and", callNamed("objectp", meProp(_me, "m_obj_NameRejectionWindow")), lingoBinary("or", lingoBinary("eq", a_kAlteredCategory, "AvatarNames"), lingoBinary("eq", a_kAlteredCategory, "GeneratedNames")))) {
  callMethod("update", meProp(_me, "m_obj_NameRejectionWindow"), a_mp_kType_mp_iRef_rItem, a_kAlteredCategory)
  return;
  }

  if (meProp(_me, "m_bAllClothesLoaded")) {
  if ((lingoTruthy(meProp(_me, "m_bInitialized")) ? 0 : 1)) {
  setMeProp(_me, "m_rCurPageObj", callNamed("createObject", callNamed("getUniqueID"), "CRegPageBase"));
  setMeProp(_me, "m_bInitialized", callNamed("objectp", meProp(_me, "m_rCurPageObj")));
  }

  callMethod("update", meProp(_me, "m_rCurPageObj"), a_mp_kType_mp_iRef_rItem, a_kAlteredCategory)
  if (callNamed("listp", meProp(_me, "m_mp_SavedDataWhileLoading"))) {
  for (var i = 1; i <= meProp(_me, "m_mp_SavedDataWhileLoading").count; ++i) {
  callMethod("update", meProp(_me, "m_rCurPageObj"), meProp(_me, "m_mp_SavedDataWhileLoading"), callMethod("getPropAt", meProp(_me, "m_mp_SavedDataWhileLoading"), i))
  }

  setMeProp(_me, "m_mp_SavedDataWhileLoading", undefined);
  }

  } else {
  setMeProp(_me, "m_mp_SavedDataWhileLoading", a_mp_kType_mp_iRef_rItem);
  }

}

