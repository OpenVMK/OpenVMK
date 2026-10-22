-- Script
on construct this
  executeMessage("LoadRoomSound", "castle_spellroom_")
  return 1
end
on deconstruct this
  executeMessage("StopRoomSound")
  return 1
end