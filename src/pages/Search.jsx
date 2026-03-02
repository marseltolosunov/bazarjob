import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { pros, categories } from '../data/mock'
import { Search as SearchIcon, MapPin, Star, Filter, X, ChevronDown } from 'lucide-react'

const allPros = [
  ...pros,
  { id: 7, avatar: '🏠', name: 'Тимур Бектенов', job: 'Мастер по ремонту', rating: 4.6, reviews: 54, price: 'от 1 500 сом/день', stars: 5 },
  { id: 8, avatar: '📸', name: 'Дамир Осмонов', job: 'Фотограф', rating: 4.9, reviews: 112, price: 'от 5 000 сом/съёмка', stars: 5 },
  { id: 9, avatar: '🌿', name: 'Айгуль Мамытова', job: 'Садовник', rating: 4.7, reviews: 38, price: 'от 800 сом/час', stars: 5 },
]

const sortOptions = ['По рейтингу', 'По цене', 'По отзывам']

export default function Search() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Все')
  const [sortBy, setSortBy] = useState('По рейтингу')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState('Любая')
  const [showSidebar, setShowSidebar] = useState(false)

  const priceRanges = ['Любая', 'до 500 сом', '500–1000 сом', '1000–3000 сом', 'от 3000 сом']

  const filtered = allPros.filter(p => {
    const matchQuery = p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.job.toLowerCase().includes(query.toLowerCase())
    const matchCat = selectedCategory === 'Все' || p.job.includes(selectedCategory)
    return matchQuery && matchCat
  })

  return (
    <div className="min-h-screen bg-[#f4f3ff]">
      <Navbar />

      {/* SEARCH HEADER */}
      <div className="bg-primary pt-24 pb-8 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-syne text-2xl md:text-3xl font-extrabold text-white mb-5">Найти специалиста</h1>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center bg-white rounded-xl px-4 gap-3 shadow-lg">
              <SearchIcon size={18} className="text-[#6b64a0] shrink-0" />
              <input
                type="text"
                placeholder="Сантехник, репетитор..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="flex-1 py-3 outline-none text-[#0f0a2e] bg-transparent placeholder:text-[#6b64a0] text-sm"
              />
              {query && <button onClick={() => setQuery('')}><X size={16} className="text-[#6b64a0]" /></button>}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 rounded-xl font-semibold text-sm transition-all shadow-lg ${showFilters ? 'bg-accent text-white' : 'bg-white text-[#0f0a2e]'}`}
            >
              <Filter size={16} />
              <span className="hidden sm:inline">Фильтры</span>
            </button>
          </div>

          {/* FILTERS */}
          {showFilters && (
            <div className="mt-3 bg-white rounded-2xl p-5 shadow-xl">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <div className="text-sm font-bold mb-3">Ценовой диапазон</div>
                  <div className="flex flex-wrap gap-2">
                    {priceRanges.map(p => (
                      <button
                        key={p}
                        onClick={() => setPriceRange(p)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border-2 transition-all ${priceRange === p ? 'bg-primary text-white border-primary' : 'border-[#e2deff] text-[#6b64a0] hover:border-primary'}`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-bold mb-3">Минимальный рейтинг</div>
                  <div className="flex gap-2 flex-wrap">
                    {[3, 4, 4.5, 5].map(r => (
                      <button key={r} className="px-3 py-1.5 rounded-full text-xs font-medium border-2 border-[#e2deff] text-[#6b64a0] hover:border-primary transition-all">
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

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">

        {/* MOBILE CATEGORY BUTTON */}
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="md:hidden flex items-center gap-2 mb-4 px-4 py-2.5 bg-white border border-[#e2deff] rounded-xl text-sm font-semibold text-[#6b64a0]"
        >
          <Filter size={15} /> Категории: {selectedCategory}
        </button>

        {/* MOBILE SIDEBAR */}
        {showSidebar && (
          <div className="md:hidden bg-white rounded-2xl border border-[#e2deff] p-4 mb-4">
            <div className="grid grid-cols-2 gap-1">
              {['Все', ...categories.map(c => c.name)].map(cat => (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setShowSidebar(false) }}
                  className={`text-left px-3 py-2 rounded-xl text-sm font-medium transition-all ${selectedCategory === cat ? 'bg-primary text-white' : 'text-[#6b64a0] hover:bg-[#f4f3ff]'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-6">
          {/* DESKTOP SIDEBAR */}
          <div className="hidden md:block w-52 shrink-0">
            <div className="bg-white rounded-2xl border border-[#e2deff] p-4 sticky top-24">
              <div className="font-syne font-bold text-sm mb-3">Категории</div>
              <div className="flex flex-col gap-0.5">
                {['Все', ...categories.map(c => c.name)].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left px-3 py-2 rounded-xl text-sm font-medium transition-all ${selectedCategory === cat ? 'bg-primary text-white' : 'text-[#6b64a0] hover:bg-[#f4f3ff] hover:text-primary'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RESULTS */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <div className="text-sm text-[#6b64a0]">
                Найдено: <span className="font-bold text-[#0f0a2e]">{filtered.length}</span> специалистов
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#6b64a0] hidden sm:inline">Сортировка:</span>
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

            <div className="flex flex-col gap-3">
              {filtered.length === 0 ? (
                <div className="text-center py-16 text-[#6b64a0]">
                  <div className="text-5xl mb-4">🔍</div>
                  <div className="font-syne font-bold text-xl mb-2">Ничего не найдено</div>
                  <div className="text-sm">Попробуйте изменить запрос</div>
                </div>
              ) : filtered.map(pro => (
                <div
                  key={pro.id}
                  onClick={() => navigate(`/pro/${pro.id}`)}
                  className="bg-white border border-[#e2deff] rounded-2xl p-4 md:p-5 flex gap-4 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 transition-all cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-light to-primary-dark flex items-center justify-center text-2xl shrink-0">
                    {pro.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <h3 className="font-syne font-bold">{pro.name}</h3>
                        <div className="text-xs text-primary font-semibold mt-0.5">{pro.job}</div>
                      </div>
                      <div className="font-syne font-bold text-primary text-sm shrink-0">{pro.price}</div>
                    </div>
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      <div className="flex items-center gap-1">
                        <Star size={13} className="fill-accent text-accent" />
                        <span className="text-sm font-bold">{pro.rating}</span>
                      </div>
                      <span className="text-xs text-[#6b64a0]">{pro.reviews} отзывов</span>
                      <span className="flex items-center gap-1 text-xs text-[#6b64a0]">
                        <MapPin size={11} /> Бишкек
                      </span>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center shrink-0">
                    <button
                      onClick={e => { e.stopPropagation(); navigate(`/pro/${pro.id}`) }}
                      className="px-5 py-2 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary-light transition-all"
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