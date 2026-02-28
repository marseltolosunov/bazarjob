import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import AuthModal from './AuthModal'

export default function Navbar() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalTab, setModalTab] = useState('login')
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const openLogin = () => { setModalTab('login'); setModalOpen(true); setMenuOpen(false) }
  const openReg = () => { setModalTab('reg'); setModalOpen(true); setMenuOpen(false) }

  const goTo = (path) => { navigate(path); setMenuOpen(false) }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f4f3ff]/90 backdrop-blur-md border-b border-[#e2deff]">
        <div className="flex items-center justify-between px-6 md:px-16 py-4">

          {/* LOGO */}
          <div onClick={() => goTo('/')} className="font-syne text-2xl font-extrabold text-primary cursor-pointer">
            Bazar<span className="text-accent">Job</span>
          </div>

          {/* DESKTOP MENU */}
          <ul className="hidden lg:flex gap-8 list-none">
            <li><span onClick={() => goTo('/')} className="text-[#6b64a0] font-medium hover:text-primary transition-colors cursor-pointer">Главная</span></li>
            <li><span onClick={() => goTo('/search')} className="text-[#6b64a0] font-medium hover:text-primary transition-colors cursor-pointer">Специалисты</span></li>
            <li><span onClick={() => goTo('/about')} className="text-[#6b64a0] font-medium hover:text-primary transition-colors cursor-pointer">О нас</span></li>
            <li><span onClick={() => goTo('/become-pro')} className="text-[#6b64a0] font-medium hover:text-primary transition-colors cursor-pointer">Стать мастером</span></li>
          </ul>

          {/* DESKTOP BUTTONS */}
          <div className="hidden lg:flex gap-3">
            <button onClick={() => goTo('/dashboard')} className="px-5 py-2 bg-accent text-white rounded-full font-semibold text-sm hover:opacity-90 transition-all">
              Кабинет
            </button>
            <button onClick={openLogin} className="px-5 py-2 border-2 border-primary text-primary rounded-full font-semibold text-sm hover:bg-primary hover:text-white transition-all">
              Войти
            </button>
            <button onClick={openReg} className="px-5 py-2 bg-primary text-white rounded-full font-semibold text-sm hover:bg-primary-light transition-all">
              Регистрация
            </button>
          </div>

          {/* BURGER */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl border-2 border-[#e2deff] text-primary hover:bg-primary hover:text-white transition-all">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-[#e2deff] px-6 py-4 flex flex-col gap-2 shadow-xl">
            {[
              { label: 'Главная', path: '/' },
              { label: 'Специалисты', path: '/search' },
              { label: 'О нас', path: '/about' },
              { label: 'Стать мастером', path: '/become-pro' },
              { label: 'Кабинет', path: '/dashboard' },
            ].map(item => (
              <button
                key={item.path}
                onClick={() => goTo(item.path)}
                className="text-left px-4 py-3 rounded-xl text-[#6b64a0] font-medium hover:bg-[#f4f3ff] hover:text-primary transition-all"
              >
                {item.label}
              </button>
            ))}
            <div className="flex gap-3 mt-2 pt-3 border-t border-[#e2deff]">
              <button onClick={openLogin} className="flex-1 py-3 border-2 border-primary text-primary rounded-xl font-semibold text-sm hover:bg-primary hover:text-white transition-all">
                Войти
              </button>
              <button onClick={openReg} className="flex-1 py-3 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary-light transition-all">
                Регистрация
              </button>
            </div>
          </div>
        )}
      </nav>

      <AuthModal isOpen={modalOpen} onClose={() => setModalOpen(false)} initialTab={modalTab} />
    </>
  )
}