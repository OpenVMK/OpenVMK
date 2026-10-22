-- Behavior
on MMparseSounds
  cstName = "vmk_music_mixer/vmk_monorail_mixer_samples"
  cst = castLib(cstName)
  t = the milliSeconds
  soundCount = 0
  Output = [:]
  repeat with i = 1 to cst.member.count
    mbr = member(i, cstName)
    if mbr.type = #sound then
      soundCount = soundCount + 1
      Output.setaProp(soundCount, mbr.name)
    end if
  end repeat
end
on MMcheckSoundNames
  cstName = "vmk_music_mixer/vmk_monorail_mixer_samples"
  cst = castLib(cstName)
  t = the milliSeconds
  oldDelim = the itemDelimiter
  the itemDelimiter = "-"
  repeat with i = 1 to cst.member.count
    mbr = member(i, cstName)
    if mbr.type = #sound then
      if mbr.name contains "-" then
        tDuration = mbr.duration
        if tDuration > 3400 and tDuration < 4100 then
          tLength = 4
        else
          tLength = 2
        end if
        case mbr.name.item[1] of
          "bass":
            tInstrument = "bas"
            tBank = "20"
          "drums":
            tInstrument = "drm"
            tBank = EMPTY
          "guitar":
            tInstrument = "gtr"
            tBank = "10"
          "FX":
            tInstrument = "fx"
            tBank = "40"
          "synth":
            tInstrument = "snt"
            tBank = "30"

        end case
        tName = tInstrument & "_" & tBank & mbr.name.item[2] & "_" & tLength
        mbr.name = tName
      end if
    end if
  end repeat
  the itemDelimiter = oldDelim
end