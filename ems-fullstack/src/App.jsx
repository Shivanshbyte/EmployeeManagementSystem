import './App.css'
import Header from './component/Header'
import ListEmployeeComponent from './component/ListEmployeeComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EmployeeComponent from './component/EmployeeComponent'
import ProtectedRoute from './component/ProtectedRoute'
import LoginComponent from './component/LoginComponent'
import RegisterComponent from './component/RegisterComponent'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route
              path="/"
              element={
                  <ProtectedRoute>
                      <ListEmployeeComponent />
                  </ProtectedRoute>
              }
          />
          <Route path='/emplist' element={<ListEmployeeComponent />}></Route>
          <Route path='/add-employee' element={<EmployeeComponent />}></Route>
          <Route path='/update-employee/:id' element={<EmployeeComponent />}></Route>
          <Route
              path="/login"
              element={<LoginComponent />}
          />

          <Route
              path="/register"
              element={<RegisterComponent />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
