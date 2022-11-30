export default class De {
  private _valeur: number;

  constructor(valeur: number) {
    this._valeur = valeur;
  }

  /**
   * Génère une valeur aléatoire pour le Dé
   * @returns une valeur entre 1 et 6
   */
  private lancer(): number {
    return Math.random() * 5 + 1;
  }
}
