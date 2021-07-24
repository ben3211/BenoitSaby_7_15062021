# Créez un réseau social d’entreprise

## Groupomania
![](frontend_js/public/img/icon-above-font_alpha.png)

***

### 🛠️ &nbsp; Installation
* Cloner le repository suivant [GitHub](https://github.com/ben3211/BenoitSaby_7_15062021.git)

#### &nbsp; 🖥️ Frontend
* Rendez-vous sur `http://localhost:3000` pour tester l'application.

#### &nbsp; 🔨 backend
* Ouvrez votre terminal
* Allez dans le dossier backend : `cd backend`
* Exécuter `npm install`
* Lancez le serveur avec `nodemon server`.

#### &nbsp; 📚 Base de données MySQL
* Ouvrez votre terminal
* Connectez-vous à MySQL : `mysql -h localhost -u root -p`
* Créez la base de données : `CREATE DATABASE groupomania CHARACTER SET 'utf8';`
* Utilisez la base de données : `USE groupomania;`
* Importez la base de données présente : `SOURCE groupomania.sql;`
* Retrouver le fichier nommé `.env_example` dans la partie backend, renseigner votre identifiant et votre mot de passe (sans espace aprés le '='). Puis supprimer la partie `_exemple` afin d'obtenir un fichier nommé `.env`

_Ce projet est en construction, la pertie frontend_vuejs prépare la migration avec le framework vue.js_