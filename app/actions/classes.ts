"use server"
import excuteQuery from '@/database/db'

export const getClasses = async () => {
  const classes = await excuteQuery({
    query: "SELECT * FROM classe WHERE cla_niveau = 1",
    values: null,
  }) 
  return JSON.stringify(classes)
}