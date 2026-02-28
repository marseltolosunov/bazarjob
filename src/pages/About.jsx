import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Shield, Star, Users, Zap } from 'lucide-react'

export default function About() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#f4f3ff]">
      <Navbar />

      {/* HERO */}
      <section className="bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white pt-32 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute w-96 h-96 rounded-full bg-white/5 -top-20 -left-20" />
        <div className="absolute w-64 h-64 rounded-full bg-white/5 -bottom-10 -right-10" />
        <div className="max-w-3xl mx-auto relative">
          <div className="text-xs font-bold tracking-widest text-accent uppercase mb-4">О компании</div>
          <h1 className="font-syne text-5xl font-extrabold tracking-tight mb-6">
            Мы соединяем людей<br />с лучшими мастерами
          </h1>
          <p className="text-white/75 text-lg leading-relaxed">
            BazarJob — это платформа где каждый может найти надёжного специалиста или предложить свои услуги. Мы верим что качественный сервис должен быть доступен каждому.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { num: '12K+', label: 'Специалистов', icon: '👨‍🔧' },
            { num: '50K+', label: 'Выполненных заказов', icon: '✅' },
            { num: '98%', label: 'Довольных клиентов', icon: '⭐' },
            { num: '35+', label: 'Категорий услуг', icon: '📂' },
          ].map(s => (
            <div key={s.label} className="bg-white border border-[#e2deff] rounded-2xl p-6 text-center hover:shadow-lg hover:shadow-primary/10 transition-all">
              <div className="text-3xl mb-3">{s.icon}</div>
              <div className="font-syne text-3xl font-extrabold text-primary">{s.num}</div>
              <div className="text-sm text-[#6b64a0] mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="text-xs font-bold tracking-widest text-accent uppercase mb-3">Наша миссия</div>
            <h2 className="font-syne text-3xl font-extrabold tracking-tight mb-4">
              Делаем найм специалистов простым и безопасным
            </h2>
            <p className="text-[#6b64a0] leading-relaxed mb-4">
              Мы начали с простой идеи — найти хорошего мастера не должно быть сложно. В Кыргызстане тысячи талантливых специалистов, но найти их было трудно.
            </p>
            <p className="text-[#6b64a0] leading-relaxed">
              BazarJob решает эту проблему — создаём прозрачный рынок где мастера могут найти клиентов, а клиенты — проверенных специалистов с реальными отзывами.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Shield, title: 'Безопасность', text: 'Все мастера проходят верификацию' },
              { icon: Star, title: 'Качество', text: 'Реальные отзывы после каждой работы' },
              { icon: Users, title: 'Сообщество', text: 'Растущее комьюнити мастеров' },
              { icon: Zap, title: 'Быстро', text: 'Найдите мастера за 5 минут' },
            ].map(v => (
              <div key={v.title} className="bg-white border border-[#e2deff] rounded-2xl p-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <v.icon size={20} className="text-primary" />
                </div>
                <div className="font-syne font-bold text-sm mb-1">{v.title}</div>
                <div className="text-xs text-[#6b64a0] leading-relaxed">{v.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="bg-primary text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-xs font-bold tracking-widest text-accent uppercase mb-3">Команда</div>
          <h2 className="font-syne text-3xl font-extrabold mb-10">Люди за BazarJob</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { avatar: '👨‍💼', name: 'Азамат Бегалиев', role: 'CEO & Основатель' },
              { avatar: '👩‍💻', name: 'Айгерим Токова', role: 'CTO' },
              { avatar: '👨‍🎨', name: 'Нурлан Сатыбеков', role: 'Head of Design' },
              { avatar: '👩‍📊', name: 'Зарина Омурова', role: 'Head of Marketing' },
            ].map(m => (
              <div key={m.name} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl mx-auto mb-3">{m.avatar}</div>
                <div className="font-syne font-bold">{m.name}</div>
                <div className="text-white/60 text-sm mt-0.5">{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl mx-auto px-6 py-16 text-center">
        <h2 className="font-syne text-3xl font-extrabold mb-4">Готовы начать?</h2>
        <p className="text-[#6b64a0] mb-8">Найдите специалиста или начните зарабатывать прямо сейчас</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => navigate('/search')}
            className="px-8 py-4 bg-primary text-white rounded-full font-syne font-bold hover:bg-primary-light transition-all hover:shadow-lg hover:shadow-primary/30"
          >
            Найти мастера
          </button>
          <button
            onClick={() => navigate('/become-pro')}
            className="px-8 py-4 border-2 border-primary text-primary rounded-full font-syne font-bold hover:bg-primary hover:text-white transition-all"
          >
            Стать мастером
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0f0a2e] text-white/50 px-16 py-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center flex-wrap gap-4">
          <div className="font-syne text-xl font-extrabold text-white">Bazar<span className="text-accent">Job</span></div>
          <div className="text-sm">© 2025 BazarJob. Все права защищены.</div>
        </div>
      </footer>
    </div>
  )
}