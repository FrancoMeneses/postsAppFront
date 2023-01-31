import '../styles/notFound.css'

export function NotFound() {
  return (
    <main>
      <section>
        <div className='div-svg'>
          <img src='src/assets/404Error.svg' />
          <a href="https://storyset.com/web">Web illustrations by Storyset</a>
        </div>
        <p>Page Not Found</p>
      </section>
    </main>
  )
}