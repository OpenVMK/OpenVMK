-- Script
property m_sName
property m_ar_startPositions
property m_ar_items
property m_mp_fixtures
property m_collisionMap
property m_mp_scores
property m_mp_wind
property m_mp_powerupsettings
property m_mp_whirlpoolsettings
property m_mp_seamonstersettings
property m_mp_krakenseamonstersettings
property m_iStartTime
property m_iEndTime
property m_sMusic
property m_bMoonlightUserTriggered

on construct me
  m_ar_startPositions = []
  m_ar_items = []
  m_mp_fixtures = [#buildings: [:], #turrets: [:], #oilbuildings: [:]]
  m_collisionMap = VOID
  m_mp_scores = [:]
  m_mp_wind = [:]
  m_mp_powerupsettings = [:]
  m_sMusic = EMPTY
  m_bMoonlightUserTriggered = 0
  return 1
end
on deconstruct me
  if not voidp(m_collisionMap) then
    removeObject(m_collisionMap.getID())
  end if
  return 1
end
on LoadXML me, i_sDocument
  t_rXML = CreateXML(getMember(i_sDocument).text)
  tRoot = t_rXML.GetRoot()
  if t_rXML.Search("type", "PIRATES_OF_THE_CARIBBEAN", 0) then
    tRootXML = CreateXML()
    tRootXML.copy(t_rXML.GetNode())
    m_sName = t_rXML.GetParam("STAGE")
    m_iStartTime = t_rXML.GetParam("STARTTIME")
    m_iEndTime = t_rXML.GetParam("ENDTIME")
    if tRootXML.Search("type", "TEAMS", 0) then
      tCount = tRootXML.count()
      repeat with i = 1 to tCount
        tTeam = tRootXML[i]
        tStartPosCount = tTeam[#child].count
        repeat with j = 1 to tStartPosCount
        end repeat
      end repeat
    end if
    tRootXML.GetRoot()
    if tRootXML.Search("type", "ITEMS", 0) then
      tCount = tRootXML.count()
      repeat with i = 1 to tCount
        tItem = tRootXML[i]
      end repeat
    end if
    tRootXML.GetRoot()
    if tRootXML.Search("type", "FIXTURES", 0) then
      tCount = tRootXML.count()
      repeat with i = 1 to tCount
        tFixture = tRootXML[i]
        case tFixture[#type] of
          "BUILDING":
            tGraphic = value(tFixture[#param]["GRAPHIC"])
            tPos = value(tFixture[#param]["POS"])
            tBBxtl = value(tFixture[#param]["BBOXTL"])
            tBBxbr = value(tFixture[#param]["BBOXBR"])
            m_mp_fixtures[#buildings].setaProp(tGraphic, [#pos: tPos, #BBox: rect(tBBxtl.locH, tBBxtl.locV, tBBxbr.locH, tBBxbr.locV)])
          "TURRET":
            tPos = value(tFixture[#param]["POS"])
            m_mp_fixtures[#turrets].setaProp(m_mp_fixtures[#turrets].count + 1, [#pos: tPos, #BBox: rect(-1125, -1125, 1125, 1125)])
          "OILBUILDING":
            tPos = value(tFixture[#param]["POS"])
            m_mp_fixtures[#oilbuildings].setaProp(m_mp_fixtures[#oilbuildings].count + 1, [#pos: tPos, #BBox: rect(-1125, -1125, 1125, 1125)])

        end case
      end repeat
    end if
    tRootXML.GetRoot()
    if tRootXML.Search("type", "SCORES", 0) then
      tHitEnemy = value(tRootXML.GetParam("HITENEMY"))
      tKilledEnemy = value(tRootXML.GetParam("KILLEDENEMY"))
      tHitNPC = value(tRootXML.GetParam("HITNPC"))
      tKilledNPC = value(tRootXML.GetParam("KILLEDNPC"))
      tSelfHit = value(tRootXML.GetParam("SELFHIT"))
      tBailout = value(tRootXML.GetParam("BAILOUT"))
      m_mp_scores.setaProp("HitEnemy", tHitEnemy)
      m_mp_scores.setaProp("KilledEnemy", tKilledEnemy)
      m_mp_scores.setaProp("HitNPC", tHitNPC)
      m_mp_scores.setaProp("KilledNPC", tKilledNPC)
      m_mp_scores.setaProp("SelfHit", tSelfHit)
      m_mp_scores.setaProp("Bailout", tBailout)
    end if
    tRootXML.GetRoot()
    if tRootXML.Search("type", "WIND", 0) then
      tChangeInterval = value(tRootXML.GetParam("CHANGEINTERVAL"))
      tChangeProb = value(tRootXML.GetParam("CHANGEPROPABILITY"))
      m_mp_wind.setaProp("ChangeInterval", tChangeInterval)
      m_mp_wind.setaProp("ChangePropability", tChangeProb)
    end if
    tRootXML.GetRoot()
    if tRootXML.Search("type", "POWERUPS", 0) then
      tInterval = value(tRootXML.GetParam("INTERVAL"))
      tPropability = value(tRootXML.GetParam("PROPABILITY"))
      tCannonballAmount = value(tRootXML.GetParam("CANNONBALLAMOUNT"))
      m_mp_powerupsettings.setaProp("Interval", tInterval)
      m_mp_powerupsettings.setaProp("Propability", tPropability)
      m_mp_powerupsettings.setaProp("CannonballAmount", tCannonballAmount)
    end if
    tRootXML.GetRoot()
    if tRootXML.Search("type", "COLLISIONMAP", 0) then
      m_collisionMap = createObject(#random, "CMap")
      tTileSize = value(tRootXML.GetParam("TILESIZE"))
      tOffset = value(tRootXML.GetParam("OFFSET"))
      tSize = value(tRootXML.GetParam("SIZE"))
      tDataMember = member(tRootXML.GetParam("DATAMEMBER"))
      m_collisionMap.InitMap(tSize.locH, tSize.locV)
      m_collisionMap.SetTileSize(tTileSize)
      m_collisionMap.SetOffset(tOffset.locH, tOffset.locV)
      repeat with i = 1 to tRootXML.count()
        tLine = tRootXML[i]
        tMapLine = tLine[#param]["MAP"]
        tOfs = 1
        repeat with c = 1 to the number of chars in tMapLine
          tChar = tMapLine.char[tOfs]
          if tChar = "-" then
            tvalue = -value(tMapLine.char[tOfs + 1])
            tOfs = tOfs + 1
          else
            tvalue = value(tMapLine.char[tOfs])
          end if
          m_collisionMap.SetMapAt(c, i, tvalue)
          tOfs = tOfs + 1
        end repeat
      end repeat
      if tDataMember.number > 0 then
        m_collisionMap.SetMap(value(tDataMember.text))
      end if
    end if
    tRootXML.GetRoot()
    if tRootXML.Search("type", "WHIRLPOOL", 0) then
      m_mp_whirlpoolsettings = [:]
      m_mp_whirlpoolsettings.setaProp("PullRadius", value(tRootXML.GetParam("PULLRADIUS")))
      m_mp_whirlpoolsettings.setaProp("PullAmount", value(tRootXML.GetParam("PULLAMT")))
      m_mp_whirlpoolsettings.setaProp("SpinSpeed", value(tRootXML.GetParam("SPINSPD")))
      m_mp_whirlpoolsettings.setaProp("ReleaseRadius", value(tRootXML.GetParam("RELEASERADIUS")))
      m_mp_whirlpoolsettings.setaProp("MoveSpeed", value(tRootXML.GetParam("MOVESPD")))
    end if
    tRootXML.GetRoot()
    if tRootXML.Search("type", "SEAMONSTER", 0) then
      m_mp_seamonstersettings = [:]
      m_mp_seamonstersettings.setaProp("ChaseTrigger", value(tRootXML.GetParam("CHASETRIG")))
      m_mp_seamonstersettings.setaProp("ChaseSpeed", value(tRootXML.GetParam("CHASESPD")))
    end if
    tRootXML.GetRoot()
    if tRootXML.Search("type", "KRAKENSEAMONSTER", 0) then
      m_mp_krakenseamonstersettings = [:]
      m_mp_krakenseamonstersettings.setaProp("ChaseTrigger", value(tRootXML.GetParam("CHASETRIG")))
      m_mp_krakenseamonstersettings.setaProp("ChaseSpeed", value(tRootXML.GetParam("CHASESPD")))
    end if
    tRootXML.GetRoot()
    if tRootXML.Search("type", "MUSIC", 0) then
      m_sMusic = tRootXML.GetParam("PLAY")
    end if
    tRootXML.GetRoot()
    m_bMoonlightUserTriggered = 0
    if tRootXML.Search("type", "MOONLIGHT", 1) then
      m_bMoonlightUserTriggered = value(tRootXML.GetParam("USER_TRIGGERED"))
    end if
  end if
end
on GetName me
  return m_sName
end
on GetCollisionMap me
  return m_collisionMap
end
on GetScores me
  return m_mp_scores
end
on GetWindSettings me
  return m_mp_wind
end
on GetPowerupSettings me
  return m_mp_powerupsettings
end
on GetStartTime me
  return m_iStartTime
end
on GetEndTime me
  return m_iEndTime
end
on GetWhirlPoolSettings me
  return m_mp_whirlpoolsettings
end
on GetSeaMonsterSettings me
  return m_mp_seamonstersettings
end
on GetKrakenSeaMonsterSettings me
  return m_mp_krakenseamonstersettings
end
on GetMusic me
  return m_sMusic
end
on GetBuildings me
  return m_mp_fixtures[#buildings]
end
on GetTurrets me
  return m_mp_fixtures[#turrets]
end
on GetOilBuildings me
  return m_mp_fixtures[#oilbuildings]
end
on GetMoonlightUserTriggered me
  return m_bMoonlightUserTriggered
end