import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { categories, pros, popularTags } from '../data/mock'
import { MapPin, Search } from 'lucide-react'
import AuthModal from '../components/AuthModal'

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 md:px-6 pt-24 pb-16 relative overflow-hidden">
        <div className="absolute w-72 md:w-[600px] h-72 md:h-[600px] rounded-full bg-primary opacity-10 blur-[80px] -top-24 -left-36 pointer-events-none" />
        <div className="absolute w-48 md:w-[400px] h-48 md:h-[400px] rounded-full bg-accent opacity-10 blur-[80px] -bottom-10 -right-24 pointer-events-none" />

        <div className="inline-flex items-center gap-2 bg-primary/8 border border-primary/20 text-primary px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-wide">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          Более 12 000 специалистов онлайн
        </div>

        <h1 className="font-syne text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight tracking-tighter max-w-3xl mb-5">
          Найди <span className="text-primary relative inline-block">
            лучшего
            <span className="absolute -bottom-1 left-0 right-0 h-1 bg-accent rounded-full" />
          </span>
          <br />специалиста рядом
        </h1>

        <p className="text-[#6b64a0] text-base md:text-lg max-w-xl mb-8 leading-relaxed px-4">
          BazarJob соединяет вас с проверенными мастерами: сантехники, электрики, репетиторы, дизайнеры — всё в одном месте.
        </p>

        {/* SEARCH */}
        <div className="flex flex-col sm:flex-row items-center bg-white rounded-2xl shadow-xl shadow-primary/15 p-2 gap-2 w-full max-w-xl mb-5">
          <div className="flex items-center gap-2 flex-1 px-3 w-full">
            <Search size={18} className="text-[#6b64a0] shrink-0" />
            <input
              type="text"
              placeholder="Какой специалист вам нужен?"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 py-2 outline-none text-[#0f0a2e] bg-transparent placeholder:text-[#6b64a0] text-sm"
            />
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-[#6b64a0] text-sm px-3 border-l border-[#e2deff]">
            <MapPin size={14} /> Бишкек
          </div>
          <button
            onClick={() => navigate('/search')}
            className="w-full sm:w-auto bg-primary text-white px-6 py-3 rounded-xl font-syne font-bold text-sm hover:bg-primary-light transition-all"
          >
            Найти
          </button>
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-center px-4">
          <span className="text-xs text-[#6b64a0]">Популярные:</span>
          {popularTags.map(tag => (
            <span key={tag} className="px-3 py-1.5 bg-white border border-[#e2deff] rounded-full text-xs text-primary font-medium cursor-pointer hover:bg-primary hover:text-white hover:border-primary transition-all">
              {tag}
            </span>
          ))}
        </div>

        {/* STATS */}
        <div className="flex justify-center gap-8 md:gap-16 mt-12 pt-8 border-t border-[#e2deff] w-full max-w-lg px-4">
          {[['12K+','Специалистов'],['98%','Довольных клиентов'],['35+','Категорий']].map(([num,label]) => (
            <div key={label} className="text-center">
              <div className="font-syne text-2xl md:text-3xl font-extrabold text-primary">{num}</div>
              <div className="text-xs text-[#6b64a0] mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="max-w-6xl mx-auto px-4 md:px-6 py-16">
        <div className="text-xs font-bold tracking-widest text-accent uppercase mb-3">Услуги</div>
        <h2 className="font-syne text-3xl md:text-4xl font-extrabold tracking-tight mb-10">Популярные категории</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {categories.map(cat => (
            <div
              key={cat.id}
              onClick={() => navigate(`/category/${cat.id}`)}
              className="bg-white border border-[#e2deff] rounded-2xl p-4 md:p-6 text-center cursor-pointer group hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/15 hover:border-primary transition-all duration-200"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-surface rounded-xl flex items-center justify-center text-xl md:text-2xl mx-auto mb-3 group-hover:bg-primary transition-all duration-200">
                {cat.icon}
              </div>
              <div className="font-syne font-bold text-xs md:text-sm mb-1">{cat.name}</div>
              <div className="text-xs text-[#6b64a0] hidden md:block">{cat.count.toLocaleString()} мастеров</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="bg-primary text-white py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-xs font-bold tracking-widest text-accent uppercase mb-3">Процесс</div>
          <h2 className="font-syne text-3xl md:text-4xl font-extrabold tracking-tight mb-12">Как это работает?</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { n:'01', title:'Опишите задачу', text:'Расскажите что нужно сделать. Укажите детали, сроки и бюджет — займёт 2 минуты.' },
              { n:'02', title:'Получите предложения', text:'Специалисты откликнутся с ценами и сроками. Сравните профили, отзывы и рейтинги.' },
              { n:'03', title:'Выберите и платите', text:'Выберите лучшего мастера, договоритесь и оставьте отзыв после работы.' },
            ].map(s => (
              <div key={s.n}>
                <div className="font-syne text-5xl md:text-6xl font-extrabold text-white/10 mb-4">{s.n}</div>
                <h3 className="font-syne text-lg md:text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-white/70 leading-relaxed text-sm md:text-base">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOP PROS */}
      <section id="pros" className="max-w-6xl mx-auto px-4 md:px-6 py-16">
        <div className="text-xs font-bold tracking-widest text-accent uppercase mb-3">Специалисты</div>
        <h2 className="font-syne text-3xl md:text-4xl font-extrabold tracking-tight mb-10">Топ мастера этой недели</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {pros.map(pro => (
            <div
              key={pro.id}
              onClick={() => navigate(`/pro/${pro.id}`)}
              className="bg-white border border-[#e2deff] rounded-2xl p-5 md:p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 transition-all duration-200 cursor-pointer"
            >
              <div className="flex gap-3 md:gap-4">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-primary-light to-primary-dark flex items-center justify-center text-xl md:text-2xl shrink-0">
                  {pro.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-syne font-bold text-sm md:text-base truncate">{pro.name}</h4>
                  <div className="text-xs text-primary font-semibold mt-0.5 mb-2">{pro.job}</div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-accent text-sm">{'★'.repeat(pro.stars)}{'☆'.repeat(5 - pro.stars)}</span>
                    <span className="text-xs text-[#6b64a0]">{pro.rating} ({pro.reviews})</span>
                  </div>
                  <div className="text-sm text-[#6b64a0] font-semibold mt-1.5">{pro.price}</div>
                </div>
              </div>
              <button
                onClick={e => { e.stopPropagation(); navigate(`/pro/${pro.id}`) }}
                className="mt-4 w-full py-2.5 border-2 border-primary text-primary rounded-full font-semibold text-sm hover:bg-primary hover:text-white transition-all"
              >
                Нанять
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white text-center py-16 px-4 md:px-6">
        <h2 className="font-syne text-3xl md:text-4xl font-extrabold mb-4">Вы специалист? Начните зарабатывать!</h2>
        <p className="text-white/75 mb-8 text-base md:text-lg">Тысячи клиентов ищут мастеров прямо сейчас. Создайте профиль за 5 минут.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => navigate('/become-pro')} className="px-8 py-4 bg-white text-primary font-syne font-bold rounded-full hover:shadow-2xl transition-all">
            Зарегистрироваться как мастер
          </button>
          <button onClick={() => navigate('/about')} className="px-8 py-4 border-2 border-white/50 text-white font-syne font-bold rounded-full hover:border-white transition-all">
            Узнать подробнее
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0f0a2e] text-white/50 px-6 md:px-16 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1">
              <div className="font-syne text-2xl font-extrabold text-white mb-3">Bazar<span className="text-accent">Job</span></div>
              <p className="text-sm leading-relaxed">Платформа для поиска и найма локальных специалистов в Кыргызстане.</p>
            </div>
            {[
              { title: 'Услуги', links: ['Все категории', 'Как работает', 'Для бизнеса'] },
              { title: 'Специалистам', links: ['Стать мастером', 'Советы', 'Сообщество'] },
              { title: 'Компания', links: ['О нас', 'Блог', 'Контакты'] },
            ].map(col => (
              <div key={col.title}>
                <h5 className="font-syne text-white font-bold mb-4 text-sm">{col.title}</h5>
                <ul className="flex flex-col gap-2">
                  {col.links.map(l => <li key={l}><a href="#" className="text-sm hover:text-white transition-colors">{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between text-xs gap-2">
            <span>© 2025 BazarJob. Все права защищены.</span>
            <span>Бишкек, Кыргызстан</span>
          </div>
        </div>
      </footer>

      <AuthModal isOpen={modalOpen} onClose={() => setModalOpen(false)} initialTab="reg" />
    </div>
  )
}