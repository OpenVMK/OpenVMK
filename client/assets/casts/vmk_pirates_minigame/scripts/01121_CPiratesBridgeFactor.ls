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
  me.getObject().SetParam("Killed", 0)
  me.getObject().SetParam("BoundsType", #box)
  t_dimensions = [intvector(-1000, -1000, 0), intvector(1000, 1000, 0)]
  me.getObject().SetParam("BoxDimensions", t_dimensions)
end
on UpdateParameters me, i_ar_data
end
on move me
end
on HitByCannonball me
  tGameParams = me.getObject().GetParam("GameParams")
  tGameParams[m_HEALTH] = tGameParams[m_HEALTH] - 1
  if tGameParams[m_HEALTH] <= 0 then
  end if
  me.getObject().SetParam("GameParams", tGameParams)
end
on Kill me
  me.getObject().SetParam("Killed", 1)
end