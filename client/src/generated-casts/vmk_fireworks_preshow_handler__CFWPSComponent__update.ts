// vmk_fireworks_preshow_handler.cct / CFWPSComponent / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  if ((lingoTruthy(meProp(_me, "m_disabled")) ? 0 : 1)) {
  var tTime = theProperty("milliSeconds");
  var tDt = lingoBinary("div", callNamed("float", lingoBinary("sub", tTime, meProp(_me, "m_iLastMilliseconds"))), float(1000));
  setMeProp(_me, "m_iLastMilliseconds", tTime);
  callMethod("setViewAngle", meProp(_me, "pView"), meProp(_me, "fViewTheta"), meProp(_me, "fViewOmega"))
  callMethod("setView", meProp(_me, "pPipeline"), meProp(_me, "pView"))
  var t_ar_visual = callMethod("Process", meProp(_me, "pPipeline"), callMethod("getAllParticles", meProp(_me, "m_particleSystem")));
  callMethod("clear", meProp(_me, "m_softBuffer"))
  var t_backBuffer = callMethod("getImage", meProp(_me, "m_softBuffer"));
  var tScreenSizeX = theProperty("stage").image.width;
  var tScreenSizeY = theProperty("stage").image.height;
  var tCOP_X = lingoBinary("div", tScreenSizeX, 2);
  var tCOP_Y = lingoBinary("div", tScreenSizeY, 2);
  for (var i = 1; i <= callMethod("count", t_ar_visual); ++i) {
  var t_spriteName = t_ar_visual[i][1];
  var t_sprite = meProp(_me, "m_mp_sparkList")[t_spriteName];
  var tX = lingoBinary("sub", lingoBinary("sub", lingoBinary("add", t_ar_visual[i][2].x, tCOP_X), lingoBinary("div", callMethod("getWidth", t_sprite), 2)), 144);
  var tY = lingoBinary("sub", lingoBinary("add", t_ar_visual[i][2].y, tCOP_Y), lingoBinary("div", callMethod("getHeight", t_sprite), 2));
  callMethod("addPinBlit", t_sprite, tX, tY, t_backBuffer)
  }

  setThePropOf(meProp(_me, "m_bufMember"), "image", t_backBuffer);
  setThePropOf(meProp(_me, "m_bufMember"), "regPoint", meProp(_me, "m_bgRegPoint"));
  }

}

