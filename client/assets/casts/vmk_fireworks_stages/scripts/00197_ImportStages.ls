-- Behavior
on ImportFireworksStages
  t_ar_ext = []
  t_ar_ext.append(EMPTY)
  repeat with s = 1 to 5
    repeat with i = 1 to 3
      repeat with tExts in t_ar_ext
        tMemName = "stage.fireworks.level" & s & "-stage" & i & tExts & ".xml"
        tMem = new(#field)
        tMem.name = tMemName
        if not voidp(tMem) then
          f = xtra("FileIO").new()
          tPath = _movie.path
          tMedia = VOID
          if objectp(f) then
            f.openfile(tPath & tMemName, 1)
            if f.error(f.status()) = "OK" then
              tString = f.readFile()
              tMem.text = tString
              f.closeFile()
            else
              put f.status() && f.error(f.status())
            end if
            next repeat
          end if
          put f.status() && f.error(f.status())
        end if
      end repeat
    end repeat
  end repeat
end