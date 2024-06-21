
export default function getNiveau ({xpPerso}:{xpPerso:number}) { 
  var xpNiv = 50;
  var nivPerso = 0;
  while (xpPerso >= 0) {
    if (nivPerso > 10){
      xpNiv = xpNiv*1.1;
    } else if (nivPerso > 25){
      xpNiv = xpNiv*1.1;
    } else if (nivPerso >= 50) {
      xpNiv = xpNiv*1.15;
    } else if (nivPerso >= 100) {
      xpNiv = xpNiv*1.2;
    } else if (nivPerso >= 500) {
      xpNiv = xpNiv*1.5;
    } else {
      xpNiv = xpNiv*2;
    }
    xpPerso = xpPerso - xpNiv;
    nivPerso++;
  }
  var xpRestant = xpPerso + xpNiv;  
  console.log(xpRestant,xpNiv);
  return ({"niveau":nivPerso, "xpRestant":xpRestant, "xpNivSuivant": xpNiv})
}