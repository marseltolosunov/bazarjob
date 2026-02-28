import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthModal from './AuthModal'

export default function Navbar() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalTab, setModalTab] = useState('login')
  const navigate = useNavigate()

  const openLogin = () => { setModalTab('login'); setModalOpen(true) }
  const openReg = () => { setModalTab('reg'); setModalOpen(true) }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-16 py-4 bg-[#f4f3ff]/85 backdrop-blur-md border-b border-[#e2deff]">
        <div
          onClick={() => navigate('/')}
          className="font-syne text-2xl font-extrabold text-primary cursor-pointer"
        >
          Bazar<span className="text-accent">Job</span>
        </div>

<ul className="hidden md:flex gap-8 list-none">
  <li><a href="/#categories" className="text-[#6b64a0] font-medium hover:text-primary transition-colors">Категории</a></li>
  <li><a href="/#how" className="text-[#6b64a0] font-medium hover:text-primary transition-colors">Как работает</a></li>
  <li><span onClick={() => navigate('/about')} className="text-[#6b64a0] font-medium hover:text-primary transition-colors cursor-pointer">О нас</span></li>
  <li><span onClick={() => navigate('/become-pro')} className="text-[#6b64a0] font-medium hover:text-primary transition-colors cursor-pointer">Стать мастером</span></li>
</ul>

        <div className="flex gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-5 py-2 bg-accent text-white rounded-full font-semibold text-sm hover:opacity-90 transition-all"
          >
            Кабинет
          </button>
          <button
            onClick={openLogin}
            className="px-5 py-2 border-2 border-primary text-primary rounded-full font-semibold text-sm hover:bg-primary hover:text-white transition-all"
          >
            Войти
          </button>
          <button
            onClick={openReg}
            className="px-5 py-2 bg-primary text-white rounded-full font-semibold text-sm hover:bg-primary-light transition-all hover:shadow-lg hover:shadow-primary/30"
          >
            Регистрация
          </button>
        </div>
      </nav>

      <AuthModal isOpen={modalOpen} onClose={() => setModalOpen(false)} initialTab={modalTab} />
    </>
  )
}