import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const OptiGroup = () => {
  const advantages = [
    {
      icon: "Shield",
      title: "Официальная гарантия",
      description: "До 5 лет на оборудование и 3 года на монтажные работы"
    },
    {
      icon: "Clock",
      title: "Быстрый монтаж",
      description: "Установка системы за 1-2 дня с минимальным вмешательством"
    },
    {
      icon: "Award",
      title: "15 лет опыта",
      description: "Более 2000 успешно реализованных проектов"
    },
    {
      icon: "Wrench",
      title: "Сервисное обслуживание",
      description: "Круглосуточная техподдержка и плановое обслуживание"
    },
    {
      icon: "BadgeCheck",
      title: "Сертифицированные специалисты",
      description: "Команда инженеров с официальными сертификатами производителей"
    },
    {
      icon: "TrendingDown",
      title: "Экономия до 40%",
      description: "Снижение энергопотребления благодаря инверторным технологиям"
    }
  ];

  const systems = [
    {
      image: "https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/3d34d930-791c-4bc6-93a9-8a42e6251a2e.jpg",
      title: "Мультисплит-системы",
      description: "Один внешний блок на несколько внутренних - идеальное решение для квартир и небольших офисов",
      features: ["2-5 внутренних блоков", "Экономия места на фасаде", "Индивидуальное управление"],
      price: "от 89 000 ₽"
    },
    {
      image: "https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/972ed610-d567-4a3b-8625-090dda09b19c.jpg",
      title: "VRF/VRV системы",
      description: "Профессиональные решения для коммерческих объектов с высокими требованиями",
      features: ["До 64 внутренних блоков", "Длина трассы до 1000м", "Централизованное управление"],
      price: "от 350 000 ₽"
    },
    {
      image: "https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/95854f2a-bb93-47f4-8664-63d93487c536.jpg",
      title: "Канальные системы",
      description: "Скрытое кондиционирование с распределением воздуха через воздуховоды",
      features: ["Невидимое размещение", "Равномерный климат", "Интеграция с вентиляцией"],
      price: "от 120 000 ₽"
    }
  ];

  const services = [
    {
      icon: "ClipboardCheck",
      title: "Проектирование",
      description: "Разработка проекта системы кондиционирования с учетом всех особенностей объекта"
    },
    {
      icon: "Hammer",
      title: "Монтаж под ключ",
      description: "Полный цикл установки от прокладки трасс до пусконаладочных работ"
    },
    {
      icon: "Settings",
      title: "Обслуживание",
      description: "Плановое ТО, диагностика, дозаправка фреоном, ремонт любой сложности"
    },
    {
      icon: "Thermometer",
      title: "Системы вентиляции",
      description: "Проектирование и монтаж приточно-вытяжных систем с рекуперацией"
    },
    {
      icon: "Snowflake",
      title: "Чиллеры и фанкойлы",
      description: "Водяные системы охлаждения для больших площадей и промышленных объектов"
    },
    {
      icon: "Zap",
      title: "Автоматизация климата",
      description: "Умное управление микроклиматом через приложение и интеграция с умным домом"
    }
  ];

  const blogPosts = [
    {
      image: "https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/3d34d930-791c-4bc6-93a9-8a42e6251a2e.jpg",
      category: "Технологии",
      date: "15 октября 2024",
      title: "Мультисплит или несколько сплит-систем: что выбрать?",
      excerpt: "Разбираем плюсы и минусы разных подходов к кондиционированию квартиры или офиса",
      readTime: "5 мин"
    },
    {
      image: "https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/972ed610-d567-4a3b-8625-090dda09b19c.jpg",
      category: "Обслуживание",
      date: "8 октября 2024",
      title: "Как подготовить кондиционер к зиме: чек-лист от профи",
      excerpt: "Пошаговая инструкция по консервации системы кондиционирования на холодный период",
      readTime: "4 мин"
    },
    {
      image: "https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/95854f2a-bb93-47f4-8664-63d93487c536.jpg",
      category: "Кейсы",
      date: "1 октября 2024",
      title: "Кейс: климат-контроль в загородном доме 400 м²",
      excerpt: "Как мы реализовали комплексную систему кондиционирования и вентиляции в коттедже",
      readTime: "7 мин"
    },
    {
      image: "https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/3d34d930-791c-4bc6-93a9-8a42e6251a2e.jpg",
      category: "Экономия",
      date: "25 сентября 2024",
      title: "Инверторные кондиционеры: экономия до 60% электроэнергии",
      excerpt: "Почему инверторные системы дороже при покупке, но выгоднее в эксплуатации",
      readTime: "6 мин"
    },
    {
      image: "https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/972ed610-d567-4a3b-8625-090dda09b19c.jpg",
      category: "Здоровье",
      date: "18 сентября 2024",
      title: "Кондиционер и здоровье: развеиваем мифы",
      excerpt: "Правда о влиянии кондиционеров на здоровье и как пользоваться ими правильно",
      readTime: "5 мин"
    },
    {
      image: "https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/95854f2a-bb93-47f4-8664-63d93487c536.jpg",
      category: "Тренды",
      date: "10 сентября 2024",
      title: "Тренды 2024: что нового в мире климатической техники",
      excerpt: "Умные кондиционеры, очистка воздуха и другие новинки индустрии",
      readTime: "8 мин"
    }
  ];

  const brands = ["Daikin", "Mitsubishi Electric", "Fujitsu", "Panasonic", "LG", "Samsung"];

  const steps = [
    {
      number: "01",
      title: "Заявка",
      description: "Оставьте заявку на сайте или позвоните нам"
    },
    {
      number: "02",
      title: "Выезд специалиста",
      description: "Бесплатный замер и консультация на объекте"
    },
    {
      number: "03",
      title: "Проект и смета",
      description: "Подготовка технического решения и расчет стоимости"
    },
    {
      number: "04",
      title: "Монтаж",
      description: "Профессиональная установка в согласованные сроки"
    },
    {
      number: "05",
      title: "Пуск и настройка",
      description: "Запуск системы и обучение пользованию"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <Icon name="Wind" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ОПТИ-групп</h1>
                <p className="text-xs text-green-600">Климатические системы</p>
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#systems" className="text-gray-700 hover:text-green-600 transition-colors">Системы</a>
              <a href="#services" className="text-gray-700 hover:text-green-600 transition-colors">Услуги</a>
              <a href="#blog" className="text-gray-700 hover:text-green-600 transition-colors">Блог</a>
              <a href="#about" className="text-gray-700 hover:text-green-600 transition-colors">О компании</a>
              <Button className="bg-green-600 hover:bg-green-700">
                <Icon name="Phone" className="mr-2" size={16} />
                Заказать звонок
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <section className="relative bg-gradient-to-br from-green-50 via-white to-green-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Icon name="Sparkles" className="inline mr-2" size={14} />
                Официальный партнер ведущих производителей
              </div>
              <h1 className="text-5xl font-black text-gray-900 mb-6 leading-tight">
                Мультисплит-системы для идеального климата
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Профессиональное проектирование, монтаж и обслуживание климатических систем любой сложности. 
                Работаем с жилыми и коммерческими объектами по всей Москве и области.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  <Icon name="Calculator" className="mr-2" size={18} />
                  Рассчитать стоимость
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-green-600 text-green-600 hover:bg-green-50">
                  <Icon name="FileText" className="mr-2" size={18} />
                  Скачать каталог
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-1">2000+</div>
                  <div className="text-sm text-gray-600">Реализованных проектов</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-1">15 лет</div>
                  <div className="text-sm text-gray-600">На рынке</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-1">24/7</div>
                  <div className="text-sm text-gray-600">Техподдержка</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/3d34d930-791c-4bc6-93a9-8a42e6251a2e.jpg" 
                alt="Мультисплит система" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border border-green-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Icon name="ThumbsUp" className="text-green-600" size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">98%</div>
                    <div className="text-sm text-gray-600">Довольных клиентов</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-sm font-semibold text-green-600 mb-2">НАШИ ПРЕИМУЩЕСТВА</h2>
            <h3 className="text-4xl font-black text-gray-900">Почему выбирают нас</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((advantage, index) => (
              <Card key={index} className="border-2 hover:border-green-600 transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon name={advantage.icon} className="text-green-600" size={28} />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{advantage.title}</h4>
                  <p className="text-gray-600">{advantage.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="systems" className="py-20 bg-gradient-to-b from-white to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-sm font-semibold text-green-600 mb-2">КЛИМАТИЧЕСКИЕ СИСТЕМЫ</h2>
            <h3 className="text-4xl font-black text-gray-900 mb-4">Решения для любых задач</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              От компактных мультисплит-систем для квартир до масштабных VRF-решений для бизнес-центров
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {systems.map((system, index) => (
              <Card key={index} className="overflow-hidden border-2 hover:border-green-600 transition-all hover:shadow-xl group">
                <div className="relative overflow-hidden">
                  <img 
                    src={system.image} 
                    alt={system.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-2xl font-bold text-white">{system.title}</h4>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">{system.description}</p>
                  <div className="space-y-2 mb-6">
                    {system.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Icon name="Check" className="text-green-600" size={16} />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-sm text-gray-500">Стоимость</span>
                    <span className="text-2xl font-bold text-green-600">{system.price}</span>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Получить консультацию
                    <Icon name="ArrowRight" className="ml-2" size={16} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-sm font-semibold text-green-600 mb-2">ПОЛНЫЙ СПЕКТР УСЛУГ</h2>
            <h3 className="text-4xl font-black text-gray-900 mb-4">Что мы делаем</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="border hover:border-green-600 transition-all hover:shadow-lg group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
                    <Icon name={service.icon} className="text-green-600 group-hover:text-white transition-colors" size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h4>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-600">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-black text-white mb-4">Работаем с ведущими брендами</h3>
            <p className="text-green-100">Официальное партнерство и оригинальное оборудование</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {brands.map((brand, index) => (
              <div key={index} className="bg-white rounded-xl p-6 flex items-center justify-center hover:shadow-lg transition-shadow">
                <span className="text-lg font-bold text-gray-800">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-sm font-semibold text-green-600 mb-2">КАК МЫ РАБОТАЕМ</h2>
            <h3 className="text-4xl font-black text-gray-900 mb-4">5 простых шагов</h3>
          </div>
          <div className="max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                    {step.number}
                  </div>
                </div>
                <div className="flex-grow pt-3">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-gray-600">{step.description}</p>
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-8 bg-green-200 ml-8 mt-4" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-sm font-semibold text-green-600 mb-2">БЛОГ</h2>
              <h3 className="text-4xl font-black text-gray-900">Полезные статьи</h3>
            </div>
            <Button variant="outline" className="border-2 border-green-600 text-green-600">
              Все статьи
              <Icon name="ArrowRight" className="ml-2" size={16} />
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="overflow-hidden border hover:shadow-xl transition-all group cursor-pointer">
                <div className="relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Icon name="Calendar" size={14} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Clock" size={14} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center text-green-600 font-semibold group-hover:gap-2 transition-all">
                    Читать статью
                    <Icon name="ArrowRight" className="ml-1" size={16} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-black mb-6">Готовы создать идеальный микроклимат?</h2>
            <p className="text-xl text-green-100 mb-8">
              Оставьте заявку, и наш специалист свяжется с вами в течение 15 минут для бесплатной консультации
            </p>
            <div className="bg-white rounded-2xl p-8 max-w-2xl mx-auto">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input 
                  type="text" 
                  placeholder="Ваше имя"
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-600 outline-none text-gray-900"
                />
                <input 
                  type="tel" 
                  placeholder="Телефон"
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-600 outline-none text-gray-900"
                />
              </div>
              <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white">
                <Icon name="Send" className="mr-2" size={18} />
                Получить консультацию
              </Button>
              <p className="text-xs text-gray-500 mt-4">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer id="about" className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <Icon name="Wind" className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold">ОПТИ-групп</h3>
                  <p className="text-xs text-gray-400">Климатические системы</p>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Профессиональное проектирование и монтаж климатических систем с 2009 года
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Услуги</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-green-400 transition-colors">Мультисплит-системы</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">VRF/VRV системы</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Вентиляция</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Обслуживание</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-green-400 transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Проекты</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Блог</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (495) 123-45-67</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <span>info@opti-group.ru</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  <span>Москва, ул. Примерная, 123</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">© 2024 ОПТИ-групп. Все права защищены.</p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                <Icon name="Send" size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                <Icon name="Phone" size={18} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OptiGroup;
