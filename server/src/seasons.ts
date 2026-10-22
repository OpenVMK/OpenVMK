/**
 * Seasonal rooms. `VMK_SEASON=xmas` or `VMK_SEASON=halloween` swaps each room
 * that has a decorated version to it; unset (the default) serves the everyday
 * park. `VMK_HOLIDAY=1` is kept as the old spelling of `xmas`.
 *
 * ONE SWITCH, BOTH CLIENTS. The swap happens in the `room.cast.<N>.<i>` lines
 * of the config the game serves, which Shockwave and the TS client both read:
 *
 *   - Shockwave fetches the path as written, e.g. `vmk_spaces/xmas/vmk_hub2`,
 *     straight from the archive.
 *   - The TS client keys an extraction by basename, so a cast under a season
 *     folder gets the season as a suffix (`castKey` in boot-client.ts):
 *     `vmk_hub2.xmas`, built by tools/extract-season-casts.mjs.
 *
 * WHAT A SEASON CHANGES, all from casts that exist in the archive:
 *   - Room art: any room whose space cast `vmk_spaces/<name>` has a same-named
 *     twin in the season's folder.
 *       Christmas: Central Plaza, Town Square, Main Street, Castle Forecourt,
 *         Esplanade.
 *       Halloween: the same five, plus the Haunted Mansion Lobby.
 *   - Music, where the season has a track of its own (`SOUNDS` below).
 *   - Christmas adds `vmk_holiday_animation` to every room it redecorates.
 *     This is the falling-snow layer the archived config put on those five rooms.
 *   - Whole guest-room styles with a seasonal build (`ROOMS` below).
 */

export type Season = "xmas" | "halloween";

export function seasonFromEnv(): Season | null {
  const raw = (process.env.VMK_SEASON ?? "").trim().toLowerCase();
  if (raw === "xmas" || raw === "christmas" || raw === "holiday") return "xmas";
  if (raw === "halloween") return "halloween";
  if (process.env.VMK_HOLIDAY === "1") return "xmas";
  return null;
}

/** Archive folders holding a season's same-named room casts, first wins. */
const FOLDERS: Record<Season, string[]> = {
  xmas: ["vmk_spaces/xmas"],
  halloween: ["vmk_spaces/halloween", "vmk_spaces/vmk_halloween"],
};

/** Everyday sound cast basename -> the season's track. */
const SOUNDS: Record<Season, Record<string, string>> = {
  xmas: {
    vmk_snd_hub2: "vmk_sound/vmk_snd_hub2_xmas",
  },
  halloween: {
    vmk_snd_hub2: "vmk_sound/vmk_halloween/vmk_snd_hub2_halloween",
    // Town Square and Main Street share one Halloween track.
    vmk_snd_main_street1: "vmk_sound/vmk_halloween/vmk_snd_main_street_halloween",
    vmk_snd_main_street2: "vmk_sound/vmk_halloween/vmk_snd_main_street_halloween",
  },
};

/**
 * Room code -> a seasonal space cast under another name. Wins over the folder
 * twin.
 *
 * Main Street at Halloween: `halloween/vmk_musical_mainstreet` is an OLDER
 * build of the room, from before the Penny Arcade door. It has 379 tiles, all
 * renumbered. `vmk_musical_mainstreet_penny_halloween` is the same decoration
 * on today's layout, tile for tile, so every exit, seat and route stays valid.
 * Christmas has only the older build (see `SEASONAL_LAYOUTS` in mus-server.ts
 * for how that is handled).
 */
const ROOMS: Record<Season, Record<string, { from: string; to: string }>> = {
  xmas: {
    "53": { from: "vmk_mad_hatter_private", to: "vmk_spaces/vmk_mad_hatter_private_xmas" },
  },
  halloween: {
    "4": { from: "vmk_musical_mainstreet", to: "vmk_spaces/vmk_halloween/vmk_musical_mainstreet_penny_halloween" },
  },
};

/**
 * The extraction a cast path loads in the TS client — the same rule as
 * `castKey` in client/src/lingo/boot-client.ts. Keep the two in step.
 */
export function seasonCastKey(path: string): string {
  const parts = path.split("/");
  const base = (parts.pop() ?? path).replace(/\.(cct|cst)$/i, "");
  const folder = parts.pop()?.toLowerCase();
  const season = folder === "xmas" ? "xmas" : folder === "halloween" || folder === "vmk_halloween" ? "halloween" : null;
  return season && !base.toLowerCase().includes(season) ? `${base}.${season}` : base;
}

/** The archived config's Christmas paths, reduced to the everyday casts (see assets.ts). */
export const deHoliday = (path: string): string =>
  path.replace(/(^|\/)(vmk_holiday_overlays|holiday)\//g, "$1");

/**
 * Rewrite one room's cast list for `season`. `exists` answers whether an
 * archive path can be served; nothing is swapped to a file that is not there.
 * Returns the new list and a note per change, for the log.
 */
export function seasonalCasts(
  season: Season,
  room: string,
  casts: string[],
  exists: (path: string) => boolean,
): { casts: string[]; changes: string[] } {
  const changes: string[] = [];
  let redecorated = false;
  const out = casts.map((path) => {
    const base = path.split("/").pop() ?? path;
    const whole = ROOMS[season][room];
    if (whole && base === whole.from && exists(whole.to)) {
      changes.push(`${base} -> ${whole.to}`);
      // Main Street's Penny Arcade build is a public room like the other four:
      // at Christmas it would take the snow too. Guest rooms do not.
      if (!base.endsWith("_private")) redecorated = true;
      return whole.to;
    }
    if (path.startsWith("vmk_spaces/") && !path.includes("/", "vmk_spaces/".length)) {
      for (const folder of FOLDERS[season]) {
        const twin = `${folder}/${base}`;
        if (exists(twin)) {
          changes.push(`${base} -> ${twin}`);
          redecorated = true;
          return twin;
        }
      }
    }
    const track = SOUNDS[season][base];
    if (track && exists(track)) {
      changes.push(`${base} -> ${track}`);
      return track;
    }
    return path;
  });
  const snow = "vmk_spaces/xmas/vmk_holiday_animation";
  if (season === "xmas" && redecorated && exists(snow) && !out.includes(snow)) {
    out.push(snow);
    changes.push(`+ ${snow}`);
  }
  return { casts: out, changes };
}
