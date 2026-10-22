-- Script
property m_HEALTH

on construct me
  m_HEALTH = 1
  return 1
end
on deconstruct me
  return 1
end
on SetConstants me
  tGraphicCode = me.getObject().GetParam("GameParams")[2]
  me.getObject().SetParam("Killed", 0)
  me.getObject().SetParam("BoundsType", #box)
  t_dimensions = getThread("piratesminigame").getComponent().GetBuildingBounds(tGraphicCode)
  me.getObject().SetParam("BoxDimensions", t_dimensions)
  me.getObject().SetParam("WindAffects", 0)
  me.getObject().SetParam("DmgObjects", getThread("piratesminigame").getComponent().GetBuildingDmgObjects(tGraphicCode))
  me.getObject().SetParam("BurnObjects", getThread("piratesminigame").getComponent().GetBuildingBurnObjects(tGraphicCode))
  me.getObject().SetParam("OriginalHealth", me.getObject().GetParam("GameParams")[1])
end
on UpdateParameters me, i_ar_data
end
on move me
end
on HitByCannonball me
  tGameParams = me.getObject().GetParam("GameParams")
  tGameParams[m_HEALTH] = tGameParams[m_HEALTH] - 1
  if tGameParams[m_HEALTH] <= 0 then
    tGameParams[m_HEALTH] = 0
  end if
  me.getObject().SetParam("GameParams", tGameParams)
  me.getObject().GetVisual().HitByCannonball()
end
on Kill me
  me.getObject().SetParam("Killed", 1)
end