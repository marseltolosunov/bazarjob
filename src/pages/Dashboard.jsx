import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Star, Clock, CheckCircle, XCircle, ChevronRight, User, Settings, LogOut, Bell, Briefcase } from 'lucide-react'

const clientOrders = [
  { id: 1, pro: 'Алмаз Токтосунов', job: 'Сантехник', avatar: '👨‍🔧', date: '28 февраля 2025', status: 'active', price: '2 500 сом', desc: 'Починить кран на кухне' },
  { id: 2, pro: 'Мирбек Джалилов', job: 'Электрик', avatar: '⚡', date: '20 февраля 2025', status: 'done', price: '3 000 сом', desc: 'Заменить розетки в комнате' },
  { id: 3, pro: 'Назира Шаимова', job: 'Клининг', avatar: '🧹', date: '10 февраля 2025', status: 'done', price: '1 200 сом', desc: 'Генеральная уборка квартиры' },
  { id: 4, pro: 'Айнура Сейткалиева', job: 'Дизайнер', avatar: '👩‍💻', date: '1 февраля 2025', status: 'cancelled', price: '5 000 сом', desc: 'Дизайн логотипа' },
]

const proOrders = [
  { id: 1, client: 'Асель Кожобекова', avatar: '👩', date: '28 февраля 2025', status: 'active', price: '2 500 сом', desc: 'Починить кран на кухне', address: 'ул. Чуй 123' },
  { id: 2, client: 'Марат Дыйканов', avatar: '👨', date: '25 февраля 2025', status: 'pending', price: '3 000 сом', desc: 'Установить смеситель', address: 'мкр. Восток-5' },
  { id: 3, client: 'Гуля Сапарова', avatar: '👩‍🦱', date: '20 февраля 2025', status: 'done', price: '1 800 сом', desc: 'Прочистить трубы', address: 'ул. Манаса 45' },
]

const statusConfig = {
  active:    { label: 'В процессе', color: 'bg-blue-100 text-blue-600' },
  done:      { label: 'Выполнен',   color: 'bg-green-100 text-green-600' },
  cancelled: { label: 'Отменён',    color: 'bg-red-100 text-red-500' },
  pending:   { label: 'Ожидает',    color: 'bg-yellow-100 text-yellow-600' },
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [role, setRole] = useState('client') // 'client' or 'pro'
  const [activePage, setActivePage] = useState('orders')

  const menuItems = [
    { id: 'orders',  icon: Briefcase, label: role === 'client' ? 'Мои заказы' : 'Заказы' },
    { id: 'profile', icon: User,      label: 'Профиль' },
    { id: 'notifications', icon: Bell, label: 'Уведомления' },
    { id: 'settings', icon: Settings, label: 'Настройки' },
  ]

  return (
    <div className="min-h-screen bg-[#f4f3ff]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-16">

        {/* ROLE SWITCHER — только для демо */}
        <div className="flex items-center gap-3 mb-6 bg-white border border-[#e2deff] rounded-2xl p-4">
          <span className="text-sm text-[#6b64a0] font-medium">Режим просмотра (демо):</span>
          <div className="flex bg-[#f4f3ff] rounded-xl p-1">
            {[{key:'client',label:'Клиент'},{key:'pro',label:'Мастер'}].map(r => (
              <button
                key={r.key}
                onClick={() => setRole(r.key)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${role === r.key ? 'bg-primary text-white' : 'text-[#6b64a0]'}`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">

          {/* SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-[#e2deff] overflow-hidden">

              {/* USER INFO */}
              <div className="bg-gradient-to-br from-primary to-primary-light p-6 text-white text-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl mx-auto mb-3">
                  {role === 'client' ? '👤' : '👨‍🔧'}
                </div>
                <div className="font-syne font-bold text-lg">
                  {role === 'client' ? 'Марсель А.' : 'Алмаз Токтосунов'}
                </div>
                <div className="text-white/70 text-sm mt-0.5">
                  {role === 'client' ? 'Клиент' : 'Сантехник • ★ 4.9'}
                </div>
              </div>

              {/* MENU */}
              <div className="p-3">
                {menuItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActivePage(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activePage === item.id ? 'bg-primary text-white' : 'text-[#6b64a0] hover:bg-[#f4f3ff] hover:text-primary'}`}
                  >
                    <item.icon size={17} />
                    {item.label}
                    {activePage !== item.id && <ChevronRight size={14} className="ml-auto opacity-40" />}
                  </button>
                ))}
                <div className="border-t border-[#e2deff] mt-2 pt-2">
                  <button
                    onClick={() => navigate('/')}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-50 transition-all"
                  >
                    <LogOut size={17} /> Выйти
                  </button>
                </div>
              </div>
            </div>

            {/* STATS — только для мастера */}
            {role === 'pro' && (
              <div className="bg-white rounded-2xl border border-[#e2deff] p-5 mt-4">
                <div className="font-syne font-bold text-sm mb-4">Статистика</div>
                {[
                  { label: 'Заработано', value: '47 300 сом' },
                  { label: 'Выполнено', value: '127 заказов' },
                  { label: 'Рейтинг', value: '★ 4.9' },
                ].map(s => (
                  <div key={s.label} className="flex justify-between items-center py-2.5 border-b border-[#e2deff] last:border-0">
                    <span className="text-xs text-[#6b64a0]">{s.label}</span>
                    <span className="font-syne font-bold text-sm text-primary">{s.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* MAIN CONTENT */}
          <div className="lg:col-span-3">

            {/* ORDERS PAGE */}
            {activePage === 'orders' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-syne text-2xl font-extrabold">
                    {role === 'client' ? 'Мои заказы' : 'Входящие заказы'}
                  </h2>
                  {role === 'client' && (
                    <button
                      onClick={() => navigate('/search')}
                      className="px-5 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary-light transition-all"
                    >
                      + Новый заказ
                    </button>
                  )}
                </div>

                <div className="flex flex-col gap-4">
                  {(role === 'client' ? clientOrders : proOrders).map(order => (
                    <div key={order.id} className="bg-white border border-[#e2deff] rounded-2xl p-6 hover:shadow-lg hover:shadow-primary/8 transition-all">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-light to-primary-dark flex items-center justify-center text-2xl shrink-0">
                          {role === 'client' ? order.avatar : order.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="font-syne font-bold">
                                {role === 'client' ? order.pro : order.client}
                              </div>
                              <div className="text-xs text-primary font-semibold mt-0.5">
                                {role === 'client' ? order.job : order.address}
                              </div>
                            </div>
                            <span className={`text-xs font-semibold px-3 py-1 rounded-full shrink-0 ${statusConfig[order.status].color}`}>
                              {statusConfig[order.status].label}
                            </span>
                          </div>

                          <p className="text-sm text-[#6b64a0] mt-2">{order.desc}</p>

                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-4 text-xs text-[#6b64a0]">
                              <span className="flex items-center gap-1"><Clock size={12} />{order.date}</span>
                              <span className="font-syne font-bold text-primary text-sm">{order.price}</span>
                            </div>

                            {/* ACTIONS */}
                            <div className="flex gap-2">
                              {order.status === 'active' && (
                                <>
                                  {role === 'pro' && (
                                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-xs font-semibold hover:bg-green-100 transition-all">
                                      <CheckCircle size={13} /> Завершить
                                    </button>
                                  )}
                                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-500 rounded-lg text-xs font-semibold hover:bg-red-100 transition-all">
                                    <XCircle size={13} /> Отменить
                                  </button>
                                </>
                              )}
                              {order.status === 'pending' && role === 'pro' && (
                                <>
                                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-semibold hover:bg-primary-light transition-all">
                                    <CheckCircle size={13} /> Принять
                                  </button>
                                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-500 rounded-lg text-xs font-semibold hover:bg-red-100 transition-all">
                                    <XCircle size={13} /> Отклонить
                                  </button>
                                </>
                              )}
                              {order.status === 'done' && role === 'client' && (
                                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 text-accent rounded-lg text-xs font-semibold hover:bg-accent/20 transition-all">
                                  <Star size={13} /> Оставить отзыв
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PROFILE PAGE */}
            {activePage === 'profile' && (
              <div>
                <h2 className="font-syne text-2xl font-extrabold mb-6">Мой профиль</h2>
                <div className="bg-white rounded-2xl border border-[#e2deff] p-8">
                  <div className="grid md:grid-cols-2 gap-5">
                    {[
                      { label: 'Имя', value: role === 'client' ? 'Марсель' : 'Алмаз', type: 'text' },
                      { label: 'Фамилия', value: role === 'client' ? 'Акматов' : 'Токтосунов', type: 'text' },
                      { label: 'Телефон', value: '+996 700 123 456', type: 'tel' },
                      { label: 'Email', value: 'user@example.com', type: 'email' },
                      { label: 'Город', value: 'Бишкек', type: 'text' },
                      { label: role === 'pro' ? 'Специализация' : 'О себе', value: role === 'pro' ? 'Сантехник' : '', type: 'text' },
                    ].map(f => (
                      <div key={f.label}>
                        <label className="text-xs font-bold mb-1.5 block text-[#0f0a2e]">{f.label}</label>
                        <input
                          type={f.type}
                          defaultValue={f.value}
                          className="w-full px-4 py-3 border-2 border-[#e2deff] rounded-xl text-sm outline-none focus:border-primary transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                  <button className="mt-6 px-8 py-3 bg-primary text-white rounded-xl font-syne font-bold hover:bg-primary-light transition-all">
                    Сохранить изменения
                  </button>
                </div>
              </div>
            )}

            {/* NOTIFICATIONS */}
            {activePage === 'notifications' && (
              <div>
                <h2 className="font-syne text-2xl font-extrabold mb-6">Уведомления</h2>
                <div className="flex flex-col gap-3">
                  {[
                    { icon: '✅', text: 'Алмаз Токтосунов принял вашу заявку', time: '2 часа назад', unread: true },
                    { icon: '⭐', text: 'Марат оставил отзыв на вашу работу', time: '1 день назад', unread: true },
                    { icon: '📩', text: 'Новое сообщение от Гули Сапаровой', time: '2 дня назад', unread: false },
                    { icon: '🎉', text: 'Ваш профиль верифицирован!', time: '5 дней назад', unread: false },
                  ].map((n, i) => (
                    <div key={i} className={`bg-white border rounded-2xl p-5 flex items-start gap-4 transition-all ${n.unread ? 'border-primary/30 shadow-sm shadow-primary/10' : 'border-[#e2deff]'}`}>
                      <div className="w-10 h-10 rounded-xl bg-[#f4f3ff] flex items-center justify-center text-xl shrink-0">{n.icon}</div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{n.text}</div>
                        <div className="text-xs text-[#6b64a0] mt-1">{n.time}</div>
                      </div>
                      {n.unread && <div className="w-2.5 h-2.5 rounded-full bg-primary shrink-0 mt-1" />}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SETTINGS */}
            {activePage === 'settings' && (
              <div>
                <h2 className="font-syne text-2xl font-extrabold mb-6">Настройки</h2>
                <div className="bg-white rounded-2xl border border-[#e2deff] divide-y divide-[#e2deff]">
                  {[
                    { label: 'Уведомления по SMS', desc: 'Получать SMS о новых заказах' },
                    { label: 'Уведомления по Email', desc: 'Получать письма на почту' },
                    { label: 'Показывать профиль в поиске', desc: 'Другие пользователи могут найти вас' },
                    { label: 'Двухфакторная аутентификация', desc: 'Дополнительная защита аккаунта' },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between px-6 py-4">
                      <div>
                        <div className="font-medium text-sm">{s.label}</div>
                        <div className="text-xs text-[#6b64a0] mt-0.5">{s.desc}</div>
                      </div>
                      <div
                        className="w-11 h-6 bg-primary rounded-full cursor-pointer relative"
                        onClick={e => e.currentTarget.classList.toggle('bg-[#e2deff]')}
                      >
                        <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 transition-all" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}