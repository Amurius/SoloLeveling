"use server"
import excuteQuery from '@/database/db'

export const getMonstres = async () => {
  const result = await excuteQuery({
    query: 'SELECT * FROM monstre inner join statistiques on mon_sta_id = sta_id order by mon_rang',
    values: null,
  });
  var monstres = JSON.stringify(result)
  return monstres
}

export const updateMonster = async ({ form }: { form: any }) => {
  console.log(form);

  const updateMonste = await excuteQuery({
    query: 'UPDATE monstre SET mon_nom =?, mon_rang = ?, mon_description = ? ;',
    values: [form.nom, form.rang, form.desc],
  }); 
  const updateStat = await excuteQuery({
    query: 'UPDATE statistiques SET sta_atk_dmg =?, sta_chance = ?, sta_hp = ?, sta_mana= ?, sta_atk_speed=? WHERE sta_id = ? ;',
    values: [form.dmg, form.chance, form.hp, form.mana, form.atkspeed, form.staID],
  }); 
  return {success:true}
}

export const addMonstre = async ({form}:{form:any}) => {

}