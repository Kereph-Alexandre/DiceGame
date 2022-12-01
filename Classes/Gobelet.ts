import De from "./De";

export default class Gobelet {
  private _listeDes: De[] = [];
  private _valeurGobelet: number = 0;

  public get valeurGobelet(): number {
    return this._valeurGobelet;
  }

  public get nombreDesGobelet(): number {
    return this._listeDes.length;
  }

  public set valeurGobelet(nouvelleValeur: number) {
    this._valeurGobelet = nouvelleValeur;
  }

  /**
   * Créer un nombre de dés dans le gobelet
   * @param nombreDes nombre de dés a créer
   */
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

  /**
   * affiche le nombre de dés dans le gobelet et le score obtenu lors du dernier lancé
   */
  public afficherScore(): void {
    console.log(
      `Ce gobelet contient ${this.nombreDesGobelet} dés d'un score total de ${this.valeurGobelet}`
    );
  }
}
