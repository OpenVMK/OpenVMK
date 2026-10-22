-- Script
property m_ar_clouds
property m_rPiraEng
property m_rGameEng

on construct me
  m_ar_clouds = []
  m_rPiraEng = getThread("piratesminigame").getComponent()
  m_rGameEng = getThread("minigame").getComponent()
  return 1
end
on deconstruct me
  tThread = getThread("minigame")
  if tThread <> 0 then
    repeat with tCloud in m_ar_clouds
      m_rGameEng.GetObjectPool().FreeObject(tCloud)
    end repeat
  end if
  m_ar_clouds = []
  return 1
end
on CreateCloud me
  tPos = intvector(random(120000) - 60000, random(120000) - 60000, 5000)
  m_ar_clouds.append(m_rGameEng.GetObjectPool().newObject("piratescloud", ["WorldPosition": tPos]))
end
on InitClouds me, a_iCount
  m_ar_clouds = []
  repeat with i = 1 to a_iCount
    me.CreateCloud()
  end repeat
  receiveUpdate(me.getID())
end
on update me
  tWindIndicator = m_rGameEng.GetObjectsByCode(8)
  if tWindIndicator.count <> 1 then
    exit
  end if
  tStrength = tWindIndicator[1].GetParam("Strength")
  tdir = tWindIndicator[1].GetParam("Direction")
  tVelTable = m_rGameEng.GetVelocityTable()
  repeat with tCloud in m_ar_clouds
    tPos = tCloud.GetParam("WorldPosition")
    tPos.x = tPos.x + tVelTable.GetBaseVelX(tdir) * tStrength / 64 + random(10)
    tPos.y = tPos.y + tVelTable.GetBaseVelY(tdir) * tStrength / 64 + random(10)
    if tPos.x > 60000 then
      tPos.x = tPos.x - 120000
    end if
    if tPos.x < -60000 then
      tPos.x = tPos.x + 120000
    end if
    if tPos.y > 60000 then
      tPos.y = tPos.y - 120000
    end if
    if tPos.y < -60000 then
      tPos.y = tPos.y + 120000
    end if
    tCloud.SetParam("WorldPosition", tPos)
  end repeat
end