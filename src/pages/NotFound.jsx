import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#f4f3ff] flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <div className="font-syne text-[10rem] font-extrabold text-primary/10 leading-none select-none">404</div>
        <div className="font-syne text-3xl font-extrabold -mt-8 mb-4">Страница не найдена</div>
        <p className="text-[#6b64a0] mb-8 max-w-sm">Такой страницы не существует. Возможно она была удалена или вы ввели неверный адрес.</p>
        <div className="flex gap-4 flex-wrap justify-center">
          <button
            onClick={() => navigate('/')}
            className="px-8 py-4 bg-primary text-white rounded-full font-syne font-bold hover:bg-primary-light transition-all"
          >
            На главную
          </button>
          <button
            onClick={() => navigate('/search')}
            className="px-8 py-4 border-2 border-primary text-primary rounded-full font-syne font-bold hover:bg-primary hover:text-white transition-all"
          >
            Найти мастера
          </button>
        </div>
      </div>
    </div>
  )
}