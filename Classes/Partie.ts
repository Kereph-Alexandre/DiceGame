import Gobelet from "./Gobelet";
import Joueur from "./Joueur";

export default class Partie {
  private _nombreTours: number = 1;

  private _gobelet: Gobelet;
  private _listeJoueurs: Joueur[] = [];

  constructor(gobelet: Gobelet) {
    this._gobelet = gobelet;
  }

  public get nombreTours(): number {
    return this._nombreTours;
  }

  public get nombreJoueur(): number {
    return this._listeJoueurs.length;
  }

  public set nombreTours(nombreManche: number) {
    this._nombreTours = nombreManche;
  }

  /**
   * Initialise une partie : intègre les joueurs, corrige le nombre de manche nécessaire, créée les dés et réinitialise les scores de chaque joueur.
   * @param joueurs liste des joueurs présent pour la partie.
   * @param nombreManche nombre de manche souhaité pour départager les joueurs.
   */
  public initialiserPartie(joueurs: Joueur[], nombreManche: number): void {
    //On prend le nombre de joueurs et on les intègres aux joueurs de la partie
    console.log(`Initialisation de la partie`);
    this.integrerJoueursPartie(joueurs);

    //On vérifie si le nombre de manches est cohérent avec le nombre de joueurs
    console.log(`Vérification du nombre de manches`);
    this.nombreTours = this.VerifierNombreManches(nombreManche);

    //On peut lancer la partie

    //On a un gobelet
    //On a besoin de X Dés pour X Joueurs
    console.log(`Création de ${this._listeJoueurs.length} dés`);
    this._gobelet.ajouterDes(this.nombreJoueur);

    //On reset les scores des joueurs
    console.log(`Réinitialisation des scores des joueurs`);
    this.resetScore();
  }

  /**
   * Inclue les joueurs présents à la liste des joueurs De la partie.
   * @param joueurs liste des joueurs.
   */
  private integrerJoueursPartie(joueurs: Joueur[]): void {
    joueurs.forEach((joueur) => {
      this._listeJoueurs.push(joueur);
    });
  }

  /**
   * Vérifie que le nombre de manche jouée puisse faire ressortir un vainqueur net.
   * @param nombreManche nombre de manches souhaitée par les joueurs.
   * @returns le nombre de manches corrigé (+1 si nécessaire).
   */
  private VerifierNombreManches(nombreManche: number): number {
    console.log(`Nombre de manches souhaitées : ${nombreManche}`);

    //Si nombre de Joueurs pair et nombre de Manches Pair OU nbJoueur Impair et nbManches Impair
    //nombre de Manches +1
    const nombreJoueur: number = this.nombreJoueur;
    if (
      (nombreJoueur % 2 == 0 && nombreManche % 2 == 0) ||
      (nombreJoueur % 2 == 1 && nombreManche % 2 == 1)
    ) {
      return nombreManche + 1;
    } else {
      return nombreManche;
    }
  }

  /**
   * Réinitialise le score de chaque joueur.
   */
  public resetScore(): void {
    this._listeJoueurs.forEach((joueur) => {
      joueur.score = 0;
    });
  }

  /**
   * Lance le processus de déroulement d'une partie.
   */
  public lancerPartie(): void {
    for (let indexTour = 1; indexTour <= this.nombreTours; indexTour++) {
      this.resetScore();
      this.effectuerTour();
      console.log(`Fin du tour n°${indexTour}`);
    }

    //Afficher le nombre de manches gagnées par chaque joueur
    this.afficherScoresFinaux();

    //On détermine le vainqueur de la partie
    this.determinerVainqueurPartie(this._listeJoueurs);
  }

  /**
   * Effectue les actions nécessaire au déroulement d'un tour : Jouer et déterminer le vainqueur.
   */
  private effectuerTour(): void {
    //Chaque joueur lance le gobelet (et lance donc les dés qu'il contient)
    this._listeJoueurs.forEach((joueur) => {
      joueur.jouer(this._gobelet);
    });

    //On détermine le vainqueur de la manque
    this.determinerVainqueurManche(this._listeJoueurs);
  }

  /**
   * Détermine le(s) joueur(s) avec le plus haut score sur la manche et les faits rejouer s'ils sont plusieurs.
   * @param joueurs Liste des joueurs encore en possibilité de remporter la manche.
   */
  private determinerVainqueurManche(joueurs: Joueur[]): void {
    //On trouve le plus grand score
    const plusGrandScoreManche: number =
      this.determinerPlusGrandeValeur(joueurs);

    //On trouve tous les joueurs avec le plus Haut score
    let listeVainqueursPotentiels: Joueur[] = [];
    this.reunirJoueursHautScore(
      joueurs,
      plusGrandScoreManche,
      listeVainqueursPotentiels
    );

    //On fait rejouer les joueurs avec le meme score
    //Si le joueur est seul, il gagne la manche
    if (listeVainqueursPotentiels.length > 1) {
      listeVainqueursPotentiels.forEach((joueur) => {
        joueur.jouer(this._gobelet);
      });
      this.determinerVainqueurManche(listeVainqueursPotentiels);
    } else {
      console.log(`${listeVainqueursPotentiels[0].nom} gagne la manche`);
      listeVainqueursPotentiels[0].point += 1;
    }
  }

  /**
   * Parcours la liste des joueurs présents pour trouver le plus haut score réalisé cette manche.
   * @param joueurs liste des joueurs pouvant remporter la manche.
   * @returns le plus haut score réalisé.
   */
  private determinerPlusGrandeValeur(joueurs: Joueur[]): number {
    //On stock le score du premier joueur comme étant la plus grand pour l'instant
    let plusGrandScore = joueurs[0].score;

    //On parcours la liste des joueurs
    joueurs.forEach((joueur) => {
      if (joueur.score > plusGrandScore) {
        plusGrandScore = joueur.score;
      }
    });

    return plusGrandScore;
  }

  /**
   * Mets à part les joueurs ayant réalisé le plus haut score de la partie.
   * @param joueursEnLice Joueurs ayant joué ce tour.
   * @param plusGrandScore Score maximal réalisé ce tour.
   * @param vainqueursPotentiels Joueurs pouvant gagner le tour.
   */
  private reunirJoueursHautScore(
    joueursEnLice: Joueur[],
    plusGrandScore: number,
    vainqueursPotentiels: Joueur[]
  ): void {
    joueursEnLice.forEach((joueur) => {
      if (joueur.score === plusGrandScore) {
        vainqueursPotentiels.push(joueur);
      }
    });
  }
  private reunirJoueursPoints(
    joueursEnLice: Joueur[],
    plusGrandScore: number,
    vainqueursPotentiels: Joueur[]
  ): void {
    joueursEnLice.forEach((joueur) => {
      if (joueur.point === plusGrandScore) {
        vainqueursPotentiels.push(joueur);
      }
    });
  }

  private determinerVainqueurPartie(joueurs: Joueur[]): void {
    let plusGrandNombrePoints: number =
      this.derterminerPlusGrandNombrePoints(joueurs);

    console.log(plusGrandNombrePoints);

    //On trouve tous les joueurs avec le plus de manches gagnée
    let nomines: Joueur[] = [];
    this.reunirJoueursPoints(joueurs, plusGrandNombrePoints, nomines);

    console.log(nomines);

    if (nomines.length > 1) {
      console.log(
        `Plusieurs joueurs sont a égalité en nombre de manches gagnées (${plusGrandNombrePoints})`
      );

      nomines.forEach((joueur) => {
        console.log(`${joueur.nom} rejoue.`);
        joueur.jouer(this._gobelet);
      });
      this.determinerVainqueurManche(nomines);
      this.determinerVainqueurPartie(nomines);
    } else if (nomines.length > 0) {
      this.afficherGagnant(nomines[0]);
    } else {
      throw new Error(`Il n'y a pas de joueur dans la liste des gagnants`);
    }
  }

  private derterminerPlusGrandNombrePoints(joueurs: Joueur[]): number {
    let plusGrandNombrePoints: number = joueurs[0].point;

    joueurs.forEach((joueur) => {
      if (joueur.point > plusGrandNombrePoints) {
        plusGrandNombrePoints = joueur.point;
      }
    });

    return plusGrandNombrePoints;
  }

  private afficherGagnant(gagnant: Joueur): void {
    console.log(
      `Nous avons un Gagnant. ${gagnant.nom} remporte la partie en remportant ${gagnant.point} manches.`
    );
  }

  private afficherScoresFinaux(): void {
    this._listeJoueurs.forEach((joueur) => {
      console.log(`Score de ${joueur.nom} : ${joueur.point}`);
    });
  }
}
