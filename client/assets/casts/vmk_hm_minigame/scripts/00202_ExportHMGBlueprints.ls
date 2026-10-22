-- Behavior
on ExportHMGBlueprints
  t_ar_files = []
  t_ar_files.append("hm_level1")
  t_ar_files.append("hm_level2")
  t_ar_files.append("hm_level3")
  t_ar_files.append("hm_level4")
  repeat with t_sLevelName in t_ar_files
    tMem = member("room." & t_sLevelName & ".object.xml")
    if tMem.number > 0 then
      tMemName = t_sLevelName & ".xml"
      f = xtra("FileIO").new()
      tPath = _movie.path
      tMedia = VOID
      if objectp(f) then
        f.createFile(tPath & tMemName)
        if f.error(f.status()) = "OK" then
          f.openfile(tPath & tMemName, 2)
          if f.error(f.status()) = "OK" then
            f.writeString(tMem.text)
            f.closeFile()
          else
            put f.status() && f.error(f.status())
          end if
        else
          put f.status() && f.error(f.status())
        end if
        next repeat
      end if
      put f.status() && f.error(f.status())
    end if
  end repeat
end