import { PropsWithChildren } from 'react'

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-toronto py-4 text-white shadow-lg">
        <div className="container flex items-center justify-between">
          <h1>Toronto Dangerous Dogs</h1>
        </div>
      </header>
      <div className="container flex h-full grow flex-col py-8">
        <h2>Tabs tabs tabs</h2>
        {children}
      </div>
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
