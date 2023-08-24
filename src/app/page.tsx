'use client'

import useAuth from '@/hooks/auth'
import DashboardPage from './dashboard/page';
import Login from './login/page';

export default function Home() {
  const { user } = useAuth();
  if (user === undefined) {
    return; 
  }
  if (user == null) {
    return <Login></Login>
  }
  return <DashboardPage></DashboardPage>
}
