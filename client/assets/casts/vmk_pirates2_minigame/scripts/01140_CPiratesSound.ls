-- Script
property m_rMusic
property m_rSea
property m_ar_rFX
property m_iChannel
property m_mp_sSoundList
property m_mp_rVOList
property m_iSeldomAcc
property m_rCountDown

on construct me
  m_rSea = sound(7)
  m_rMusic = sound(6)
  m_rCountDown = sound(8)
  m_ar_rFX = []
  m_ar_rFX[1] = createObject(#random, "CSoundObject")
  m_ar_rFX[2] = createObject(#random, "CSoundObject")
  m_ar_rFX[3] = createObject(#random, "CSoundObject")
  m_ar_rFX[4] = createObject(#random, "CSoundObject")
  m_iChannel = 1
  m_iSeldomAcc = 1
  m_mp_sSoundList = [:]
  m_mp_sSoundList.setaProp("Cannon", ["PG-broadside-1", "PG-broadside-2", "PG-cannon-2"])
  m_mp_sSoundList.setaProp("BroadSide", ["PG-broadside-1", "PG-broadside-2"])
  m_mp_sSoundList.setaProp("Hit", ["PG-cannon-6", "PG-cannon-7", "PG-cannon-9", "PG-cannon-11", "PG-hit-4", "PG-hit-5"])
  m_mp_sSoundList.setaProp("Splash", ["PG-miss-water"])
  m_mp_sSoundList.setaProp("Acknowledge", ["UI-click"])
  m_mp_sSoundList.setaProp("Fanfare", ["PG-fanfare"])
  m_mp_sSoundList.setaProp("Countdown", ["PVO-three", "PVO-two", "PVO-one", "PVO-timetosetsail"])
  m_mp_sSoundList.setaProp("Moonlight", ["PG-moonlight"])
  m_mp_sSoundList.setaProp("Panic", ["PG-panic"])
  m_mp_sSoundList.setaProp("Preshoot", ["PG-preshoot-II"])
  m_mp_sSoundList.setaProp("LoadCannon", ["PG-load-cannon-II"])
  m_mp_sSoundList.setaProp("Fanfare", ["PG-fanfare"])
  m_mp_sSoundList.setaProp("DropFlag", ["POTC2-SFX-drop-flag"])
  m_mp_sSoundList.setaProp("FlagToBase", ["POTC2-SFX-flagtobase"])
  m_mp_sSoundList.setaProp("TurnIntoRowboat", ["POTC2-SFX-turnintoarobot"])
  m_mp_sSoundList.setaProp("SeaMonsterAttack", ["POTC2-SFX-seamonster"])
  m_mp_sSoundList.setaProp("GoldenCannonball", ["POTC2-SFX-goldencannonball"])
  m_mp_sSoundList.sort()
  m_mp_rVOList = [:]
  m_mp_rVOList.setaProp(#Acknowledge, [getMember("PVO-shipsahoy"), getMember("PVO-apirateslifeforme"), getMember("PVO-aicaptain")])
  m_mp_rVOList.setaProp(#fire, [getMember("PVO-blastthose"), getMember("PVO-cannonsaway"), getMember("PVO-runashotacross"), getMember("PVO-takethis")])
  m_mp_rVOList.setaProp(#CannonsReady, [getMember("PVO-cannonsreadycaptain")])
  m_mp_rVOList.setaProp(#LowHealth, [getMember("PVO-hullbreached")])
  m_mp_rVOList.setaProp(#OutOfAmmo, [getMember("PVO-outofammo")])
  m_mp_rVOList.setaProp(#OwnTeamWins, [getMember("PVO-goodworkmehardies")])
  m_mp_rVOList.setaProp(#OtherTeamWins, [getMember("PVO-wevelost")])
  m_mp_rVOList.setaProp(#OwnShipHit, [getMember("PVO-shivermetimbers"), getMember("PVO-wevebeenhit")])
  m_mp_rVOList.setaProp(#GetHealth, [getMember("PVO-weverepairedtheship")])
  m_mp_rVOList.setaProp(#GetAmmo, [getMember("PVO-abountofcargoisyours")])
  m_mp_rVOList.setaProp(#GetFlag, [getMember("POTC2-SFX-pickup-flag")])
  m_mp_rVOList.setaProp(#Death, [getMember("PG-death")])
  m_mp_rVOList.setaProp(#BlowShip, [getMember("PVO-wevebeensunk")])
  m_mp_rVOList.setaProp(#TimeLow, [getMember("PVO-timeisrunningout")])
  m_mp_rVOList.sort()
  return 1
end
on deconstruct me
  m_rSea.stop()
  m_rMusic.stop()
  m_ar_rFX[1].StopSound()
  m_ar_rFX[2].StopSound()
  m_ar_rFX[3].StopSound()
  m_ar_rFX[4].StopSound()
  m_rSea = VOID
  m_rMusic = VOID
  removeObject(m_ar_rFX[1])
  removeObject(m_ar_rFX[2])
  removeObject(m_ar_rFX[3])
  removeObject(m_ar_rFX[4])
  return 1
end
on playFx me, a_sFX
  t_bMusic = getObject(#session).get("fx")
  if t_bMusic then
    m_iChannel = m_iChannel + 1
    if m_iChannel > m_ar_rFX.count then
      m_iChannel = 1
    end if
    m_ar_rFX[m_iChannel].StopSound()
    m_ar_rFX[m_iChannel].SetSoundType("fx")
    m_ar_rFX[m_iChannel].SetParameter("cut")
    m_ar_rFX[m_iChannel].Define(a_sFX)
    t_rChannel = m_ar_rFX[m_iChannel].GetSoundChannel()
    if objectp(t_rChannel) then
      put "m_ar_rFX1" && t_rChannel && t_rChannel.isBusy()
    end if
    m_ar_rFX[m_iChannel].PlaySound()
    t_rChannel = m_ar_rFX[m_iChannel].GetSoundChannel()
    put "m_ar_rFX" && t_rChannel && t_rChannel.isBusy()
  end if
end
on playMusic me, a_sMusic
  t_bMusic = getObject(#session).get("music")
  if t_bMusic then
    m_rMusic.stop()
    m_rMusic.setPlayList([[#member: member(getmemnum(a_sMusic)), #loopCount: 1]])
    m_rMusic.play()
  end if
end
on PlaySea me
  t_bMusic = getObject(#session).get("fx")
  if t_bMusic then
    m_rSea.stop()
    m_rSea.setPlayList([[#member: member(getmemnum("PG-sea-mono-loop"))]])
    m_rSea.play()
  end if
end
on PlayCannon me, a_bGolden
  if a_bGolden then
    me.playFx(m_mp_sSoundList["GoldenCannonball"][1])
  else
    tRandom = random(m_mp_sSoundList["Cannon"].count)
    me.playFx(m_mp_sSoundList["Cannon"][tRandom])
  end if
end
on PlayBroadSide me
  tRandom = random(m_mp_sSoundList["BroadSide"].count)
  me.playFx(m_mp_sSoundList["BroadSide"][tRandom])
end
on PlaySplash me
  tRandom = random(m_mp_sSoundList["Splash"].count)
  me.playFx(m_mp_sSoundList["Splash"][tRandom])
end
on PlayHit me
  tRandom = random(m_mp_sSoundList["Hit"].count)
  me.playFx(m_mp_sSoundList["Hit"][tRandom])
end
on PlayAcknowledge me
  tRandom = random(m_mp_sSoundList["Acknowledge"].count)
  me.playFx(m_mp_sSoundList["Acknowledge"][tRandom])
end
on PlayCountDown me, a_offset
  if getObject(#session).get("fx") then
    m_rCountDown.stop()
    m_rCountDown.setPlayList([[#member: getMember(m_mp_sSoundList["Countdown"][a_offset])]])
    m_rCountDown.play()
  end if
end
on PlayMoonlight me
  me.playFx(m_mp_sSoundList["Moonlight"][1])
end
on PlayPanic me
  me.playFx(m_mp_sSoundList["Panic"][1])
end
on PlayPreshoot me
  me.playFx(m_mp_sSoundList["Preshoot"][1])
end
on PlayLoadCannon me
  me.playFx(m_mp_sSoundList["LoadCannon"][1])
end
on PlayFanfare me
  me.playFx(m_mp_sSoundList["Fanfare"][1])
end
on PlayDropFlag me
  me.playFx(m_mp_sSoundList["DropFlag"][1])
end
on PlayFlagToBase me
  me.playFx(m_mp_sSoundList["FlagToBase"][1])
end
on PlayTurnIntoRowboat me
  me.playFx(m_mp_sSoundList["TurnIntoRowboat"][1])
end
on PlaySeaMonsterAttack me
  me.playFx(m_mp_sSoundList["SeaMonsterAttack"][1])
end
on PlayVoiceOver me, a_sType
  if getObject(#session).get("fx") then
    if not m_rMusic.isBusy() then
      m_rMusic.stop()
      tRandom = random(m_mp_rVOList[a_sType].count)
      t_rMem = m_mp_rVOList[a_sType][tRandom]
      m_rMusic.setPlayList([[#member: t_rMem]])
      m_rMusic.play()
    end if
  end if
end
on PlayVoiceOverSeldom me, a_sType
  if m_iSeldomAcc >= getVariableValue("sound.voiceoverskip") then
    if getObject(#session).get("fx") then
      if not m_rMusic.isBusy() then
        m_rMusic.setPlayList([:])
        m_rMusic.stop()
        tRandom = random(m_mp_rVOList[a_sType].count)
        t_rMem = m_mp_rVOList[a_sType][tRandom]
        m_rMusic.setPlayList([[#member: t_rMem]])
        m_rMusic.play()
      end if
    end if
    m_iSeldomAcc = 1
  else
    m_iSeldomAcc = m_iSeldomAcc + 1
  end if
end