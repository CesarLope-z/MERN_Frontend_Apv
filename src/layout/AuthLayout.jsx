import { Outlet } from "react-router-dom"
const AuthLayout = () => {
  return (
    <>
        <h1>Auth layout</h1>
        <main className="container mt-14 mx-auto md:grid md:grid-cols-2 gap-12 p-5">
          <Outlet />
        </main>
        
    </>
  )
}

export default AuthLayout