// d0e535313898676eb605277339b50f27.cct / CAvatarBuilderPage / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_rWindow", undefined);
  var m_bDataGathered = 0;
  var m_ar_AvatarData = undefined;
  setMeProp(_me, "m_rSloganField", undefined);
  setMeProp(_me, "m_sSlogan", undefined);
  setMeProp(_me, "m_bSloganOk", 0);
  setMeProp(_me, "m_ar_PropsToServer", undefined);
  setMeProp(_me, "m_CurrentHairCol", undefined);
  setMeProp(_me, "m_CurrentSkinCol", undefined);
  setMeProp(_me, "m_NoHat_Img", callNamed("member", callNamed("getmemnum", "nohats.preview")).image);
  setMeProp(_me, "m_rHumanImgBgClr", callNamed("rgb", 39, 86, 146));
  setMeProp(_me, "m_rPreviewImgBgClr", callNamed("rgb", 255, 255, 255));
  setMeProp(_me, "m_mp_AllSets", callNamed("getVariable", "AllAvailableSets", undefined));
  setMeProp(_me, "m_ar_FigureColorList", callNamed("getVariableValue", "ColorList"));
  callNamed("registerMessage", symbol("MinigameState"), callMethod("getID", _this), symbol("MinigameStateChange"))
  return 1;
}

