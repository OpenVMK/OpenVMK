-- Script
property m_rMGE
property m_ar_shipsCaught
property m_speed
property m_pullradius
property m_pullamount
property m_spinspeed
property m_releaseradius
property m_a3_whirl

on construct me
  m_rMGE = getThread("minigame").getComponent()
  m_ar_shipsCaught = []
  m_a3_whirl = value(getMember("wp30x30").text)
  m_speed = VOID
  m_pullradius = VOID
  m_pullamount = VOID
  m_spinspeed = VOID
  m_releaseradius = VOID
  return 1
end
on deconstruct me
  return 1
end
on SetConstants me
  me.getObject().SetParam("BoundsType", #circle)
  me.getObject().SetParam("BoundingCirleRadius", 5000)
  me.getObject().SetParam("WindAffects", 0)
  me.getObject().SetParam("State", 0)
  me.getObject().SetParam("NextDeviationChange", 0)
  me.getObject().SetParam("CurDeviation", 1)
  tStage = getThread("piratesminigame").getComponent().GetStage()
  if not voidp(tStage) then
    m_speed = tStage.GetWhirlPoolSettings().getaProp("MoveSpeed")
    m_pullradius = tStage.GetWhirlPoolSettings().getaProp("PullRadius")
    m_pullamount = tStage.GetWhirlPoolSettings().getaProp("PullAmount")
    m_spinspeed = tStage.GetWhirlPoolSettings().getaProp("SpinSpeed")
    m_releaseradius = tStage.GetWhirlPoolSettings().getaProp("ReleaseRadius")
  end if
end
on UpdateParameters me, i_ar_data
end
on move me
  t_oNextChange = 2
  t_oDeviation = 1
  tMyObject = me.getObject()
  tdir = tMyObject.GetParam("Direction")
  tPos = tMyObject.GetParam("WorldPosition")
  tVariables = tMyObject.GetParam("GameParams")
  tVariables[t_oNextChange] = tVariables[t_oNextChange] - 1
  if tVariables[t_oNextChange] <= 0 then
    tNewDeviation = tVariables[t_oDeviation] + 1
    if tNewDeviation > 4 then
      tNewDeviation = 1
    end if
    tVariables[t_oNextChange] = m_rMGE.GetQuickRandom().getRandomNumber(m_rMGE.GetQuickRandom().IterateSeed(m_rMGE.GetTurnNumber()), 20) + 10
    tVariables[t_oDeviation] = tNewDeviation
  end if
  tdir = tdir - tVariables[t_oDeviation]
  if tdir < 0 then
    tdir = tdir + 360
  end if
  tVelTable = m_rMGE.GetVelocityTable()
  tPos.x = tPos.x + tVelTable.GetBaseVelX(tdir) * m_speed / 256
  tPos.y = tPos.y + tVelTable.GetBaseVelY(tdir) * m_speed / 256
  tMyObject.SetParam("Direction", tdir)
  tMyObject.SetParam("WorldPosition", tPos)
  tMyObject.SetParam("GameParams", tVariables)
end