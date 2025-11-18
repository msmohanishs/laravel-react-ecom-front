import Nav  from './Nav'
import { AppRoutes } from '../routes/AppRoutes'

export const Header = () => {
  return (
    <div>
        {/* Navigation */}
        <Nav />

        {/* Routes */}
        <AppRoutes />
    </div>
  )
}
