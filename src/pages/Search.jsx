import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { pros, categories } from '../data/mock'
import { Search as SearchIcon, MapPin, Star, Filter, X, ChevronDown } from 'lucide-react'

const allPros = [
  ...pros,
  { id: 7, avatar: '🏠', name: 'Тимур Бектенов', job: 'Мастер по ремонту', rating: 4.6, reviews: 54, price: 'от 1 500 сом/день', stars: 5, category: 'Ремонт' },
  { id: 8, avatar: '📸', name: 'Дамир Осмонов', job: 'Фотограф', rating: 4.9, reviews: 112, price: 'от 5 000 сом/съёмка', stars: 5, category: 'Фото / Видео' },
  { id: 9, avatar: '🌿', name: 'Айгуль Мамытова', job: 'Садовник', rating: 4.7, reviews: 38, price: 'от 800 сом/час', stars: 5, category: 'Сад / Огород' },
]

const sortOptions = ['По рейтингу', 'По цене', 'По отзывам']

export default function Search() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Все')
  const [sortBy, setSortBy] = useState('По рейтингу')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState('Любая')

  const priceRanges = ['Любая', 'до 500 сом', '500–1000 сом', '1000–3000 сом', 'от 3000 сом']

  const filtered = allPros.filter(p => {
    const matchQuery = p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.job.toLowerCase().includes(query.toLowerCase())
    const matchCat = selectedCategory === 'Все' || p.job.includes(selectedCategory) || p.category === selectedCategory
    return matchQuery && matchCat
  })

  return (
    <div className="min-h-screen bg-[#f4f3ff]">
      <Navbar />

      {/* SEARCH HEADER */}
      <div className="bg-primary pt-24 pb-10 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-syne text-3xl font-extrabold text-white mb-6">Найти специалиста</h1>
          <div className="flex gap-3">
            <div className="flex-1 flex items-center bg-white rounded-xl px-4 gap-3 shadow-lg">
              <SearchIcon size={18} className="text-[#6b64a0] shrink-0" />
              <input
                type="text"
                placeholder="Сантехник, репетитор, дизайнер..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="flex-1 py-3.5 outline-none text-[#0f0a2e] bg-transparent placeholder:text-[#6b64a0]"
              />
              {query && <button onClick={() => setQuery('')}><X size={16} className="text-[#6b64a0]" /></button>}
            </div>
            <div className="flex items-center bg-white rounded-xl px-4 gap-2 shadow-lg">
              <MapPin size={16} className="text-[#6b64a0]" />
              <span className="text-sm text-[#0f0a2e] font-medium">Бишкек</span>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-5 rounded-xl font-semibold text-sm transition-all shadow-lg ${showFilters ? 'bg-accent text-white' : 'bg-white text-[#0f0a2e]'}`}
            >
              <Filter size={16} /> Фильтры
            </button>
          </div>

          {/* FILTERS */}
          {showFilters && (
            <div className="mt-4 bg-white rounded-2xl p-6 shadow-xl">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm font-bold mb-3">Ценовой диапазон</div>
                  <div className="flex flex-wrap gap-2">
                    {priceRanges.map(p => (
                      <button
                        key={p}
                        onClick={() => setPriceRange(p)}
                        className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${priceRange === p ? 'bg-primary text-white border-primary' : 'border-[#e2deff] text-[#6b64a0] hover:border-primary hover:text-primary'}`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-bold mb-3">Минимальный рейтинг</div>
                  <div className="flex gap-2">
                    {[3,4,4.5,5].map(r => (
                      <button key={r} className="px-4 py-2 rounded-full text-sm font-medium border-2 border-[#e2deff] text-[#6b64a0] hover:border-primary hover:text-primary transition-all">
                        ★ {r}+
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex gap-8">

          {/* SIDEBAR */}
          <div className="hidden md:block w-56 shrink-0">
            <div className="bg-white rounded-2xl p-5 border border-[#e2deff] sticky top-24">
              <div className="font-syne font-bold text-sm mb-4">Категории</div>
              <div className="flex flex-col gap-1">
                {['Все', ...categories.map(c => c.name)].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${selectedCategory === cat ? 'bg-primary text-white' : 'text-[#6b64a0] hover:bg-surface hover:text-primary'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RESULTS */}
          <div className="flex-1">
            {/* Sort */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-[#6b64a0]">
                Найдено: <span className="font-bold text-[#0f0a2e]">{filtered.length}</span> специалистов
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#6b64a0]">Сортировка:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-[#e2deff] rounded-xl px-4 py-2 pr-8 text-sm font-medium outline-none cursor-pointer"
                  >
                    {sortOptions.map(o => <option key={o}>{o}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6b64a0] pointer-events-none" />
                </div>
              </div>
            </div>

            {/* CARDS */}
            <div className="flex flex-col gap-4">
              {filtered.length === 0 ? (
                <div className="text-center py-20 text-[#6b64a0]">
                  <div className="text-5xl mb-4">🔍</div>
                  <div className="font-syne font-bold text-xl mb-2">Ничего не найдено</div>
                  <div className="text-sm">Попробуйте изменить запрос или категорию</div>
                </div>
              ) : filtered.map(pro => (
                <div
                  key={pro.id}
                  onClick={() => navigate(`/pro/${pro.id}`)}
                  className="bg-white border border-[#e2deff] rounded-2xl p-6 flex gap-5 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 transition-all duration-200 cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-light to-primary-dark flex items-center justify-center text-3xl shrink-0">
                    {pro.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-syne font-bold text-lg">{pro.name}</h3>
                        <div className="text-sm text-primary font-semibold mt-0.5">{pro.job}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-syne font-bold text-primary">{pro.price}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center gap-1">
                        <Star size={14} className="fill-accent text-accent" />
                        <span className="text-sm font-bold">{pro.rating}</span>
                      </div>
                      <span className="text-xs text-[#6b64a0]">{pro.reviews} отзывов</span>
                      <span className="text-xs bg-[#f4f3ff] border border-[#e2deff] rounded-full px-2.5 py-0.5 text-[#6b64a0]">Бишкек</span>
                    </div>
                  </div>
                  <div className="flex items-center shrink-0">
                    <button
                      onClick={e => { e.stopPropagation(); navigate(`/pro/${pro.id}`) }}
                      className="px-6 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary-light transition-all"
                    >
                      Подробнее
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}