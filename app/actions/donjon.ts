"use server"
import excuteQuery from '@/database/db'

export const getSalle = async ({gateID,perso}:{gateID:string|null,perso:any}) => {
  var levels = perso[0].per_points_attribues/3/15 -1
  if (levels > 8){
    var levelMin = 6
  } else {
    var levelMin = levels - 2
  }
  const getMonstres = await excuteQuery({
    query: "SELECT * FROM monstre inner join statistiques on mon_sta_id = sta_id where mon_rang BETWEEN ? AND ? order by sta_hp",
    values: [levelMin,levels],
  })
  console.log(getMonstres);
  
}