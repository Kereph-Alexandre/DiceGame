import Gobelet from "./Gobelet";

export default class Joueur {
  private _nom: string;
  private _score: number = 0;

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

  /**
   * Lance les dés du gobelet pour ce joueur et affiche le score obtenu
   * @param gobelet le gobelet de la partie
   */
  private jouer(gobelet: Gobelet): void {
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
