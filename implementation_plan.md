# Algorithme de Recommandation de Formules — Rapport Admin

## Contexte

Le projet DM+ AssurConseil est une application Next.js d'assurance auto au Sénégal. Actuellement, lors de la génération d'un rapport dans la partie conseiller, l'éditeur (`RapportEditor`) est un simple champ texte libre avec une notice disant « La génération automatique par IA sera disponible prochainement ».

L'objectif est de créer un **moteur de recommandation déterministe** basé sur les réponses du formulaire client, qui génère automatiquement :
1. Un **conseil personnalisé** structuré (diagnostic + points forts/faibles du contrat actuel)
2. Une **recommandation de formule** parmi `Essentielle / Confort / Sécurité / Premium`
3. Un **pré-remplissage du rapport** texte avec les arguments correspondants

## Architecture proposée

```mermaid
graph LR
  A[FormData du Lead] --> B[Moteur de Recommandation\nsrc/lib/recommendation.ts]
  B --> C[RecommandationResult\n{ formule, score, conseils, alertes }]
  C --> D[RapportEditor\n+ bouton «Générer le rapport»]
  C --> E[LeadDetailView\n+ panneau «Profil & Recommandation»]
```

---

## Moteur de Recommandation (`src/lib/recommendation.ts`)

Le moteur analyse 5 dimensions extraites des réponses au formulaire :

| Dimension | Champs sources | Logique |
|---|---|---|
| **Profil de risque** | `usage`, `sinistreRecent`, `sinistreMalGere` | Professionnel → risque élevé |
| **Valeur du bien** | `valeurEstimee`, `typeVehicule`, `anneeMiseEnCirculation` | > 8M FCFA → Sécurité+ |
| **Insatisfaction actuelle** | `niveauSatisfaction`, `satisfactionAssurance` | Insatisfait → migration opportune |
| **Besoins exprimés** | `elementsImportants`, `objectifPrincipal`, `choixPrixProtection` | Map sur garanties |
| **Niveau souhaité** | `niveauProtection`, `choixPrixProtection` | Budget serré → Essentielle |

### Mapping formules

| Formule | Critères typiques |
|---|---|
| **Essentielle** | Budget prioritaire, pas de sinistre, usage personnel, véhicule ancien |
| **Confort** | Équilibre prix/protection, usage mixte, satisfait modérément |
| **Sécurité** | Véhicule récent/valeur élevée, usage professionnel, veux couvrir Vol+Incendie |
| **Premium** | Protection maximale, usage intensif, sinistres passés, valeur haute |

### Output `RecommandationResult`

```ts
type RecommandationResult = {
  formuleRecommandee: "Essentielle" | "Confort" | "Sécurité" | "Premium";
  scoreRecommandation: number; // 0-100, confiance
  raisonPrincipale: string;
  alertes: string[];          // Points de vigilance
  points_forts: string[];     // Ce que couvre déjà bien le client
  points_faibles: string[];   // Lacunes identifiées
  garentiesRecommandees: string[];
  rapportTexte: string;       // Rapport pré-généré structuré
}
```

---

## Proposed Changes

### Nouveau module

#### [NEW] [`recommendation.ts`](file:///c:/Users/hp/Desktop/Dev/dm-assurconseil/src/lib/recommendation.ts)
Moteur de recommandation pur (sans dépendances externes). Analyse les données du lead et retourne `RecommandationResult`.

---

### Composant conseiller

#### [MODIFY] [`RapportEditor.tsx`](file:///c:/Users/hp/Desktop/Dev/dm-assurconseil/src/components/conseiller/RapportEditor.tsx)

Ajout d'un **panneau latéral d'analyse** (colonne gauche, sous les formules) avec :
- **Badge de formule recommandée** (avec score de confiance)
- **Liste des alertes** (points de vigilance)
- **Bouton "Générer le rapport"** qui pré-remplit la textarea avec le `rapportTexte` généré

Remplace la notice « IA disponible prochainement » par le panneau de recommandation.

#### [NEW] [`RecommandationPanel.tsx`](file:///c:/Users/hp/Desktop/Dev/dm-assurconseil/src/components/conseiller/RecommandationPanel.tsx)
Composant UI réutilisable qui affiche le résultat de la recommandation (badge formule, alertes, points forts/faibles, garanties).

---

### Intégration dans la fiche prospect

#### [MODIFY] [`LeadDetailView.tsx`](file:///c:/Users/hp/Desktop/Dev/dm-assurconseil/src/components/conseiller/LeadDetailView.tsx)
Ajout d'un **bloc "Analyse & Recommandation"** visible avant la création de simulation, montrant :
- La formule recommandée par l'algorithme
- Les alertes clés
- Les garanties à proposer

---

## Vérification

### Tests manuels
1. Créer un lead avec `usage=professionnel`, `valeurEstimee=15000000`, `satisfactionAssurance=insatisfait` → doit recommander **Premium**
2. Lead avec `usage=personnel`, `choixPrixProtection=budget`, pas de sinistre → doit recommander **Essentielle**
3. Depuis la page simulation (`/conseiller/simulations/[id]`), cliquer "Générer le rapport" → textarea pré-remplie

---

## Questions ouvertes

> [!IMPORTANT]
> **Q1 — Formules fixes ou configurables ?**  
> Doit-on garder les 4 formules fixes (Essentielle, Confort, Sécurité, Premium) ou vouloir une configuration paramétrable dans l'admin ?

> [!IMPORTANT]
> **Q2 — Visibilité de la recommandation côté client ?**  
> La recommandation doit-elle rester exclusivement visible en espace conseiller, ou faut-il l'afficher aussi au client sur la page de confirmation ?

> [!NOTE]
> **Q3 — Poids des critères**  
> Souhaitez-vous valider les pondérations proposées (valeur véhicule, usage pro, satisfaction) avant implémentation, ou préférez-vous itérer après ?
