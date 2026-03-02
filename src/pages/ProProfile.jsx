import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { pros } from '../data/mock'
import { Star, MapPin, Clock, Shield, ChevronLeft, Phone, MessageCircle } from 'lucide-react'

const allPros = [
  ...pros,
  { id: 7, avatar: '🏠', name: 'Тимур Бектенов', job: 'Мастер по ремонту', rating: 4.6, reviews: 54, price: 'от 1 500 сом/день', stars: 5 },
  { id: 8, avatar: '📸', name: 'Дамир Осмонов', job: 'Фотограф', rating: 4.9, reviews: 112, price: 'от 5 000 сом/съёмка', stars: 5 },
  { id: 9, avatar: '🌿', name: 'Айгуль Мамытова', job: 'Садовник', rating: 4.7, reviews: 38, price: 'от 800 сом/час', stars: 5 },
]

const reviews = [
  { id: 1, name: 'Асель К.', avatar: '👩', rating: 5, date: '15 февраля 2025', text: 'Отличный специалист! Всё сделал быстро и качественно. Очень доволен работой, буду обращаться ещё.' },
  { id: 2, name: 'Марат Д.', avatar: '👨', rating: 5, date: '3 февраля 2025', text: 'Профессионал своего дела. Пришёл вовремя, работу выполнил аккуратно. Рекомендую!' },
  { id: 3, name: 'Гуля С.', avatar: '👩‍🦱', rating: 4, date: '20 января 2025', text: 'Хорошая работа, всё понравилось. Немного задержался, но предупредил заранее.' },
]

export default function ProProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const pro = allPros.find(p => p.id === Number(id)) || allPros[0]

  return (
    <div className="min-h-screen bg-[#f4f3ff]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-24 md:pt-28 pb-16">

        <button
          onClick={() => navigate('/search')}
          className="flex items-center gap-2 text-[#6b64a0] hover:text-primary transition-colors mb-5 font-medium text-sm"
        >
          <ChevronLeft size={18} /> Назад к результатам
        </button>

        <div className="grid lg:grid-cols-3 gap-5">

          {/* LEFT */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* PROFILE CARD */}
            <div className="bg-white rounded-2xl border border-[#e2deff] p-5 md:p-8">
              <div className="flex gap-4 md:gap-6">
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-primary-light to-primary-dark flex items-center justify-center text-3xl md:text-5xl shrink-0">
                  {pro.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <h1 className="font-syne text-xl md:text-2xl font-extrabold">{pro.name}</h1>
                      <div className="text-primary font-semibold mt-0.5 text-sm md:text-base">{pro.job}</div>
                    </div>
                    <div className="flex items-center gap-1 bg-[#f4f3ff] border border-[#e2deff] rounded-xl px-3 py-1.5 shrink-0">
                      <Star size={13} className="fill-accent text-accent" />
                      <span className="font-bold text-sm">{pro.rating}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-3 text-xs text-[#6b64a0]">
                    <span className="flex items-center gap-1"><MapPin size={12} /> Бишкек</span>
                    <span className="flex items-center gap-1"><Star size={12} className="fill-accent text-accent" />{pro.reviews} отзывов</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> Отвечает за 1 час</span>
                    <span className="flex items-center gap-1 text-green-600 font-medium"><Shield size={12} className="text-green-500" />Проверен</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ABOUT */}
            <div className="bg-white rounded-2xl border border-[#e2deff] p-5 md:p-8">
              <h2 className="font-syne text-lg md:text-xl font-bold mb-4">О себе</h2>
              <p className="text-[#6b64a0] leading-relaxed text-sm md:text-base">
                Профессиональный {pro.job.toLowerCase()} с опытом работы более 5 лет.
                Выполняю работу качественно и в срок. Всегда на связи, консультирую бесплатно.
                Работаю по всему Бишкеку и пригороду. Гарантия на все виды работ.
              </p>
              <div className="grid grid-cols-3 gap-3 mt-5">
                {[
                  { num: '5+', label: 'Лет опыта' },
                  { num: pro.reviews, label: 'Выполнено работ' },
                  { num: '100%', label: 'Гарантия' },
                ].map(s => (
                  <div key={s.label} className="bg-[#f4f3ff] rounded-xl p-3 md:p-4 text-center">
                    <div className="font-syne text-xl md:text-2xl font-extrabold text-primary">{s.num}</div>
                    <div className="text-xs text-[#6b64a0] mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* SERVICES */}
            <div className="bg-white rounded-2xl border border-[#e2deff] p-5 md:p-8">
              <h2 className="font-syne text-lg md:text-xl font-bold mb-4">Услуги и цены</h2>
              <div className="flex flex-col gap-1">
                {[
                  { name: 'Базовая консультация', price: '500 сом', time: '30 мин' },
                  { name: 'Стандартная работа', price: '1 500 сом', time: '2–4 часа' },
                  { name: 'Комплексная работа', price: '4 000 сом', time: '1 день' },
                  { name: 'Срочный выезд', price: '2 000 сом', time: 'в течение часа' },
                ].map(s => (
                  <div key={s.name} className="flex items-center justify-between py-3 border-b border-[#e2deff] last:border-0">
                    <div>
                      <div className="font-medium text-sm">{s.name}</div>
                      <div className="text-xs text-[#6b64a0] mt-0.5">{s.time}</div>
                    </div>
                    <div className="font-syne font-bold text-primary text-sm">{s.price}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* REVIEWS */}
            <div className="bg-white rounded-2xl border border-[#e2deff] p-5 md:p-8">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-syne text-lg md:text-xl font-bold">Отзывы</h2>
                <div className="flex items-center gap-1.5">
                  <Star size={15} className="fill-accent text-accent" />
                  <span className="font-bold text-sm">{pro.rating}</span>
                  <span className="text-[#6b64a0] text-xs">({pro.reviews})</span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {reviews.map(r => (
                  <div key={r.id} className="pb-4 border-b border-[#e2deff] last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#f4f3ff] flex items-center justify-center text-base">{r.avatar}</div>
                        <div>
                          <div className="font-semibold text-sm">{r.name}</div>
                          <div className="text-xs text-[#6b64a0]">{r.date}</div>
                        </div>
                      </div>
                      <div className="text-accent text-xs">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
                    </div>
                    <p className="text-sm text-[#6b64a0] leading-relaxed">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — BOOKING */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl border border-[#e2deff] p-5 md:p-6 lg:sticky lg:top-24">
              <div className="font-syne text-xl md:text-2xl font-extrabold text-primary mb-1">{pro.price}</div>
              <div className="text-xs text-[#6b64a0] mb-5">Стоимость зависит от объёма работ</div>

              <div className="flex flex-col gap-3 mb-5">
                <div>
                  <label className="text-xs font-bold mb-1.5 block">Описание задачи</label>
                  <textarea
                    rows={4}
                    placeholder="Опишите что нужно сделать..."
                    className="w-full px-4 py-3 border-2 border-[#e2deff] rounded-xl text-sm outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold mb-1.5 block">Удобная дата</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border-2 border-[#e2deff] rounded-xl text-sm outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <button className="w-full py-3.5 bg-primary text-white rounded-xl font-syne font-bold hover:bg-primary-light transition-all hover:shadow-lg hover:shadow-primary/30 mb-3">
                Отправить заявку
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center gap-1.5 py-2.5 border-2 border-[#e2deff] rounded-xl text-xs font-semibold text-[#6b64a0] hover:border-primary hover:text-primary transition-all">
                  <Phone size={14} /> Позвонить
                </button>
                <button className="flex items-center justify-center gap-1.5 py-2.5 border-2 border-[#e2deff] rounded-xl text-xs font-semibold text-[#6b64a0] hover:border-primary hover:text-primary transition-all">
                  <MessageCircle size={14} /> Написать
                </button>
              </div>

              <div className="mt-4 flex items-start gap-2 text-xs text-[#6b64a0] bg-[#f4f3ff] rounded-xl p-3">
                <Shield size={13} className="text-green-500 shrink-0 mt-0.5" />
                Безопасная сделка — оплата только после выполнения работы
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}