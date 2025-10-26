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
      icon: "PaintBucket",
      title: "Покраска деревянного дома",
      description: "Профессиональная покраска с использованием качественных материалов. Защита дерева от влаги, УФ-лучей и вредителей.",
    },
    {
      icon: "Hammer",
      title: "Шлифовка дома",
      description: "Тщательная шлифовка поверхностей перед покраской. Удаление старого покрытия, выравнивание структуры дерева.",
    },
    {
      icon: "Flame",
      title: "Теплый шов",
      description: "Утепление межвенцовых швов современными материалами. Защита от продувания и теплопотерь.",
    },
    {
      icon: "Square",
      title: "Осада окон и дверей",
      description: "Профессиональная установка и отделка оконных и дверных проемов. Герметизация и утепление.",
    },
  ];

  const advantages = [
    { icon: "Award", title: "Опыт более 10 лет", description: "Выполнили более 200 проектов" },
    { icon: "Shield", title: "Гарантия до 10 лет", description: "На все виды работ" },
    { icon: "Users", title: "Профессиональная бригада", description: "Квалифицированные мастера" },
    { icon: "CheckCircle", title: "Качественные материалы", description: "Только проверенные производители" },
  ];

  const portfolio = [
    {
      image: "https://cdn.poehali.dev/projects/6fcd73e5-b9b9-4906-9da8-8604cb9ca70f/files/515865e8-ceb9-4e97-8094-801f523116d8.jpg",
      title: "Отделка дома из бруса",
      location: "Московская область",
    },
    {
      image: "https://cdn.poehali.dev/projects/6fcd73e5-b9b9-4906-9da8-8604cb9ca70f/files/515865e8-ceb9-4e97-8094-801f523116d8.jpg",
      title: "Покраска фасада",
      location: "Москва",
    },
    {
      image: "https://cdn.poehali.dev/projects/6fcd73e5-b9b9-4906-9da8-8604cb9ca70f/files/515865e8-ceb9-4e97-8094-801f523116d8.jpg",
      title: "Внутренняя отделка",
      location: "Подмосковье",
    },
  ];

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">Arte Madera</div>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#services" className="hover:text-primary transition-colors">Услуги</a>
            <a href="#portfolio" className="hover:text-primary transition-colors">Портфолио</a>
            <a href="#about" className="hover:text-primary transition-colors">О компании</a>
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

      <section className="pt-24 pb-16 bg-gradient-to-b from-secondary to-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                Отделка деревянных домов в Москве и МО
              </h1>
              <p className="text-xl text-muted-foreground">
                Профессиональная покраска, шлифовка и защита вашего дома. Гарантия до 10 лет.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-primary hover:bg-accent">
                  Получить консультацию
                </Button>
                <Button size="lg" variant="outline">
                  <Icon name="Calculator" className="mr-2" size={20} />
                  Рассчитать стоимость
                </Button>
              </div>
              <div className="flex flex-wrap gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <Icon name="Award" className="text-primary" size={24} />
                  <span className="font-semibold">10+ лет опыта</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Home" className="text-primary" size={24} />
                  <span className="font-semibold">200+ домов</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Star" className="text-primary" size={24} />
                  <span className="font-semibold">Гарантия 10 лет</span>
                </div>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <img
                src="https://cdn.poehali.dev/projects/6fcd73e5-b9b9-4906-9da8-8604cb9ca70f/files/515865e8-ceb9-4e97-8094-801f523116d8.jpg"
                alt="Деревянный дом"
                className="rounded-lg shadow-2xl w-full object-cover h-[500px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Наши услуги</h2>
            <p className="text-xl text-muted-foreground">
              Полный комплекс работ по отделке деревянных домов
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name={service.icon} className="text-primary" size={32} />
                  </div>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                  <Button variant="link" className="p-0 h-auto text-primary">
                    Подробнее
                    <Icon name="ArrowRight" className="ml-2" size={16} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Наши работы</h2>
            <p className="text-xl text-muted-foreground">
              Примеры выполненных проектов
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {portfolio.map((project, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <div className="flex items-center text-muted-foreground">
                    <Icon name="MapPin" size={16} className="mr-2" />
                    {project.location}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="border-2">
              Смотреть все работы
              <Icon name="ArrowRight" className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </section>

      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Почему выбирают нас</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Arte Madera - это команда профессионалов с многолетним опытом в отделке деревянных домов
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="text-center space-y-4 p-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Icon name={advantage.icon} className="text-primary" size={40} />
                </div>
                <h3 className="text-xl font-bold">{advantage.title}</h3>
                <p className="text-muted-foreground">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 bg-gradient-to-b from-secondary to-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">Свяжитесь с нами</h2>
              <p className="text-xl text-muted-foreground">
                Оставьте заявку, и мы свяжемся с вами в течение 15 минут
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="Phone" className="text-primary" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold">Телефон</div>
                    <a href="tel:+74951234567" className="text-primary hover:underline">
                      +7 (495) 123-45-67
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="Mail" className="text-primary" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <a href="mailto:info@artemadera.ru" className="text-primary hover:underline">
                      info@artemadera.ru
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="MapPin" className="text-primary" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold">Адрес</div>
                    <div className="text-muted-foreground">Москва и Московская область</div>
                  </div>
                </div>
              </div>
            </div>
            <Card className="shadow-lg">
              <CardContent className="p-8">
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
                  <p className="text-xs text-muted-foreground text-center">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold mb-4 text-white">Arte Madera</div>
              <p className="text-gray-300">
                Профессиональная отделка деревянных домов в Москве и МО
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Услуги</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#services" className="hover:text-white transition-colors">
                    Покраска дома
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-white transition-colors">
                    Шлифовка дома
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-white transition-colors">
                    Теплый шов
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-white transition-colors">
                    Осада окон
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Компания</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    О нас
                  </a>
                </li>
                <li>
                  <a href="#portfolio" className="hover:text-white transition-colors">
                    Портфолио
                  </a>
                </li>
                <li>
                  <a href="#contacts" className="hover:text-white transition-colors">
                    Контакты
                  </a>
                </li>
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
            <p>© 2024 Arte Madera. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;