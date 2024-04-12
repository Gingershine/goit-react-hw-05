import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <div>
      <h2>404 - Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <p>
        <Link to="/">Homepage</Link>
      </p></div>
  )
}

export default NotFoundPage