// registration.cct / CRegistrationInterface / _RefreshRegList

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _RefreshRegList(_me: LingoMe, _this: LingoValue, a_mp_kType_mp_iRef_rItem: LingoValue, a_kAlteredCategory: LingoValue) {
  if (lingoBinary("and", callNamed("objectp", meProp(_me, "m_obj_NameRejectionWindow")), lingoBinary("or", lingoBinary("eq", a_kAlteredCategory, "AvatarNames"), lingoBinary("eq", a_kAlteredCategory, "GeneratedNames")))) {
  callMethod("update", meProp(_me, "m_obj_NameRejectionWindow"), a_mp_kType_mp_iRef_rItem, a_kAlteredCategory)
  return;
  }

  if (meProp(_me, "m_bAllClothesLoaded")) {
  if (!lingoTruthy(meProp(_me, "m_bInitialized"))) {
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

