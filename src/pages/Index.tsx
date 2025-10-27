import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Спасибо! Мы свяжемся с вами в ближайшее время.");
    setFormData({ name: "", phone: "", message: "" });
  };

  const services = [
    {
      icon: "Paintbrush",
      image: "https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/d0a5d561-b404-4d9e-a155-025dc94b915c.jpg",
      title: "Покраска деревянного дома",
      description: "Профессиональная покраска с использованием качественных материалов. Защита дерева от влаги, УФ-лучей и вредителей.",
      features: ["Премиум краски", "Многослойное покрытие", "Гарантия 10 лет"],
      price: "от 450 ₽/м²"
    },
    {
      icon: "Drill",
      image: "https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/3f7a468c-f693-41ae-9193-fd1e6e7b3764.jpg",
      title: "Шлифовка дома",
      description: "Тщательная шлифовка поверхностей перед покраской. Удаление старого покрытия, выравнивание структуры дерева.",
      features: ["Профессиональное оборудование", "Идеально гладкая поверхность", "Подготовка к покраске"],
      price: "от 200 ₽/м²"
    },
    {
      icon: "Thermometer",
      image: "https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/f18a09fc-92b3-4995-9d22-83f7814f4002.jpg",
      title: "Теплый шов",
      description: "Утепление межвенцовых швов современными материалами. Защита от продувания и теплопотерь.",
      features: ["Экологичные материалы", "Защита от продувания", "Снижение теплопотерь"],
      price: "от 350 ₽/п.м"
    },
    {
      icon: "DoorOpen",
      image: "https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/05692f6d-ff5f-4c33-89dc-a012f885bbb1.jpg",
      title: "Осада окон и дверей",
      description: "Профессиональная установка и отделка оконных и дверных проемов. Герметизация и утепление.",
      features: ["Точная подгонка", "Герметизация", "Защита от сквозняков"],
      price: "от 3500 ₽/проем"
    },
  ];

  const whyUs = [
    { 
      icon: "Award", 
      title: "Опыт более 10 лет", 
      description: "Выполнили более 200 проектов по всей Московской области" 
    },
    { 
      icon: "Shield", 
      title: "Гарантия до 10 лет", 
      description: "Официальная гарантия на все виды работ и материалы" 
    },
    { 
      icon: "Users", 
      title: "Профессиональная бригада", 
      description: "Квалифицированные мастера с многолетним опытом" 
    },
    { 
      icon: "CheckCircle", 
      title: "Качественные материалы", 
      description: "Работаем только с проверенными европейскими производителями" 
    },
  ];

  const portfolio = [
    {
      image: "https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/f9465c30-980c-4ed1-9747-4ffa52343dd0.jpg",
      title: "Отделка дома из бруса",
      area: "350 м²",
      location: "Московская область",
    },
    {
      image: "https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/00310f5e-aa33-4b0e-b965-9f1b9ccc6ff8.jpg",
      title: "Внутренняя отделка",
      area: "280 м²",
      location: "Подмосковье",
    },
    {
      image: "https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/e3c116a3-2978-4751-89eb-73b5d87ad36a.jpg",
      title: "Покраска сруба",
      area: "420 м²",
      location: "Москва",
    },
    {
      image: "https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/551227cf-efd7-45c4-98b9-79c678eed3e3.jpg",
      title: "Комплексная отделка",
      area: "500 м²",
      location: "Московская область",
    },
  ];

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">Arte Madera</div>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#services" className="hover:text-primary transition-colors">Услуги</a>
            <a href="#why-us" className="hover:text-primary transition-colors">Преимущества</a>
            <a href="#portfolio" className="hover:text-primary transition-colors">Проекты</a>
            <a href="#about" className="hover:text-primary transition-colors">О нас</a>
            <a href="#contacts" className="hover:text-primary transition-colors">Контакты</a>
            <Button className="bg-primary hover:bg-accent">
              <Icon name="Phone" className="mr-2" size={18} />
              +7 (495) 123-45-67
            </Button>
          </div>
          <Button variant="ghost" className="md:hidden">
            <Icon name="Menu" size={24} />
          </Button>
        </nav>
      </header>

      <section className="pt-32 pb-20 bg-gradient-to-b from-secondary to-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full mb-8">
                <Icon name="Sparkles" size={20} />
                <span className="font-semibold">Профессиональная отделка деревянных домов</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                <span className="text-foreground">Защита и красота вашего </span>
                <span className="text-primary">деревянного дома</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Покраска, шлифовка, теплый шов и осада для окон и дверей. Работаем с премиум материалами. Гарантия до 10 лет.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-12">
                <Button size="lg" className="bg-primary hover:bg-accent text-lg px-8 py-6 h-auto">
                  <Icon name="Phone" className="mr-2" size={22} />
                  Получить консультацию
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto border-2">
                  <Icon name="Briefcase" className="mr-2" size={22} />
                  Наши услуги
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-4 rounded-2xl">
                    <Icon name="Home" className="text-primary" size={32} />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-1">500+</div>
                    <div className="text-muted-foreground">Домов защищено</div>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-4 rounded-2xl">
                    <Icon name="Award" className="text-primary" size={32} />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-1">10 лет</div>
                    <div className="text-muted-foreground">Опыта работы</div>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-4 rounded-2xl">
                    <Icon name="ThumbsUp" className="text-primary" size={32} />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-1">98%</div>
                    <div className="text-muted-foreground">Довольных клиентов</div>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-4 rounded-2xl">
                    <Icon name="Headphones" className="text-primary" size={32} />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-1">24/7</div>
                    <div className="text-muted-foreground">Поддержка</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-lg shadow-xl h-64">
                  <img
                    src="https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/f9465c30-980c-4ed1-9747-4ffa52343dd0.jpg"
                    alt="Деревянный дом 1"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="relative overflow-hidden rounded-lg shadow-xl h-80">
                  <img
                    src="https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/e3c116a3-2978-4751-89eb-73b5d87ad36a.jpg"
                    alt="Деревянный дом 3"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative overflow-hidden rounded-lg shadow-xl h-80">
                  <img
                    src="https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/00310f5e-aa33-4b0e-b965-9f1b9ccc6ff8.jpg"
                    alt="Деревянный дом 2"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="relative overflow-hidden rounded-lg shadow-xl h-64">
                  <img
                    src="https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/551227cf-efd7-45c4-98b9-79c678eed3e3.jpg"
                    alt="Деревянный дом 4"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-gradient-to-b from-white to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full mb-6">
              <Icon name="Briefcase" size={20} />
              <span className="font-semibold">Наши услуги</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Комплексные решения для вашего дома
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Мы предлагаем полный спектр услуг по отделке и защите деревянных домов. 
              Работаем с премиальными материалами и даём гарантию на все виды работ.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                    <Icon name={service.icon} className="text-primary" size={20} />
                    <span className="font-semibold text-sm">{service.price}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="bg-primary/10 p-1.5 rounded-full">
                          <Icon name="Check" className="text-primary" size={16} />
                        </div>
                        <span className="text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full bg-primary hover:bg-accent group-hover:shadow-lg transition-all">
                    Заказать услугу
                    <Icon name="ArrowRight" className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Card className="inline-block bg-gradient-to-r from-primary to-accent text-white p-8 shadow-xl">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="bg-white/20 p-4 rounded-full">
                  <Icon name="Gift" size={40} />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold mb-2">Акция! Скидка 15% при заказе комплекса услуг</h3>
                  <p className="text-white/90">Закажите шлифовку + покраску и получите выгоду до 50 000 ₽</p>
                </div>
                <Button size="lg" variant="secondary" className="whitespace-nowrap font-bold">
                  Узнать подробнее
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="why-us" className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Почему выбирают нас</h2>
            <p className="text-xl text-muted-foreground">
              Наши преимущества и гарантии качества
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyUs.map((item, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-4 p-0">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Icon name={item.icon} className="text-primary" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Наши проекты</h2>
            <p className="text-xl text-muted-foreground">
              Примеры выполненных работ с гарантией качества
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolio.map((project, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="p-6 space-y-2">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Icon name="Home" size={16} className="mr-2" />
                    {project.area}
                  </div>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Icon name="MapPin" size={16} className="mr-2" />
                    {project.location}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="border-2">
              <Icon name="Images" className="mr-2" size={20} />
              Смотреть все проекты
            </Button>
          </div>
        </div>
      </section>

      <section id="about" className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6">Профессионалы деревянного домостроения</h2>
              <div className="space-y-4 text-lg">
                <p>
                  <strong>Arte Madera</strong> — команда профессионалов с более чем 10-летним опытом в отделке деревянных домов. 
                  Мы специализируемся на комплексной защите и декоративной отделке деревянных конструкций.
                </p>
                <p>
                  За годы работы мы выполнили более 200 проектов в Москве и Московской области. Каждый дом для нас — это 
                  не просто работа, а возможность создать уникальное пространство, которое будет служить десятилетиями.
                </p>
                <p>
                  Мы используем только качественные европейские материалы и современное оборудование. На все работы 
                  предоставляем официальную гарантию до 10 лет.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold mb-2">10+</div>
                <div className="text-lg opacity-90">лет на рынке</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">200+</div>
                <div className="text-lg opacity-90">выполненных проектов</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">10</div>
                <div className="text-lg opacity-90">лет гарантии</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Свяжитесь с нами</h2>
              <p className="text-xl text-muted-foreground">
                Оставьте заявку и получите бесплатную консультацию
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <Card className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Ваше имя</label>
                    <Input
                      placeholder="Иван Иванов"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Телефон</label>
                    <Input
                      type="tel"
                      placeholder="+7 (999) 123-45-67"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Сообщение</label>
                    <Textarea
                      placeholder="Расскажите о вашем проекте..."
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-accent" size="lg">
                    Отправить заявку
                  </Button>
                </form>
              </Card>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Phone" className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Телефон</h3>
                    <a href="tel:+74951234567" className="text-muted-foreground hover:text-primary">
                      +7 (495) 123-45-67
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Mail" className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email</h3>
                    <a href="mailto:info@artemadera.ru" className="text-muted-foreground hover:text-primary">
                      info@artemadera.ru
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="MapPin" className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Адрес</h3>
                    <p className="text-muted-foreground">
                      Москва и Московская область
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Clock" className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Режим работы</h3>
                    <p className="text-muted-foreground">
                      Пн-Вс: 9:00 - 21:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-primary">Arte Madera</h3>
              <p className="text-gray-300">
                Профессиональная отделка деревянных домов с гарантией качества
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Услуги</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#services" className="hover:text-primary">Покраска дома</a></li>
                <li><a href="#services" className="hover:text-primary">Шлифовка</a></li>
                <li><a href="#services" className="hover:text-primary">Теплый шов</a></li>
                <li><a href="#services" className="hover:text-primary">Установка окон</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Компания</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#about" className="hover:text-primary">О нас</a></li>
                <li><a href="#portfolio" className="hover:text-primary">Наши работы</a></li>
                <li><a href="#why-us" className="hover:text-primary">Преимущества</a></li>
                <li><a href="#contacts" className="hover:text-primary">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <ul className="space-y-2 text-gray-300">
                <li>+7 (495) 123-45-67</li>
                <li>info@artemadera.ru</li>
                <li>Москва и МО</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Arte Madera. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;