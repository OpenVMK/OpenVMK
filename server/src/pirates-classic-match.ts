/**
 * Pirates of the Caribbean, the 2005 game (POTC1) — one running match in the
 * Classics Lobby (room 1010). See docs/POTC-CLASSIC-PORT.md for how the 2005
 * client differs from the 2006 one this server already plays.
 *
 * PLACEHOLDER: the lobby is wired; the match is not yet. A started game tells
 * its players so and hands them back to the lobby.
 */
import type { Participant, PotcGame, PotcPlayer } from "./pirates.js";

export class PotcClassicMatch implements PotcGame {
  /** False until the 2005 match is served: the lobby then refuses START. */
  static readonly ready: boolean = false;
  private readonly humans: PotcPlayer[] = [];

  constructor(
    readonly ref: number,
    private readonly level: number,
    participants: Participant[],
    players: Map<number, PotcPlayer>,
    private readonly onOver: (match: PotcGame) => void,
  ) {
    for (const p of participants) {
      const player = p.ref > 0 ? players.get(p.ref) : undefined;
      if (player) this.humans.push(player);
    }
  }

  get bucket(): string {
    return `potc-classic#${this.ref}`;
  }

  prepare(): void {
    console.log(`[pirates-classic #${this.ref}] level ${this.level}: match not implemented yet`);
    for (const h of this.humans) h.alert("Classic Pirates games are not ready yet. Stay tuned!");
    this.onOver(this);
  }

  has(): boolean {
    return false;
  }

  roomStarted(): boolean {
    return false;
  }

  stageLoaded(): void {}

  action(): void {}

  drop(): void {}
}
