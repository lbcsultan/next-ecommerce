import Layout from '../components/Layout'

import { useSession, signOut } from 'next-auth/react'

export default function DashboardScreen() {
  const { status, data: session } = useSession()

  return (
    <Layout title="Dashboard">
      <div className="mx-auto max-w-screen-lg">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <br />
        <p>Username: {session?.user.name}</p>
        <p>Email: {session?.user.email}</p>
      </div>
    </Layout>
  )
}
