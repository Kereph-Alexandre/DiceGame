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

  public get nombreJoueur(): number {
    return this._listeJoueurs.length;
  }

  public set nombreTours(nombreManche: number) {
    this._nombreTours = nombreManche;
  }

  public initialiserPartie(joueurs: Joueur[], nombreManche: number): void {
    //On prend le nombre de joueurs et on les intègres aux joueurs de la partie
    this.integrerJoueursPartie(joueurs);

    //On vérifie si le nombre de manches est cohérent avec le nombre de joueurs
    //Si nbJoueurs pair et nbManches Pair OU nbJoueur Impair et nbManches Impair
    //nbManches +1
    this.nombreTours = this.VerifierNombreManches(nombreManche);

    //On peut lancer la partie

    //On a un gobelet
    //On a besoin de X Dés pour X Joueurs
    this._gobelet.ajouterDes(this.nombreJoueur);

    //On reset les scores des joueurs
    this.resetScore();
  }

  public integrerJoueursPartie(joueurs: Joueur[]): void {
    joueurs.forEach((joueur) => {
      this._listeJoueurs.push(joueur);
    });
  }

  public VerifierNombreManches(nombreManche: number): number {
    const nombreJoueur: number = this.nombreJoueur;
    if (
      (nombreJoueur % 2 == 0 && nombreManche % 2 == 0) ||
      (nombreJoueur % 2 == 1 && nombreManche % 2 == 1)
    ) {
      return nombreManche++;
    } else {
      return nombreManche;
    }
  }

  public resetScore(): void {
    this._listeJoueurs.forEach((joueur) => {
      joueur.score = 0;
    });
  }

  public lancerPartie(): void {
    //On prend le premier joueur
    //On lance les dés du gobelet (Class Gobelet)
    // On lance les dés un a un (Class Dé)
    //On récupère la valeur du gobelet
    //On affecte la valeur du gobelet au Joueur
    this._listeJoueurs.forEach((joueur) => {
      joueur.jouer(this._gobelet);
    });
    //On passe au joueur suivant

    //Tous les joueurs = 1tour
    //On repete pour le nombre de tours
  }

  public determinerVainqueurManche(): void {
    //Rechercher Array.reduce
    //Pour Chacun des joueurs
    //on compare les score
    //Le joueur avec le score le plus élevé
    //nombrePoints +1
  }
}
