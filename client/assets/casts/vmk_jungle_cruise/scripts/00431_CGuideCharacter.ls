-- Script
property m_charSprite
property m_barSprite
property m_mp_constants
property m_state
property m_duration
property m_ar_frames
property m_lastTime
property m_writer
property m_writerSprite
property m_mp_lines
property m_positivePropability
property m_negativePropability
property m_watchoutPropability
property m_attentionPropability
property m_rSoundPlayer
property m_bGuideVisible

on construct me
  m_charSprite = VOID
  m_barSprite = VOID
  m_ar_frames = getVariableValue("guide_speaking_frames")
  m_mp_constants = [:]
  m_mp_constants.setaProp("LipFrequencyMS", 50)
  m_state = #idle
  m_duration = 0.0
  receiveUpdate(me.getID())
  tFontPlain = getStructVariable("struct.font.plain")
  tFontPlain.setaProp(#color, rgb("#FEFEFE"))
  tFontPlain.setaProp(#bgColor, rgb("#000000"))
  tFontPlain.setaProp(#lineHeight, 20)
  tFontPlain.setaProp(#fontSize, 20)
  tFontPlain.setaProp(#alignment, #center)
  createWriter("JCNedText", tFontPlain)
  m_writer = getWriter("JCNedText")
  m_writerSprite = VOID
  createMember("NedsText", #bitmap)
  m_rSoundPlayer = 0
  dumpVariableField(getMember("neds_lines"))
  m_mp_lines = [#positive: [], #negative: [], #attention: [], #watchout: []]
  repeat with i = 1 to getVariableValue("NedsPositiveCount")
    m_mp_lines.positive.append(getVariableValue("NedsPositive" & i))
  end repeat
  repeat with i = 1 to getVariableValue("NedsNegativeCount")
    m_mp_lines.negative.append(getVariableValue("NedsNegative" & i))
  end repeat
  repeat with i = 1 to getVariableValue("NedsAttentionCount")
    m_mp_lines.attention.append(getVariableValue("NedsAttention" & i))
  end repeat
  repeat with i = 1 to getVariableValue("NedsWatchOutCount")
    m_mp_lines.watchout.append(getVariableValue("NedsWatchOut" & i))
  end repeat
  m_positivePropability = 50
  m_negativePropability = 35
  m_watchoutPropability = 75
  m_attentionPropability = 50
  m_bGuideVisible = 0
  return 1
end
on deconstruct me
  removeMember(getMember("NedsText").memberNum)
  if not voidp(m_writerSprite) then
    releaseSprite(m_writerSprite.spriteNum)
  end if
  if not voidp(m_charSprite) then
    releaseSprite(m_charSprite.spriteNum)
  end if
  if not voidp(m_barSprite) then
    releaseSprite(m_barSprite.spriteNum)
  end if
  removeUpdate(me.getID())
  m_bGuideVisible = 0
  return 1
end
on showGuide me
  if not m_bGuideVisible then
    m_charSprite = sprite(reserveSprite(me.getID()))
    m_barSprite = sprite(reserveSprite(me.getID()))
    m_charSprite.ink = 36
    m_charSprite.locZ = 1
    m_charSprite.loc = point((the stage).image.width / 2, (the stage).image.height / 2)
    m_charSprite.member = m_ar_frames[1]
    m_charSprite.width = m_charSprite.member.width
    m_charSprite.height = m_charSprite.member.height
    m_barSprite.ink = 1
    m_barSprite.blendLevel = 150
    m_barSprite.locZ = 0
    m_barSprite.loc = point(0, 560)
    m_barSprite.width = 800
    m_barSprite.height = 40
    m_writerSprite = sprite(reserveSprite(me.getID()))
    m_writerSprite.member = getMember("NedsText")
    m_writerSprite.loc = point(100, 570)
    m_writerSprite.locZ = 0
    m_writerSprite.member.image = image(0, 0, 8)
    m_writerSprite.width = m_writerSprite.member.width
    m_writerSprite.height = m_writerSprite.member.height
    m_bGuideVisible = 1
  end if
end
on SetSoundPlayer me, a_rObject
  m_rSoundPlayer = a_rObject
end
on SaySomething me, i_sSampleMember, i_sText
  tmember = getMember(i_sSampleMember)
  m_state = #speaking
  if not voidp(tmember) and m_rSoundPlayer <> 0 then
    m_rSoundPlayer.Guide(tmember)
  end if
  if m_bGuideVisible then
    tImage = m_writer.render(i_sText)
    m_writerSprite.member.image = tImage
    m_writerSprite.width = m_writerSprite.member.width
    m_writerSprite.height = m_writerSprite.member.height
    m_writerSprite.member.regPoint = point(0, 0)
  end if
  m_duration = 2.0
  m_lastTime = the milliSeconds / 1000.0
end
on SayPositive me, a_val
  tProb = random(100)
  if tProb <= m_positivePropability then
    if not a_val then
      a_val = random(m_mp_lines.positive.count)
    end if
    me.SaySomething(m_mp_lines.positive[a_val].sound, m_mp_lines.positive[a_val].text)
  end if
end
on SayNegative me, a_val
  tProb = random(100)
  if tProb <= m_negativePropability then
    if not a_val then
      a_val = random(m_mp_lines.negative.count)
    end if
    me.SaySomething(m_mp_lines.negative[a_val].sound, m_mp_lines.negative[a_val].text)
  end if
end
on SayAttention me, a_val
  tProb = random(100)
  if tProb <= m_attentionPropability then
    if not a_val then
      a_val = random(m_mp_lines.attention.count)
    end if
    me.SaySomething(m_mp_lines.attention[a_val].sound, m_mp_lines.attention[a_val].text)
  end if
end
on SayWatchout me, a_val
  tProb = random(100)
  if tProb <= m_watchoutPropability then
    if not a_val then
      a_val = random(m_mp_lines.watchout.count)
    end if
    me.SaySomething(m_mp_lines.watchout[a_val].sound, m_mp_lines.watchout[a_val].text)
  end if
end
on update me
  if m_bGuideVisible then
    tTime = the milliSeconds / 1000.0
    dt = tTime - m_lastTime
    m_lastTime = tTime
    case m_state of
      #idle:
        m_charSprite.member = m_ar_frames[1]
        m_charSprite.width = m_charSprite.member.width
        m_charSprite.height = m_charSprite.member.height
      #speaking:
        tRem = the milliSeconds mod m_mp_constants["LipFrequencyMS"]
        tFrame = tRem / (m_mp_constants["LipFrequencyMS"] / m_ar_frames.count + 1) + 1
        m_charSprite.member = m_ar_frames[tFrame]
        m_charSprite.width = m_charSprite.member.width
        m_charSprite.height = m_charSprite.member.height
        m_duration = m_duration - dt
        if m_duration < 0.0 then
          m_state = #idle
        end if

    end case
  end if
end
on GetHideables me
  if m_bGuideVisible then
    return [the spriteNum of m_writerSprite, the spriteNum of m_charSprite, the spriteNum of m_barSprite]
  else
    return []
  end if
end