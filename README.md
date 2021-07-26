# Créez un réseau social d’entreprise

## Groupomania
![](frontend_js/public/img/icon-above-font_alpha.png)

***

### 🛠️ &nbsp; Installation
* Cloner le repository suivant [GitHub](https://github.com/ben3211/BenoitSaby_7_15062021.git)

#### &nbsp; 🖥️ Frontend
* Rendez-vous sur `http://localhost:5500/frontend_js` pour tester l'application.

#### &nbsp; 🔨 backend
* Ouvrez votre terminal
* Allez dans le dossier backend : `cd backend`
* Exécuter `npm install`
* Lancez le serveur avec `nodemon server`.

#### &nbsp; 📚 Base de données MySQL
* Ouvrez votre terminal
* Connectez-vous à MySQL : `mysql -h localhost -u root -p`
* Créez la base de données : `CREATE DATABASE groupomania_db CHARACTER SET 'utf8';`
* Utilisez la base de données : `USE groupomania_db;`
* Importez la base de données présente en inscrivant le chemin jusqu'au fichier : `SOURCE groupomania_db.sql;`
* Retrouver le fichier nommé `.env_exemple` dans la partie backend, renseigner votre identifiant, votre mot de passe, entrez également une clé secrète qui sera utilisée pour encoder et décoder les tokens d'authenfications, enfin entrez une durée en heure avant l'expiration des tokens d'authentifications.  (sans espace aprés le '='). Puis supprimer la partie `_exemple` afin d'obtenir un fichier nommé `.env`

_Ce projet est en construction, la pertie frontend_vuejs prépare la migration avec le framework vue.js_