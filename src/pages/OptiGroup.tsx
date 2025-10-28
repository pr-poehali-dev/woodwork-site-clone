import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";
import { useState } from "react";

const OptiGroup = () => {
  const [activeTab, setActiveTab] = useState("commercial");

  const advantages = [
    {
      icon: "Shield",
      title: "Гарантия 5 лет",
      description: "Расширенная гарантия на оборудование и полная ответственность за монтажные работы"
    },
    {
      icon: "Users",
      title: "Личный менеджер",
      description: "Закрепленный инженер ведет проект от А до Я, 24/7 на связи"
    },
    {
      icon: "Award",
      title: "15 лет на рынке",
      description: "2000+ реализованных проектов для бизнеса: от офисов до заводов"
    },
    {
      icon: "FileText",
      title: "Полный пакет документов",
      description: "Проект, сметы, акты, исполнительная документация для ввода в эксплуатацию"
    },
    {
      icon: "Building2",
      title: "Работа с подрядчиками",
      description: "Координация с генподрядчиками, вписываемся в график стройки"
    },
    {
      icon: "Calculator",
      title: "Отсрочка платежа",
      description: "Работаем по 223-ФЗ, 44-ФЗ. Отсрочка до 90 дней для корпоративных клиентов"
    },
    {
      icon: "Wrench",
      title: "Сервисный контракт",
      description: "Плановое ТО, диспетчеризация, замена фильтров - все включено"
    },
    {
      icon: "TrendingDown",
      title: "Окупаемость 2-3 года",
      description: "Экономия энергии до 60% относительно старых систем"
    }
  ];

  const systems = [
    {
      image: "https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/5ef5137f-3835-4d96-828a-8f2b619a26f0.jpg",
      title: "VRF/VRV системы",
      subtitle: "Для бизнес-центров и торговых площадей",
      description: "Масштабируемые решения для коммерческой недвижимости с централизованным управлением и мониторингом",
      features: [
        "До 64 внутренних блоков на 1 систему",
        "Длина трассы до 1000 метров",
        "Работа при -25°C до +50°C",
        "Индивидуальные зоны климата",
        "Одновременный обогрев и охлаждение",
        "Интеграция с BMS"
      ],
      specs: "200-2000 м²",
      price: "от 450 000 ₽",
      roi: "2.5 года"
    },
    {
      image: "https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/326c7e3e-1a92-4296-9fd7-d3e34565d98a.jpg",
      title: "Чиллеры + Фанкойлы",
      subtitle: "Для крупных объектов и производств",
      description: "Водяные системы охлаждения с высокой производительностью для промышленных и коммерческих объектов",
      features: [
        "Мощность от 50 до 5000 кВт",
        "Воздушное или водяное охлаждение",
        "Фрикулинг (бесплатное охлаждение зимой)",
        "Работа с несколькими контурами",
        "Резервирование для критичных процессов",
        "Удаленный мониторинг"
      ],
      specs: "1000+ м²",
      price: "от 1 200 000 ₽",
      roi: "3 года"
    },
    {
      image: "https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/246fbb98-5451-4929-9763-d70f8e42734c.jpg",
      title: "Прецизионные кондиционеры",
      subtitle: "Для серверных и ЦОД",
      description: "Высокоточные системы поддержания температуры и влажности для критичных помещений",
      features: [
        "Точность ±1°C и ±5% влажности",
        "Работа 24/7/365",
        "Резервирование N+1",
        "Мониторинг через SNMP",
        "Аварийное оповещение",
        "Поддержка высоких тепловыделений"
      ],
      specs: "20-500 м²",
      price: "от 380 000 ₽",
      roi: "1.5 года"
    },
    {
      image: "https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/3d34d930-791c-4bc6-93a9-8a42e6251a2e.jpg",
      title: "Канальные системы",
      subtitle: "Скрытая климатизация офисов",
      description: "Невидимое кондиционирование с распределением воздуха через систему воздуховодов",
      features: [
        "Полностью скрытый монтаж",
        "Равномерное распределение воздуха",
        "Совмещение с вентиляцией",
        "Зонирование помещений",
        "Низкий уровень шума",
        "Интеграция фильтрации"
      ],
      specs: "80-400 м²",
      price: "от 180 000 ₽",
      roi: "2 года"
    }
  ];

  const services = [
    {
      icon: "ClipboardCheck",
      title: "Проектирование",
      description: "Полный цикр проектных работ: теплотехнический расчет, подбор оборудования, рабочая документация",
      details: ["Тепловой баланс здания", "3D-моделирование", "Гидравлический расчет", "Спецификация оборудования"]
    },
    {
      icon: "Hammer",
      title: "Монтаж под ключ",
      description: "Установка систем любой сложности с соблюдением СНиП, ГОСТов и требований производителей",
      details: ["Прокладка трасс", "Дренажная система", "Электромонтаж", "Пусконаладка"]
    },
    {
      icon: "Settings",
      title: "Сервисное обслуживание",
      description: "Регулярное ТО, диагностика, ремонт. Сервисные контракты с гарантией времени реакции",
      details: ["Плановое ТО 2-4 раза/год", "Диспетчеризация 24/7", "Склад запчастей", "Выезд за 2 часа"]
    },
    {
      icon: "Thermometer",
      title: "Приточно-вытяжная вентиляция",
      description: "Проектирование и монтаж систем вентиляции с рекуперацией тепла и очисткой воздуха",
      details: ["Рекуперация до 92%", "HEPA фильтрация", "Увлажнение/осушение", "Автоматизация"]
    },
    {
      icon: "Wind",
      title: "Дымоудаление",
      description: "Системы противодымной защиты для коммерческих и промышленных объектов",
      details: ["Расчет по ПБ", "Сертифицированное оборудование", "Интеграция с ОПС", "Приемка МЧС"]
    },
    {
      icon: "Gauge",
      title: "Диспетчеризация и автоматизация",
      description: "Системы мониторинга и управления инженерными сетями здания (BMS)",
      details: ["Единая платформа управления", "Удаленный доступ", "Аналитика потребления", "Аварийные уведомления"]
    },
    {
      icon: "Snowflake",
      title: "Промышленное охлаждение",
      description: "Решения для технологического охлаждения производственных процессов",
      details: ["Чиллеры до -40°C", "Градирни", "Насосные станции", "Гликолевые системы"]
    },
    {
      icon: "Droplets",
      title: "Увлажнение воздуха",
      description: "Системы увлажнения для производств, музеев, архивов, медицинских учреждений",
      details: ["Адиабатическое увлажнение", "Паровое увлажнение", "Форсуночные системы", "Контроль влажности"]
    },
    {
      icon: "Factory",
      title: "Чистые помещения",
      description: "Проектирование и монтаж систем для чистых комнат класса ISO 5-9",
      details: ["HEPA/ULPA фильтрация", "Контроль давления", "Ламинарные потоки", "Валидация"]
    },
    {
      icon: "Zap",
      title: "Модернизация систем",
      description: "Реконструкция устаревших систем с сохранением работоспособности объекта",
      details: ["Аудит существующих систем", "Поэтапная замена", "Работа без остановки бизнеса", "ROI-анализ"]
    },
    {
      icon: "FileCheck",
      title: "Энергоаудит",
      description: "Анализ энергопотребления и разработка мер по повышению энергоэффективности",
      details: ["Тепловизионное обследование", "Замеры потребления", "Отчет с мероприятиями", "Расчет окупаемости"]
    },
    {
      icon: "Briefcase",
      title: "Комплексные поставки",
      description: "Прямые поставки оборудования от производителей со складов в РФ",
      details: ["Daikin, Mitsubishi, Carrier", "Сертифицированное оборудование", "Оптовые цены", "Гарантия производителя"]
    }
  ];

  const industries = [
    {
      icon: "Building2",
      title: "Бизнес-центры",
      description: "Класс А, В, С",
      projects: "340+",
      image: "https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/5ef5137f-3835-4d96-828a-8f2b619a26f0.jpg"
    },
    {
      icon: "ShoppingCart",
      title: "ТРЦ и ритейл",
      description: "Торговые площади",
      projects: "180+",
      image: "https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/972ed610-d567-4a3b-8625-090dda09b19c.jpg"
    },
    {
      icon: "Factory",
      title: "Производство",
      description: "Промышленные объекты",
      projects: "120+",
      image: "https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/326c7e3e-1a92-4296-9fd7-d3e34565d98a.jpg"
    },
    {
      icon: "Hotel",
      title: "Отели и рестораны",
      description: "HoReCa сегмент",
      projects: "95+",
      image: "https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/3d34d930-791c-4bc6-93a9-8a42e6251a2e.jpg"
    },
    {
      icon: "Hospital",
      title: "Медицина",
      description: "Клиники и больницы",
      projects: "85+",
      image: "https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/95854f2a-bb93-47f4-8664-63d93487c536.jpg"
    },
    {
      icon: "Server",
      title: "ЦОД и серверные",
      description: "Дата-центры",
      projects: "65+",
      image: "https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/246fbb98-5451-4929-9763-d70f8e42734c.jpg"
    }
  ];

  const caseStudies = [
    {
      title: "Бизнес-центр \"Москва-Сити\"",
      area: "12 000 м²",
      type: "VRF система Mitsubishi Electric",
      challenge: "Требовалось обеспечить независимый климат в 380 офисах с минимальным энергопотреблением",
      solution: "Установили 48 наружных блоков VRF с системой рекуперации тепла и централизованным управлением",
      result: "Снижение энергопотребления на 43%, окупаемость 2.1 года",
      investment: "32 млн ₽",
      savings: "850 тыс. ₽/мес",
      image: "https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/5ef5137f-3835-4d96-828a-8f2b619a26f0.jpg"
    },
    {
      title: "Производство \"ТехноПром\"",
      area: "8 500 м²",
      type: "Чиллер + Фанкойлы + Вентиляция",
      challenge: "Необходимость поддержания +18°C ±2°C в цехах с высоким тепловыделением",
      solution: "Чиллер 650 кВт с фрикулингом, 120 фанкойлов, приточная установка с рекуперацией",
      result: "Стабильная температура 24/7, уменьшение брака на 18%",
      investment: "18 млн ₽",
      savings: "420 тыс. ₽/мес",
      image: "https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/326c7e3e-1a92-4296-9fd7-d3e34565d98a.jpg"
    },
    {
      title: "ЦОД \"DataPro\"",
      area: "450 м²",
      type: "Прецизионные кондиционеры",
      challenge: "Обеспечение Tier III с резервированием N+1 и точностью ±1°C",
      solution: "6 прецизионных кондиционеров Daikin по схеме 5+1 с диспетчеризацией",
      result: "Uptime 99.98%, полное соответствие Tier III",
      investment: "8.5 млн ₽",
      savings: "Предотвращено простоев на 45 млн ₽/год",
      image: "https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/246fbb98-5451-4929-9763-d70f8e42734c.jpg"
    }
  ];

  const blogPosts = [
    {
      image: "https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/5ef5137f-3835-4d96-828a-8f2b619a26f0.jpg",
      category: "Технологии",
      date: "20 октября 2024",
      title: "VRF vs Чиллер-Фанкойл: что выбрать для бизнес-центра",
      excerpt: "Детальное сравнение двух систем по капзатратам, эксплуатации и срокам окупаемости",
      readTime: "12 мин",
      author: "Игорь Смирнов, главный инженер"
    },
    {
      image: "https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/326c7e3e-1a92-4296-9fd7-d3e34565d98a.jpg",
      category: "Экономика",
      date: "15 октября 2024",
      title: "Как снизить расходы на кондиционирование офиса на 40%",
      excerpt: "7 проверенных способов оптимизации энергопотребления климатических систем",
      readTime: "8 мин",
      author: "Мария Козлова, энергоаудитор"
    },
    {
      image: "https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/246fbb98-5451-4929-9763-d70f8e42734c.jpg",
      category: "Кейсы",
      date: "10 октября 2024",
      title: "Кейс: климат-контроль для производства электроники",
      excerpt: "Как мы реализовали чистую комнату ISO 7 с точностью ±0.5°C и ±2% влажности",
      readTime: "15 мин",
      author: "Дмитрий Петров, руководитель проектов"
    },
    {
      image: "https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/95854f2a-bb93-47f4-8664-63d93487c536.jpg",
      category: "Регуляторика",
      date: "5 октября 2024",
      title: "Новые требования к энергоэффективности зданий в 2024",
      excerpt: "Обзор изменений в СП 50.13330.2020 и как это влияет на выбор систем",
      readTime: "10 мин",
      author: "Анна Волкова, эксперт по стандартам"
    },
    {
      image: "https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/3d34d930-791c-4bc6-93a9-8a42e6251a2e.jpg",
      category: "ЦОД",
      date: "28 сентября 2024",
      title: "Охлаждение серверных: от традиционного до иммерсионного",
      excerpt: "Какие технологии охлаждения ЦОД существуют и когда какую применять",
      readTime: "18 мин",
      author: "Сергей Иванов, специалист по ЦОД"
    },
    {
      image: "https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/972ed610-d567-4a3b-8625-090dda09b19c.jpg",
      category: "Автоматизация",
      date: "22 сентября 2024",
      title: "BMS: как автоматизация снижает эксплуатационные расходы",
      excerpt: "Реальные примеры экономии после внедрения систем диспетчеризации",
      readTime: "11 мин",
      author: "Алексей Морозов, инженер АСУ"
    }
  ];

  const brands = [
    { name: "Daikin", status: "Официальный партнер" },
    { name: "Mitsubishi Electric", status: "Золотой партнер" },
    { name: "Carrier", status: "Авторизованный дилер" },
    { name: "Trane", status: "Сертифицированный партнер" },
    { name: "Fujitsu", status: "Официальный дилер" },
    { name: "Systemair", status: "Партнер" }
  ];

  const certifications = [
    "ISO 9001:2015",
    "ISO 14001:2015",
    "СРО на проектирование",
    "СРО на строительство",
    "Лицензия МЧС",
    "Допуски производителей"
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
                <Icon name="Wind" className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ОПТИ-групп</h1>
                <p className="text-xs text-green-600 font-medium">Промышленные климатические системы</p>
              </div>
            </Link>
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#systems" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Системы</a>
              <a href="#services" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Услуги</a>
              <a href="#cases" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Кейсы</a>
              <a href="#blog" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Блог</a>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm text-gray-500">Звоните прямо сейчас</div>
                  <a href="tel:+74951234567" className="text-lg font-bold text-green-600 hover:text-green-700">+7 (495) 123-45-67</a>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  Оставить заявку
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <section className="relative bg-gradient-to-br from-green-50 via-white to-green-50 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-400 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-5 py-2 rounded-full text-sm font-semibold mb-8">
                <Icon name="Award" size={16} />
                Официальный партнер Daikin, Mitsubishi, Carrier
              </div>
              <h1 className="text-6xl font-black text-gray-900 mb-6 leading-tight">
                Климатические системы для бизнеса
              </h1>
              <p className="text-2xl text-gray-600 mb-8 leading-relaxed">
                Проектирование, монтаж и обслуживание промышленных систем кондиционирования, 
                вентиляции и холодоснабжения. Работаем по 223-ФЗ и 44-ФЗ.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8">
                  <Icon name="FileText" className="mr-2" size={20} />
                  Получить ТКП
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-green-600 text-green-600 hover:bg-green-50 text-lg px-8">
                  <Icon name="Phone" className="mr-2" size={20} />
                  Консультация инженера
                </Button>
              </div>
              <div className="grid grid-cols-4 gap-6 pt-8 border-t-2 border-green-100">
                <div>
                  <div className="text-4xl font-black text-green-600 mb-2">2000+</div>
                  <div className="text-sm text-gray-600 font-medium">Реализованных проектов</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-green-600 mb-2">15 лет</div>
                  <div className="text-sm text-gray-600 font-medium">На рынке B2B</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-green-600 mb-2">24/7</div>
                  <div className="text-sm text-gray-600 font-medium">Сервисная поддержка</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-green-600 mb-2">5 лет</div>
                  <div className="text-sm text-gray-600 font-medium">Гарантия</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/5ef5137f-3835-4d96-828a-8f2b619a26f0.jpg" 
                  alt="Промышленная климатическая система" 
                  className="w-full"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-2xl border-4 border-green-100">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                    <Icon name="TrendingDown" className="text-white" size={32} />
                  </div>
                  <div>
                    <div className="text-3xl font-black text-gray-900">до 60%</div>
                    <div className="text-sm text-gray-600 font-medium">Экономия энергии</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-green-600 mb-3 tracking-wider uppercase">Почему ОПТИ-групп</h2>
            <h3 className="text-5xl font-black text-gray-900 mb-4">Преимущества работы с нами</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Полный цикл работ от проекта до сервисного обслуживания с гарантией результата
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage, index) => (
              <Card key={index} className="border-2 hover:border-green-600 transition-all hover:shadow-2xl group">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon name={advantage.icon} className="text-green-600" size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{advantage.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{advantage.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-gradient-to-r from-green-600 to-green-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-8">
            <div className="text-white">
              <div className="text-sm font-semibold mb-1 opacity-90">Официальные партнеры</div>
              <div className="text-2xl font-black">Работаем с ведущими производителями</div>
            </div>
            <div className="flex flex-wrap items-center gap-8">
              {brands.map((brand, index) => (
                <div key={index} className="text-center">
                  <div className="text-white font-bold text-lg mb-1">{brand.name}</div>
                  <div className="text-green-200 text-xs">{brand.status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="systems" className="py-24 bg-gradient-to-b from-white to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-green-600 mb-3 tracking-wider uppercase">Климатические системы</h2>
            <h3 className="text-5xl font-black text-gray-900 mb-4">Решения для любых задач</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              От офисных мультисплитов до промышленных чиллеров мегаваттной мощности
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-10">
            {systems.map((system, index) => (
              <Card key={index} className="overflow-hidden border-2 hover:border-green-600 transition-all hover:shadow-2xl group">
                <div className="relative overflow-hidden h-80">
                  <img 
                    src={system.image} 
                    alt={system.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-green-400 font-semibold mb-2">{system.subtitle}</div>
                    <h4 className="text-3xl font-black text-white mb-2">{system.title}</h4>
                    <div className="flex items-center gap-4 text-white/90 text-sm">
                      <div className="flex items-center gap-1">
                        <Icon name="Maximize" size={16} />
                        <span>{system.specs}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Clock" size={16} />
                        <span>ROI {system.roi}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-8">
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">{system.description}</p>
                  <div className="grid md:grid-cols-2 gap-3 mb-8">
                    {system.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Icon name="CheckCircle2" className="text-green-600 flex-shrink-0 mt-1" size={18} />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-6 border-t-2 border-gray-100">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Стоимость под ключ</div>
                      <div className="text-3xl font-black text-green-600">{system.price}</div>
                    </div>
                    <Button className="bg-green-600 hover:bg-green-700">
                      Получить расчет
                      <Icon name="ArrowRight" className="ml-2" size={18} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-green-600 mb-3 tracking-wider uppercase">Услуги</h2>
            <h3 className="text-5xl font-black text-gray-900 mb-4">Полный спектр работ</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Все этапы от концепции до круглосуточного сервисного обслуживания
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="border-2 hover:border-green-600 transition-all hover:shadow-xl group">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-green-600 group-hover:to-green-700 transition-all">
                    <Icon name={service.icon} className="text-green-600 group-hover:text-white transition-colors" size={28} />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h4>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <div className="space-y-2 pt-4 border-t border-gray-100">
                    {service.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <Icon name="Check" className="text-green-600" size={14} />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-green-600 mb-3 tracking-wider uppercase">Отрасли</h2>
            <h3 className="text-5xl font-black text-gray-900 mb-4">Наш опыт</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <Card key={index} className="overflow-hidden border-2 hover:border-green-600 transition-all hover:shadow-xl group cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={industry.image} 
                    alt={industry.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-full font-bold">
                    {industry.projects} проектов
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon name={industry.icon} className="text-green-600" size={32} />
                    <h4 className="text-2xl font-bold text-gray-900">{industry.title}</h4>
                  </div>
                  <p className="text-gray-600">{industry.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="cases" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-green-600 mb-3 tracking-wider uppercase">Кейсы</h2>
            <h3 className="text-5xl font-black text-gray-900 mb-4">Реализованные проекты</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Реальные результаты наших клиентов с цифрами окупаемости и экономии
            </p>
          </div>
          <div className="space-y-12">
            {caseStudies.map((caseItem, index) => (
              <Card key={index} className="overflow-hidden border-2 hover:border-green-600 transition-all hover:shadow-2xl">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative h-full min-h-[400px]">
                    <img 
                      src={caseItem.image} 
                      alt={caseItem.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-10">
                    <div className="text-green-600 font-semibold mb-2">{caseItem.type}</div>
                    <h4 className="text-3xl font-black text-gray-900 mb-4">{caseItem.title}</h4>
                    <div className="flex items-center gap-6 mb-6 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Icon name="Maximize" size={16} />
                        <span>{caseItem.area}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="DollarSign" size={16} />
                        <span>{caseItem.investment}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      <div>
                        <div className="font-bold text-gray-900 mb-1">Задача:</div>
                        <p className="text-gray-600">{caseItem.challenge}</p>
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 mb-1">Решение:</div>
                        <p className="text-gray-600">{caseItem.solution}</p>
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 mb-1">Результат:</div>
                        <p className="text-gray-600">{caseItem.result}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-6 border-t-2 border-gray-100">
                      <div className="bg-green-50 p-4 rounded-xl">
                        <div className="text-sm text-gray-600 mb-1">Экономия в месяц</div>
                        <div className="text-2xl font-black text-green-600">{caseItem.savings}</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-xl">
                        <div className="text-sm text-gray-600 mb-1">Окупаемость</div>
                        <div className="text-2xl font-black text-green-600">{caseItem.roi}</div>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="py-24 bg-gradient-to-b from-white to-green-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="text-sm font-bold text-green-600 mb-3 tracking-wider uppercase">Блог</h2>
              <h3 className="text-5xl font-black text-gray-900">Экспертные статьи</h3>
            </div>
            <Button variant="outline" className="border-2 border-green-600 text-green-600 hover:bg-green-50">
              Все статьи
              <Icon name="ArrowRight" className="ml-2" size={18} />
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogPosts.map((post, index) => (
              <Card key={index} className="overflow-hidden border-2 hover:shadow-2xl transition-all group cursor-pointer">
                <div className="relative overflow-hidden h-56">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white text-green-600 px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                      {post.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Icon name="Calendar" size={14} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Clock" size={14} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors leading-tight">
                    {post.title}
                  </h4>
                  <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">{post.author}</span>
                    <div className="flex items-center text-green-600 font-bold group-hover:gap-2 transition-all">
                      Читать
                      <Icon name="ArrowRight" className="ml-1" size={16} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-5xl font-black mb-6">Готовы обсудить ваш проект?</h2>
            <p className="text-2xl text-green-100 mb-8">
              Оставьте заявку - наш инженер подготовит техническое решение и коммерческое предложение в течение 24 часов
            </p>
          </div>
          <div className="bg-white rounded-3xl p-12 max-w-3xl mx-auto shadow-2xl">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <input 
                type="text" 
                placeholder="Ваше имя"
                className="px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-green-600 outline-none text-gray-900 text-lg"
              />
              <input 
                type="text" 
                placeholder="Компания"
                className="px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-green-600 outline-none text-gray-900 text-lg"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <input 
                type="tel" 
                placeholder="Телефон"
                className="px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-green-600 outline-none text-gray-900 text-lg"
              />
              <input 
                type="email" 
                placeholder="Email"
                className="px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-green-600 outline-none text-gray-900 text-lg"
              />
            </div>
            <textarea 
              placeholder="Опишите вашу задачу: площадь объекта, тип помещений, требования..."
              rows={4}
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-green-600 outline-none text-gray-900 text-lg mb-6"
            />
            <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white text-xl py-6">
              <Icon name="Send" className="mr-2" size={20} />
              Получить ТКП в течение 24 часов
            </Button>
            <p className="text-xs text-gray-500 mt-6 text-center">
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности. 
              Мы не передаем данные третьим лицам.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-black text-gray-900 mb-4">Сертификаты и допуски</h3>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white px-8 py-4 rounded-xl shadow-md border-2 border-gray-100 hover:border-green-600 transition-all">
                <span className="font-bold text-gray-800">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <Icon name="Wind" className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">ОПТИ-групп</h3>
                  <p className="text-xs text-gray-400">Климатические системы</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Профессиональное проектирование, монтаж и сервисное обслуживание 
                промышленных климатических систем для бизнеса с 2009 года.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Icon name="Phone" size={18} className="text-green-500" />
                  <a href="tel:+74951234567" className="text-lg font-bold hover:text-green-400">+7 (495) 123-45-67</a>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Mail" size={18} className="text-green-500" />
                  <a href="mailto:info@opti-group.ru" className="hover:text-green-400">info@opti-group.ru</a>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="MapPin" size={18} className="text-green-500" />
                  <span className="text-gray-400">Москва, ул. Промышленная, 7</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">Системы</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-green-400 transition-colors">VRF/VRV системы</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Чиллеры + Фанкойлы</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Прецизионные кондиционеры</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Канальные системы</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">Услуги</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-green-400 transition-colors">Проектирование</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Монтаж</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Сервис</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Модернизация</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">Компания</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-green-400 transition-colors">О компании</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Кейсы</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Блог</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Контакты</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-400">© 2024 ОПТИ-групп. Все права защищены.</p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                <Icon name="Send" size={20} />
              </a>
              <a href="#" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                <Icon name="Phone" size={20} />
              </a>
              <a href="#" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                <Icon name="Mail" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OptiGroup;
