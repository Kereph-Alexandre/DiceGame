import De from "./De";

export default class Gobelet {
  private _listeDes: De[] = [];
  private _valeurGobelet: number;

  constructor() {
    this._listeDes.forEach((De) => {
      this._valeurGobelet += De.valeurDe;
    });
  }

  public get valeurGobelet(): number {
    let valeur: number = 0;

    this._listeDes.forEach((De) => {
      valeur += De.valeurDe;
    });

    return valeur;
  }

  public set valeurDe(nouvelleValeur: number) {
    this._valeurGobelet = nouvelleValeur;
  }
}
