"use server"
import excuteQuery from '@/database/db'

export const createPerso = async ({nom,classeID,userID}:{nom:string,classeID:string,userID:string}) => {
  var date = new Date();
  if (nom === "" || classeID === "") {
    return {error: true}
  } else {
    const createStats = await excuteQuery({
      query: "INSERT INTO statistiques (sta_atk_dmg,sta_chance,sta_hp,sta_mana,sta_atk_speed) VALUES (20,0,200,100,2)",
      values: null,
    })
    const statID = await excuteQuery({query: "SELECT sta_id from statistiques order by sta_id desc LIMIT 1", values: null})
    const createPerso = await excuteQuery({
      query: "INSERT INTO personnage (per_nom,per_date_create,per_deleted,per_xp,per_points_attribues,per_sta_id,per_us_id) VALUES (?,?,0,0,0,?,?)",
      values: [nom,date,statID[0].sta_id,userID],
    })
    const persoID = await excuteQuery({query: "SELECT per_id from personnage order by per_id desc LIMIT 1", values: null})
    const competencesClasse = await excuteQuery({query: "SELECT * FROM competences WHERE com_cla_id= ?", values: [classeID]})
    for( var i=0 ; i<competencesClasse.length; i++){
      const lienTables = await excuteQuery({query: "INSERT INTO informations (info_per_id,info_cla_id,info_com_id,info_niv_competence) VALUES (?,?,?,0)", values: [persoID,classeID,competencesClasse[i].com_id]})
    }
    return {error: false}
  }
}

export const getPersosUser = async ({userID}:{userID:number}) => {
  const getPersos = await excuteQuery({
    query: "SELECT personnage.*, cla_nom, cla_niveau from informations inner join personnage on info_per_id = per_id inner join classe on info_cla_id = cla_id where per_us_id = ?;", 
    values: [userID],
  })
  return JSON.stringify(getPersos)
}

export const get1Perso = async ({persoID}:{persoID:string|null}) => {
  const getPerso = await excuteQuery({
    query: "SELECT personnage.*, cla_nom, cla_niveau, statistiques.*, competences.com_nom, competences.com_dmg, competences.com_cout from informations inner join personnage on info_per_id = per_id inner join classe on info_cla_id = cla_id inner join statistiques on per_sta_id = sta_id INNER JOIN competences on info_com_id = com_id where per_id = ?;",
    values:[persoID]
  })
  return JSON.stringify(getPerso)
}

export const deletePerso = async ({persoID}:{persoID:string|null}) =>{
  const selectInfos = await excuteQuery({
    query: "SELECT per_sta_id,informations.* FROM personnage inner join informations on per_id = info_per_id where per_id = ?",
    values: [persoID]
  })
  console.log(selectInfos);
  
  const deleteStat = await excuteQuery({
    query: "",
    values: []
  })
}