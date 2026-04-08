# Test technique — Gestion de demandes

## Objectif
Mini-application de gestion de demandes avec traçabilité des actions.

## Stack
- PostgreSQL
- NestJS
- TypeORM
- Angular

## Travail réalisé
- Dashboard avec liste des demandes
- Filtres par statut
- Gestion des demandes (CRUD)
- Changement de statut par 'select' : Brouillon → Soumise → Validée
- Suppression logique (soft delete)
- Audit trail : chaque action génère un log stocké en base de données (côté backend)
- Consultation de l’historique sous chaque demande (expand)

## Données enregistrées dans l’historique
- Date
- Type d’action
- Id de la demande
- Utilisateur
- Anciennes valeurs
- Nouvelles valeurs

## Choix et limites de cette version
- La gestion des exceptions, pagination ainsi que le styling des pages ont été volontairement gardés simples dans cette version, afin de prioriser les fonctionnalités principales demandées.
- L’identification de l’utilisateur dans l’historique est actuellement simplifiée via un utilisateur fixe côté backend.

## Lancement du projet

### BackEnd
cd demandes_backend // npm install // npm run start:dev

### FrontEnd
cd demandes_frontend // npm install // npm start

## Démo vidéo
Lien : https://drive.google.com/file/d/1VY_hkNrG8TBUkoAf6USqdYHG0yFeRdKg/view