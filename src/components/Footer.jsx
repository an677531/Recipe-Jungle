import '../styles/Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <p className="footer__text">Recipe Jungle &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
