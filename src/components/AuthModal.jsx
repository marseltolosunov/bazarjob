import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

export default function AuthModal({ isOpen, onClose, initialTab }) {
  const [tab, setTab] = useState(initialTab || 'login')
  const [role, setRole] = useState('client')

  useEffect(() => { setTab(initialTab || 'login') }, [initialTab])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0f0a2e]/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-3xl p-10 w-full max-w-md relative shadow-2xl shadow-primary/25 animate-[slideUp_.3s_ease]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-surface text-[#6b64a0] hover:bg-[#e2deff] transition-all"
        >
          <X size={16} />
        </button>

        <h3 className="font-syne text-2xl font-extrabold mb-1">Добро пожаловать</h3>
        <p className="text-[#6b64a0] text-sm mb-6">Войдите или создайте аккаунт</p>

        {/* Tabs */}
        <div className="flex bg-surface rounded-xl p-1 mb-6">
          {['login', 'reg'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${tab === t ? 'bg-white text-primary shadow-sm' : 'text-[#6b64a0]'}`}
            >
              {t === 'login' ? 'Войти' : 'Регистрация'}
            </button>
          ))}
        </div>

        {tab === 'login' ? (
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5">Телефон или Email</label>
              <input type="text" placeholder="+996 xxx xxx xxx" className="w-full px-4 py-3 border-2 border-[#e2deff] rounded-xl text-sm outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5">Пароль</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-3 border-2 border-[#e2deff] rounded-xl text-sm outline-none focus:border-primary transition-colors" />
            </div>
            <button className="w-full py-3.5 bg-primary text-white rounded-xl font-syne font-bold hover:bg-primary-light transition-all">Войти</button>
            <div className="text-center text-xs text-[#6b64a0] relative py-1">
              <span className="bg-white px-3 relative z-10">или</span>
              <div className="absolute top-1/2 left-0 right-0 h-px bg-[#e2deff]"></div>
            </div>
            <button className="w-full py-3.5 bg-surface border-2 border-[#e2deff] text-[#0f0a2e] rounded-xl font-semibold text-sm hover:border-primary transition-all">Войти через Google</button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex bg-surface rounded-xl p-1">
              {[{key:'client',label:'Я ищу мастера'},{key:'pro',label:'Я специалист'}].map(r => (
                <button
                  key={r.key}
                  onClick={() => setRole(r.key)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${role === r.key ? 'bg-white text-primary shadow-sm' : 'text-[#6b64a0]'}`}
                >
                  {r.label}
                </button>
              ))}
            </div>
            {['Имя', 'Телефон', 'Email', 'Пароль'].map((field) => (
              <div key={field}>
                <label className="block text-xs font-semibold mb-1.5">{field}</label>
                <input
                  type={field === 'Пароль' ? 'password' : field === 'Email' ? 'email' : 'text'}
                  placeholder={field === 'Телефон' ? '+996 xxx xxx xxx' : field === 'Пароль' ? 'Минимум 8 символов' : ''}
                  className="w-full px-4 py-3 border-2 border-[#e2deff] rounded-xl text-sm outline-none focus:border-primary transition-colors"
                />
              </div>
            ))}
            <button className="w-full py-3.5 bg-primary text-white rounded-xl font-syne font-bold hover:bg-primary-light transition-all">Создать аккаунт</button>
          </div>
        )}
      </div>
    </div>
  )
}