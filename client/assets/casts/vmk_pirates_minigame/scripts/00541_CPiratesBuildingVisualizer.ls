-- Script
property m_HEALTH
property m_ar_rFireAnim
property m_ar_rGlowAnim

on construct me
  m_HEALTH = 1
  t_ar_sFireAnim = ["fire_01", "fire_02", "fire_03", "fire_04", "fire_05", "fire_06", "fire_07", "fire_08", "fire_09", "fire_10", "fire_11", "fire_12", "fire_13", "fire_14", "fire_15"]
  t_ar_sGlowAnim = ["glow_01", "glow_02"]
  m_ar_rFireAnim = []
  m_ar_rGlowAnim = []
  repeat with tFrame in t_ar_sFireAnim
    m_ar_rFireAnim.append(getMember(tFrame))
  end repeat
  repeat with tFrame in t_ar_sGlowAnim
    m_ar_rGlowAnim.append(getMember(tFrame))
  end repeat
  return 1
end
on deconstruct me
  return 1
end
on HitByCannonball me
  tHealth = me.getObject().GetParam("GameParams")[m_HEALTH]
  t_ar_dmgObjects = me.getObject().GetParam("DmgObjects")
  t_ar_burnObjects = me.getObject().GetParam("BurnObjects")
  tLevelToEnable = (me.getObject().GetParam("OriginalHealth") - tHealth) / (me.getObject().GetParam("OriginalHealth") / 5)
  if tLevelToEnable > 0 then
    if t_ar_dmgObjects.count >= tLevelToEnable then
      repeat with tObject in t_ar_dmgObjects[tLevelToEnable]
        tObject.GetVisual().getSprite().visible = 1
        if tObject.GetParam("SPRITE") contains "fire" then
          tObject.SetParam("PiratesAnim", m_ar_rFireAnim)
          tObject.SetParam("PiratesAnimFrame", random(15))
          next repeat
        end if
        if tObject.GetParam("SPRITE") contains "glow" then
          tObject.SetParam("PiratesAnim", m_ar_rGlowAnim)
          tObject.SetParam("PiratesAnimFrame", random(2))
        end if
      end repeat
      tBlend = tLevelToEnable * 25
      repeat with tObject in t_ar_burnObjects
        tObject.GetVisual().getSprite().visible = 1
        tObject.GetVisual().getSprite().blend = tBlend
      end repeat
    end if
  end if
end
on update me
  tPos = me.getObject().GetParam("WorldPosition")
  tHealth = me.getObject().GetParam("GameParams")[m_HEALTH]
  t_ar_dmgObjects = me.getObject().GetParam("DmgObjects")
  repeat with tDmgLevel in t_ar_dmgObjects
    repeat with tObject in tDmgLevel
      if tObject.GetVisual().getSprite().visible then
        if not voidp(tObject.GetParam("PiratesAnim")) then
          tFrame = tObject.GetParam("PiratesAnimFrame")
          tFrameList = tObject.GetParam("PiratesAnim")
          tObject.GetVisual().getSprite().member = tFrameList[tFrame]
          tFrame = tFrame + 1
          if tFrame > tFrameList.count then
            tFrame = 1
          end if
          tObject.SetParam("PiratesAnimFrame", tFrame)
        end if
      end if
    end repeat
  end repeat
end