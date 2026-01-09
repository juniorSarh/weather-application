
import './errorhandling.modules.css'
import { Link } from 'react-router-dom'
export default function ErrorHandling() {
  return (
    <div className="errorHandling">
      <h1>404</h1>
      <p>Page not found</p>
      <Link to='/'>Go back to home</Link>
      
    </div>
  )
}
