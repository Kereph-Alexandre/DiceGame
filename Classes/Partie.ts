import Gobelet from "./Gobelet";
import Joueur from "./Joueur";

export default class Partie {
  private _nombreTours: number;

  private _gobelet: Gobelet;
  private _listeJoueurs: Joueur[] = [];

  constructor(gobelet: Gobelet) {
    this._gobelet = gobelet;
  }

  public get nombreTours(): number {
    return this.nombreTours;
  }

  //Pas de set nombretours, une fois lancée, la partie va jusqu'au bout...

  public initialiserPartie(): void {
    //On prend le nombre de joueurs
    //
  }
}
