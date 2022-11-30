export default class De {
  private _valeurDe: number = 0;

  public get valeurDe(): number {
    return this._valeurDe;
  }

  /**
   * Génère une valeur aléatoire pour le Dé
   * @returns une valeur entre 1 et 6
   */
  public lancer(): number {
    return Math.random() * 5 + 1;
  }
}
