import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { categories } from '../data/mock'
import { CheckCircle, Upload, ArrowRight, ArrowLeft } from 'lucide-react'

const steps = ['Личные данные', 'Специализация', 'Опыт и цены', 'Готово']

export default function BecomePro() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState([])

  const toggleCategory = (name) => {
    setSelected(prev =>
      prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]
    )
  }

  return (
    <div className="min-h-screen bg-[#f4f3ff]">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 pt-28 pb-16">

        {/* HEADER */}
        <div className="text-center mb-10">
          <div className="text-xs font-bold tracking-widest text-accent uppercase mb-3">Для специалистов</div>
          <h1 className="font-syne text-4xl font-extrabold tracking-tight mb-3">Стать мастером</h1>
          <p className="text-[#6b64a0]">Заполните анкету и начните получать заказы уже сегодня</p>
        </div>

        {/* STEPS */}
        <div className="flex items-center justify-between mb-10 relative">
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-[#e2deff] -z-10" />
          <div
            className="absolute top-4 left-0 h-0.5 bg-primary -z-10 transition-all duration-500"
            style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
          />
          {steps.map((s, i) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                i < step ? 'bg-primary text-white' :
                i === step ? 'bg-primary text-white ring-4 ring-primary/20' :
                'bg-white border-2 border-[#e2deff] text-[#6b64a0]'
              }`}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${i === step ? 'text-primary' : 'text-[#6b64a0]'}`}>{s}</span>
            </div>
          ))}
        </div>

        {/* CARD */}
        <div className="bg-white rounded-2xl border border-[#e2deff] p-8">

          {/* STEP 0 — Личные данные */}
          {step === 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="font-syne text-xl font-bold mb-2">Личные данные</h2>
              {[
                { label: 'Имя', placeholder: 'Ваше имя', type: 'text' },
                { label: 'Фамилия', placeholder: 'Ваша фамилия', type: 'text' },
                { label: 'Телефон', placeholder: '+996 xxx xxx xxx', type: 'tel' },
                { label: 'Email', placeholder: 'email@example.com', type: 'email' },
                { label: 'Город', placeholder: 'Бишкек', type: 'text' },
              ].map(f => (
                <div key={f.label}>
                  <label className="text-xs font-bold mb-1.5 block">{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    className="w-full px-4 py-3 border-2 border-[#e2deff] rounded-xl text-sm outline-none focus:border-primary transition-colors"
                  />
                </div>
              ))}

              {/* Фото */}
              <div>
                <label className="text-xs font-bold mb-1.5 block">Фото профиля</label>
                <div className="border-2 border-dashed border-[#e2deff] rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors">
                  <Upload size={24} className="mx-auto text-[#6b64a0] mb-2" />
                  <div className="text-sm text-[#6b64a0]">Нажмите чтобы загрузить фото</div>
                  <div className="text-xs text-[#6b64a0] mt-1">JPG, PNG до 5MB</div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 1 — Специализация */}
          {step === 1 && (
            <div>
              <h2 className="font-syne text-xl font-bold mb-2">Специализация</h2>
              <p className="text-sm text-[#6b64a0] mb-6">Выберите одну или несколько категорий</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => toggleCategory(cat.name)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-sm font-medium ${
                      selected.includes(cat.name)
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-[#e2deff] text-[#6b64a0] hover:border-primary/50'
                    }`}
                  >
                    <span className="text-2xl">{cat.icon}</span>
                    {cat.name}
                    {selected.includes(cat.name) && (
                      <CheckCircle size={14} className="text-primary" />
                    )}
                  </button>
                ))}
              </div>
              {selected.length > 0 && (
                <div className="mt-4 text-xs text-primary font-semibold">
                  Выбрано: {selected.join(', ')}
                </div>
              )}
            </div>
          )}

          {/* STEP 2 — Опыт и цены */}
          {step === 2 && (
            <div className="flex flex-col gap-4">
              <h2 className="font-syne text-xl font-bold mb-2">Опыт и цены</h2>
              <div>
                <label className="text-xs font-bold mb-1.5 block">Опыт работы</label>
                <div className="flex flex-wrap gap-2">
                  {['Менее 1 года', '1–3 года', '3–5 лет', 'Более 5 лет'].map(e => (
                    <button
                      key={e}
                      className="px-4 py-2 rounded-full border-2 border-[#e2deff] text-sm text-[#6b64a0] hover:border-primary hover:text-primary transition-all"
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold mb-1.5 block">Минимальная цена (сом/час)</label>
                <input
                  type="number"
                  placeholder="500"
                  className="w-full px-4 py-3 border-2 border-[#e2deff] rounded-xl text-sm outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-bold mb-1.5 block">О себе</label>
                <textarea
                  rows={4}
                  placeholder="Расскажите о вашем опыте, навыках и подходе к работе..."
                  className="w-full px-4 py-3 border-2 border-[#e2deff] rounded-xl text-sm outline-none focus:border-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold mb-1.5 block">Документы / Сертификаты</label>
                <div className="border-2 border-dashed border-[#e2deff] rounded-xl p-6 text-center cursor-pointer hover:border-primary transition-colors">
                  <Upload size={20} className="mx-auto text-[#6b64a0] mb-2" />
                  <div className="text-sm text-[#6b64a0]">Загрузите подтверждающие документы</div>
                  <div className="text-xs text-[#6b64a0] mt-1">PDF, JPG, PNG до 10MB</div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 — Готово */}
          {step === 3 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl mx-auto mb-6">
                🎉
              </div>
              <h2 className="font-syne text-2xl font-extrabold mb-3">Анкета отправлена!</h2>
              <p className="text-[#6b64a0] mb-8 leading-relaxed">
                Мы проверим ваши данные в течение 24 часов и отправим подтверждение на указанный email.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { icon: '✅', text: 'Профиль создан' },
                  { icon: '🔍', text: 'Проверка данных — 24 часа' },
                  { icon: '🚀', text: 'Начните получать заказы' },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-3 bg-[#f4f3ff] rounded-xl px-4 py-3 text-sm font-medium">
                    <span>{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate('/dashboard')}
                className="mt-8 w-full py-4 bg-primary text-white rounded-xl font-syne font-bold hover:bg-primary-light transition-all"
              >
                Перейти в кабинет
              </button>
            </div>
          )}

          {/* NAVIGATION BUTTONS */}
          {step < 3 && (
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep(s => s - 1)}
                disabled={step === 0}
                className="flex items-center gap-2 px-6 py-3 border-2 border-[#e2deff] rounded-xl text-sm font-semibold text-[#6b64a0] hover:border-primary hover:text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowLeft size={16} /> Назад
              </button>
              <button
                onClick={() => setStep(s => s + 1)}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-syne font-bold text-sm hover:bg-primary-light transition-all"
              >
                {step === 2 ? 'Отправить' : 'Далее'} <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}