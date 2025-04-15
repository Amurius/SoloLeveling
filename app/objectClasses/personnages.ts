class Personnage {
  private id: number;
  private nom: string;
  private xp: number;
  private pointsAttribues: number;
  private userId: number;
  private classe: string;
  private nivClasse: number;
  private statId: number;
  private deleted: boolean;
  private competences: Array<Competence>;
  constructor(
    id: number,
    nom: string,
    xp: number,
    points: number,
    userId: number,
    classe: string,
    nivClasse: number,
    statId: number,
    competences: Array<Competence>,
    deleted: boolean
  ) {
    this.id = id;
    this.nom = nom;
    this.xp = xp;
    this.pointsAttribues = points;
    this.userId = userId;
    this.classe = classe;
    this.nivClasse = nivClasse;
    this.statId = statId;
    this.competences = competences;
    this.deleted = deleted;
  }
}
