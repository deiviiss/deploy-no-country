import { redirect } from 'next/navigation'
import style from './dashboard.module.css'
import { getUserSessionServer } from '@/auth'
import { PropertiesGrid } from '@/components'
import prisma from '@/libs/prisma'
import { ButtonAddProperty } from '@/properties'

const DashboardPage = async () => {
  const user = await getUserSessionServer()
  const isAdmin = user?.roles?.includes('admin')

  if (!isAdmin) redirect('/')

  const properties = await prisma.property.findMany()

  return (
    <div className={style.page}>
      <h1 className={style.title}>Panel de administrador</h1>
      <p className={style.subtitle}>Bienvenido al panel de administrador. A continuación tienes tus propiedades publicadas:</p>

      <ButtonAddProperty />

      {properties.length > 0
        ? (<PropertiesGrid properties={properties} />)
        : (<h2>Próximamente</h2>)}
    </div>
  )
}

export default DashboardPage
