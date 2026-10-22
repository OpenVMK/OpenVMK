-- Script
on construct me
  return 1
end
on deconstruct me
  return 1
end
on SetConstants me
  me.getObject().SetParam("BoundsType", #circle)
  me.getObject().SetParam("BoundingCircleRadius", 5000)
end
on UpdateParameters me, i_ar_data
end
on move me
  tMyObject = me.getObject()
  t_ar_gameParams = tMyObject.GetParam("GameParams")
  tVelX = t_ar_gameParams[1]
  tVelY = t_ar_gameParams[2]
  tPos = tMyObject.GetParam("WorldPosition")
  tPos = tPos.add(intvector(tVelX, tVelY, 0))
  tMyObject.SetParam("WorldPosition", tPos)
  tMyObject.SetParam("GameParams", t_ar_gameParams)
end