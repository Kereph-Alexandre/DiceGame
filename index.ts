import Gobelet from "./Classes/Gobelet";
import Joueur from "./Classes/Joueur";
import Partie from "./Classes/Partie";

//Création d'un gobelet
const gobelet: Gobelet = new Gobelet();
//Création d'une partie
const partie: Partie = new Partie(gobelet);

const joueur1: Joueur = new Joueur("Patricia");
const joueur2: Joueur = new Joueur("Corrine");
// const joueur3: Joueur = new Joueur("Léa");
// const joueur4: Joueur = new Joueur("Jeaninne");
// const joueur5: Joueur = new Joueur("Chloé");

let joueurs: Joueur[] = [joueur1, joueur2];

partie.initialiserPartie(joueurs, 5);
console.log(partie);
console.log(gobelet);

partie.lancerPartie();
