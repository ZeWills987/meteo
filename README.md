# Météo Mokaia

![Météo Mokaia](https://img.shields.io/badge/status-Beta-yellow)  
Application web simple qui permet de consulter les prévisions météorologiques d’une ville, en utilisant l’API [Météo‑Concept](https://api.meteo-concept.com/).

---

## 📌 Description

Météo Mokaia est une application web PHP qui interroge l’API Meteo Concept pour récupérer les données météorologiques d’une ville.  
Elle affiche la température actuelle, les prévisions journalières, ainsi que d’autres informations météorologiques (pluie, vent, etc.).

Un **système de cache** est implémenté en base de données afin de limiter les appels à l’API tout en restant à jour.

---

## 🧰 Technologies utilisées

### Front‑end
- **HTML5** – Structure de la page  
- **CSS3** – Mise en forme et UI  
- **JavaScript** – Affichage dynamique des données météo

### Back‑end
- **PHP 8.x** – Logique côté serveur et API  
- **PDO / MySQL** – Gestion de la base de données et du cache

### Outils / Autres
- **Composer / Dotenv** – Gestion des dépendances et variables d’environnement  
- **MySQL** – Base de données locale pour le cache des données météo  
- **API Meteo Concept** – Source des données météorologiques

---

## 📁 Structure du projet
````
meteo/
├── data/
│ ├── api/ # Scripts PHP d'API pour récupérer les données météo
│ ├── css/ # Feuilles de style CSS
│ ├── img/ # Images utilisées par l'interface
│ └── js/ # Scripts JavaScript pour l'affichage dynamique
├── db_script.sql # Script SQL pour créer la base de données de cache
├── .env.example # Exemple de fichier de configuration
├── index.html # Page principale de l'application
└── README.md # Ce fichier
````

---

## 🧩 Fonctionnalités

- **Recherche de ville** :  
  Saisissez le nom d’une ville dans la barre de recherche et affichez les données météorologiques associées.

- **Affichage des informations** :  
  - Température actuelle, minimale et maximale  
  - Conditions météo (ciel, pluie, vent, etc.)  
  - Prévisions journalières sur plusieurs jours

- **Cache intelligent** :  
  - Les données météo sont stockées en base de données par ville et par horodatage.  
  - Si la dernière mise à jour est trop ancienne (par exemple > 24h), les données sont **récupérées à nouveau via l’API et écrasées** dans la base.  
  - Sinon, les données existantes sont renvoyées pour éviter de surcharger l’API et d’alourdir la base.

---

## ⚙️ Installation

1. **Cloner le dépôt**

```bash
git clone https://github.com/ZeWills987/meteo.git
cd meteo
```

2. **Configurer l’API Meteo Concept**
- Créez un compte gratuit sur Meteo Concept.
- Accédez à la section de gestion de votre token API et récupérez votre clé.
- Créer le fichier .env


3. **Créer le fichier .env**

Copiez le fichier modèle :
```bash
cp .env.example .env
```

Puis renseignez vos identifiants dans .env :

```
METEO_CONCEPT_API_KEY=votre_token_api
DB_HOST=localhost
DB_NAME=meteo
DB_USER=root
DB_PASS=secret
```

⚠️ Ne commettez jamais vos identifiants réels dans le dépôt (ajoutez .env à .gitignore).

4. **Créer la base de données**

Importez le fichier db_script.sql :

```bash
mysql -u root -p meteo < db_script.sql
```

Assurez‑vous que la table meteo_cache est bien créée :

```sql
CREATE TABLE meteo_cache (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ville VARCHAR(100) NOT NULL,
    insee VARCHAR(20) NOT NULL UNIQUE,
    data_forecast LONGTEXT NOT NULL,
    last_updated DATETIME NOT NULL
);
```

5. **Lancer le serveur de développement**
Depuis la racine du projet, démarrez un serveur PHP simple :

```bash
php -S 127.0.0.1:8000
```

Ouvrez ensuite http://127.0.0.1:8000 dans votre navigateur.

##💡 Comment fonctionne le cache ?

Pour éviter d'utiliser inutilement l’API Meteo Concept, une base de données est utilisée :

- Chaque ville est stockée avec son code INSEE et les données de prévision au format JSON.

- Un champ last_updated contient la date et l’heure de la dernière mise à jour.

À chaque requête :

1. On regarde s’il existe une entrée pour la ville demandée.

2. Si l’entrée existe et que la dernière mise à jour est récente, on sert directement le cache.

3. Si la donnée est trop ancienne ou inexistante, on appellera l’API, puis on écrase l’entrée en base avec les nouvelles données.

Ce système permet :

- De limiter les appels à l’API.

- D’avoir des données toujours à jour sans surcharger la base.

## 🧑‍💻 Auteur

    Tchang William

    [🌐Portfolio](portfolio.william-tchang.fr)

    [📧william.tchang.pro@gmail.com](mail:william.tchang.pro@gmail.com)

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.

© 2023 par Tchang William. Tous droits réservés.

## 🙌 Contributeurs

Les contributions sont les bienvenues !
N’hésitez pas à ouvrir une Issue ou une Pull Request pour :

- Corriger des bugs

- Proposer de nouvelles fonctionnalités

- Améliorer la documentation ou les performances



