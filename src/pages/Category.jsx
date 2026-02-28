import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { categories, pros } from '../data/mock'
import { Star, MapPin, ArrowLeft, Search } from 'lucide-react'
import { useState } from 'react'

const allPros = [
  ...pros,
  { id: 7, avatar: '🏠', name: 'Тимур Бектенов', job: 'Мастер по ремонту', rating: 4.6, reviews: 54, price: 'от 1 500 сом/день', stars: 5, categoryId: 4 },
  { id: 8, avatar: '📸', name: 'Дамир Осмонов', job: 'Фотограф', rating: 4.9, reviews: 112, price: 'от 5 000 сом/съёмка', stars: 5, categoryId: 9 },
  { id: 9, avatar: '🌿', name: 'Айгуль Мамытова', job: 'Садовник', rating: 4.7, reviews: 38, price: 'от 800 сом/час', stars: 5, categoryId: 10 },
  { id: 10, avatar: '🔧', name: 'Канат Исаков', job: 'Сантехник', rating: 4.8, reviews: 91, price: 'от 600 сом/час', stars: 5, categoryId: 1 },
  { id: 11, avatar: '⚡', name: 'Руслан Ахматов', job: 'Электрик', rating: 4.7, reviews: 63, price: 'от 700 сом/час', stars: 5, categoryId: 2 },
  { id: 12, avatar: '🎨', name: 'Айдана Бекова', job: 'Дизайнер интерьера', rating: 4.9, reviews: 47, price: 'от 2 000 сом/час', stars: 5, categoryId: 3 },
]

const categoryProsMap = {
  1: [1, 10],
  2: [5, 11],
  3: [2, 12],
  4: [4, 7],
  5: [3],
  6: [6],
  7: [6],
  8: [2],
  9: [8],
  10: [9],
  11: [4],
  12: [4],
}

export default function Category() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const category = categories.find(c => c.id === Number(id))
  const prosIds = categoryProsMap[Number(id)] || []
  const categoryPros = allPros.filter(p => prosIds.includes(p.id))
  const filtered = categoryPros.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.job.toLowerCase().includes(search.toLowerCase())
  )

  if (!category) {
    navigate('/'); return null
  }

  return (
    <div className="min-h-screen bg-[#f4f3ff]">
      <Navbar />

      {/* HEADER */}
      <div className="bg-gradient-to-br from-primary-dark via-primary to-primary-light pt-28 pb-12 px-6 text-white">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6 text-sm font-medium"
          >
            <ArrowLeft size={16} /> Все категории
          </button>

          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center text-4xl">
              {category.icon}
            </div>
            <div>
              <h1 className="font-syne text-3xl md:text-4xl font-extrabold">{category.name}</h1>
              <p className="text-white/70 mt-1">{category.count.toLocaleString()} специалистов в Бишкеке</p>
            </div>
          </div>

          {/* SEARCH */}
          <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-4 gap-3 mt-8 max-w-lg">
            <Search size={16} className="text-white/60 shrink-0" />
            <input
              type="text"
              placeholder={`Поиск в категории "${category.name}"...`}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 py-3.5 bg-transparent outline-none text-white placeholder:text-white/50 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-xs text-[#6b64a0] mb-8">
          <span onClick={() => navigate('/')} className="hover:text-primary cursor-pointer">Главная</span>
          <span>/</span>
          <span onClick={() => navigate('/')} className="hover:text-primary cursor-pointer">Категории</span>
          <span>/</span>
          <span className="text-primary font-semibold">{category.name}</span>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="font-syne text-xl font-bold">
            Найдено: <span className="text-primary">{filtered.length}</span> специалистов
          </h2>
          <button
            onClick={() => navigate('/search')}
            className="text-sm text-primary font-semibold hover:underline"
          >
            Смотреть всех →
          </button>
        </div>

        {/* PROS GRID */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <div className="font-syne font-bold text-xl mb-2">Ничего не найдено</div>
            <div className="text-sm text-[#6b64a0]">Попробуйте изменить запрос</div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(pro => (
              <div
                key={pro.id}
                onClick={() => navigate(`/pro/${pro.id}`)}
                className="bg-white border border-[#e2deff] rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 transition-all duration-200 cursor-pointer"
              >
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-light to-primary-dark flex items-center justify-center text-2xl shrink-0">
                    {pro.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-syne font-bold truncate">{pro.name}</h3>
                    <div className="text-xs text-primary font-semibold mt-0.5 mb-2">{pro.job}</div>
                    <div className="flex items-center gap-2">
                      <Star size={13} className="fill-accent text-accent" />
                      <span className="text-sm font-bold">{pro.rating}</span>
                      <span className="text-xs text-[#6b64a0]">({pro.reviews} отзывов)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#e2deff]">
                  <div>
                    <div className="font-syne font-bold text-primary text-sm">{pro.price}</div>
                    <div className="flex items-center gap-1 text-xs text-[#6b64a0] mt-0.5">
                      <MapPin size={10} /> Бишкек
                    </div>
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); navigate(`/pro/${pro.id}`) }}
                    className="px-5 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary-light transition-all"
                  >
                    Подробнее
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* OTHER CATEGORIES */}
        <div className="mt-16">
          <h2 className="font-syne text-xl font-bold mb-6">Другие категории</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {categories.filter(c => c.id !== Number(id)).slice(0, 6).map(cat => (
              <div
                key={cat.id}
                onClick={() => navigate(`/category/${cat.id}`)}
                className="bg-white border border-[#e2deff] rounded-2xl p-4 text-center cursor-pointer hover:-translate-y-1 hover:shadow-lg hover:border-primary transition-all"
              >
                <div className="text-2xl mb-2">{cat.icon}</div>
                <div className="font-syne font-bold text-xs">{cat.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}