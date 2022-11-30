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
    return this._valeurGobelet;
  }

  public set valeurGobelet(nouvelleValeur: number) {
    this._valeurGobelet = nouvelleValeur;
  }

  public ajouterDes(nombreDes: number): void {
    for (let index = 0; index < nombreDes; index++) {
      this._listeDes.push(new De());
    }
  }

  /**
   * Lance la totalité des dés contenus dans le gobelet
   * @returns la valeur du gobelet
   */
  public lancer(): number {
    this._listeDes.forEach((De) => {
      De.lancer();
    });

    this.mettreAJourValeur();

    return this.valeurGobelet;
  }

  /**
   * Met a jour la valeur du gobelet
   */
  public mettreAJourValeur(): void {
    let valeur: number = 0;

    this._listeDes.forEach((De) => {
      valeur += De.valeurDe;
    });

    this.valeurGobelet = valeur;
  }

  public afficherScore(): void {
    console.log(
      `Ce gobelet contient ${this._listeDes.length} dés d'un score total de ${this.valeurGobelet}`
    );
  }
}
