-- Behavior
on AddFolderToClothCasts a_sData, a_sFolder
  if a_sFolder.char[a_sFolder.length] <> "/" then
    a_sFolder = a_sFolder & "/"
  end if
  t_rdata = value(a_sData)
  t_rOutput = [:]
  t_iCount = t_rdata.count
  repeat with i = 1 to t_iCount
    t_sSet = t_rdata.getPropAt(i)
    t_rList = []
    repeat with j = 1 to t_rdata[i].count
      t_rList.add(a_sFolder & t_rdata[i][j])
    end repeat
    t_rOutput[t_sSet] = t_rList
  end repeat
  return t_rOutput
end