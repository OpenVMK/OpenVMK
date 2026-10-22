-- Behavior
on fixregpoints
  t_cst = castLib("vmk_haunted_mansion_interface")
  t_num = t_cst.member.count
  repeat with i = 1 to t_num
    t_mem = member(i, "vmk_haunted_mansion_interface")
    if t_mem.type = #bitmap then
      put t_mem.name
      t_mem.regPoint = point(0, 0)
    end if
  end repeat
end