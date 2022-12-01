import Gobelet from "./Gobelet";

export default class Joueur {
  private _nom: string;
  private _score: number = 0;
  private _point: number = 0;

  constructor(nom: string) {
    this._nom = nom;
  }

  public get nom(): string {
    return this._nom;
  }

  public get score(): number {
    return this._score;
  }

  public set score(nouveauScore: number) {
    this._score = nouveauScore;
  }

  public get point(): number {
    return this._point;
  }

  public set point(totalPoint: number) {
    this._point = totalPoint;
  }

  /**
   * Lance les dés du gobelet pour ce joueur et affiche le score obtenu
   * @param gobelet le gobelet de la partie
   */
  public jouer(gobelet: Gobelet): void {
    console.log(`lancement du gobelet avec ${gobelet.nombreDesGobelet} dés`);
    gobelet.lancer();

    this.score = gobelet.valeurGobelet;
    this.afficherScore();
  }

  /**
   * affiche le nom du joueur et le score obtenu sur cette manche
   */
  private afficherScore(): void {
    console.log(`${this.nom} a obtenu un score de ${this.score}`);
  }
}
