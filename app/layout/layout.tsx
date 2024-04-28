import { Link } from '@remix-run/react'
import { PropsWithChildren } from 'react'
import Logo from '~/assets/toronto-logo.svg'

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-toronto py-6 text-white shadow-lg">
        <div className="container">
          <Link to="/" className="flex items-end gap-4">
            <img className="h-12" src={Logo} alt="Toronto logo" />
            <h1 className="text-xl font-semibold">Dangerous Dogs</h1>
          </Link>
        </div>
      </header>
      <div className="container flex h-full grow flex-col py-8">{children}</div>
      <footer className="flex items-center bg-toronto p-2 text-xs text-white">
        <div className="container flex items-center justify-between">
          <p>© {new Date().getFullYear()} Toronto Dangerous Dogs</p>
          <p>
            by{' '}
            <a
              className="font-white hover:underline"
              href="https://github.com/andrewthamcc"
              rel="noopener noreferrer"
              target="_blank"
            >
              Andrew Tham
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
