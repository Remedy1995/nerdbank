"use client"
import AuthLogin from './auth-login/page';
import AuthGuard from './protectedAuthRoutes';
export default function Page () {
  return (
      <AuthGuard>
    <AuthLogin/>
    </AuthGuard>
  )
}