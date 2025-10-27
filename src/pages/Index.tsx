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

  const [calculatorData, setCalculatorData] = useState({
    area: "",
    service: "painting",
    additional: [] as string[]
  });

  const [showCalculator, setShowCalculator] = useState(false);

  const calculatePrice = () => {
    const areaNum = parseFloat(calculatorData.area) || 0;
    let basePrice = 0;
    
    switch(calculatorData.service) {
      case "painting": basePrice = 450; break;
      case "sanding": basePrice = 200; break;
      case "warmseam": basePrice = 350; break;
      case "complex": basePrice = 800; break;
    }
    
    let total = areaNum * basePrice;
    
    if (calculatorData.additional.includes("antiseptic")) total += areaNum * 150;
    if (calculatorData.additional.includes("primer")) total += areaNum * 100;
    if (calculatorData.additional.includes("express")) total += total * 0.2;
    
    return Math.round(total);
  };

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

  const whyUsSection = {
    badge: "Наши преимущества",
    title: "С нами надёжно и выгодно",
    subtitle: "Более 500 довольных клиентов доверили нам свои деревянные дома. Мы гордимся качеством работы и репутацией."
  };

  const whyUs = [
    { 
      icon: "Award", 
      title: "Опыт более 10 лет", 
      description: "Выполнили более 200 проектов по всей Московской области",
      highlight: "200+ проектов"
    },
    { 
      icon: "Shield", 
      title: "Гарантия до 10 лет", 
      description: "Официальная гарантия на все виды работ и материалы",
      highlight: "10 лет гарантии"
    },
    { 
      icon: "Users", 
      title: "Профессиональная бригада", 
      description: "Квалифицированные мастера с многолетним опытом",
      highlight: "Сертифицированы"
    },
    { 
      icon: "Palette", 
      title: "Премиум материалы", 
      description: "Работаем только с проверенными европейскими производителями",
      highlight: "Европа"
    },
    { 
      icon: "Clock", 
      title: "Точные сроки", 
      description: "Строго соблюдаем договорные сроки выполнения работ",
      highlight: "В срок"
    },
    { 
      icon: "Wallet", 
      title: "Прозрачное ценообразование", 
      description: "Фиксированная цена в договоре, без скрытых доплат",
      highlight: "Без доплат"
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
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button 
                  size="lg" 
                  onClick={() => setShowCalculator(true)}
                  className="bg-gradient-to-r from-primary to-accent hover:shadow-2xl hover:scale-105 transition-all text-lg px-10 py-7 h-auto font-bold group"
                >
                  <Icon name="Calculator" className="mr-3 group-hover:scale-110 transition-transform" size={24} />
                  Рассчитать стоимость
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-10 py-7 h-auto border-2 border-primary hover:bg-primary hover:text-white transition-all font-bold group"
                >
                  <Icon name="Briefcase" className="mr-3 group-hover:scale-110 transition-transform" size={24} />
                  Наши услуги
                </Button>
              </div>

              <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-3xl p-6 border-2 border-primary/20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-2xl mb-3 shadow-lg">
                      <Icon name="Home" className="text-white" size={26} />
                    </div>
                    <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1">500+</div>
                    <div className="text-xs md:text-sm font-bold text-foreground">Домов защищено</div>
                  </div>

                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-accent to-primary rounded-2xl mb-3 shadow-lg">
                      <Icon name="Award" className="text-white" size={26} />
                    </div>
                    <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-1">10 лет</div>
                    <div className="text-xs md:text-sm font-bold text-foreground">Опыта работы</div>
                  </div>

                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-2xl mb-3 shadow-lg">
                      <Icon name="Star" className="text-white" size={26} />
                    </div>
                    <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1">4.9</div>
                    <div className="text-xs md:text-sm font-bold text-foreground">Рейтинг Яндекс</div>
                  </div>

                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-accent to-primary rounded-2xl mb-3 shadow-lg">
                      <Icon name="ThumbsUp" className="text-white" size={26} />
                    </div>
                    <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-1">98%</div>
                    <div className="text-xs md:text-sm font-bold text-foreground">Рекомендуют</div>
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

      {showCalculator && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowCalculator(false)}>
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Калькулятор стоимости</h2>
                  <p className="text-muted-foreground">Рассчитайте примерную стоимость работ</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setShowCalculator(false)}>
                  <Icon name="X" size={24} />
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-3">Площадь дома (м²)</label>
                  <Input
                    type="number"
                    placeholder="150"
                    value={calculatorData.area}
                    onChange={(e) => setCalculatorData({ ...calculatorData, area: e.target.value })}
                    className="h-14 text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3">Вид работ</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { value: "painting", label: "Покраска", price: "450 ₽/м²", icon: "Paintbrush" },
                      { value: "sanding", label: "Шлифовка", price: "200 ₽/м²", icon: "Drill" },
                      { value: "warmseam", label: "Теплый шов", price: "350 ₽/п.м", icon: "Thermometer" },
                      { value: "complex", label: "Комплекс работ", price: "800 ₽/м²", icon: "Layers" }
                    ].map((service) => (
                      <Card
                        key={service.value}
                        className={`cursor-pointer transition-all hover:shadow-lg ${
                          calculatorData.service === service.value 
                            ? 'border-2 border-primary bg-primary/5' 
                            : 'border-2 border-transparent'
                        }`}
                        onClick={() => setCalculatorData({ ...calculatorData, service: service.value })}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              calculatorData.service === service.value 
                                ? 'bg-primary text-white' 
                                : 'bg-primary/10 text-primary'
                            }`}>
                              <Icon name={service.icon} size={24} />
                            </div>
                            <div className="flex-1">
                              <div className="font-bold">{service.label}</div>
                              <div className="text-sm text-muted-foreground">{service.price}</div>
                            </div>
                            {calculatorData.service === service.value && (
                              <Icon name="CheckCircle" className="text-primary" size={24} />
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3">Дополнительно</label>
                  <div className="space-y-3">
                    {[
                      { value: "antiseptic", label: "Антисептическая обработка", price: "+150 ₽/м²" },
                      { value: "primer", label: "Грунтовка", price: "+100 ₽/м²" },
                      { value: "express", label: "Срочное выполнение (7 дней)", price: "+20%" }
                    ].map((addon) => (
                      <Card
                        key={addon.value}
                        className={`cursor-pointer transition-all hover:shadow-lg ${
                          calculatorData.additional.includes(addon.value)
                            ? 'border-2 border-accent bg-accent/5'
                            : 'border-2 border-transparent'
                        }`}
                        onClick={() => {
                          const newAdditional = calculatorData.additional.includes(addon.value)
                            ? calculatorData.additional.filter(a => a !== addon.value)
                            : [...calculatorData.additional, addon.value];
                          setCalculatorData({ ...calculatorData, additional: newAdditional });
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                                calculatorData.additional.includes(addon.value)
                                  ? 'bg-accent border-accent'
                                  : 'border-muted-foreground'
                              }`}>
                                {calculatorData.additional.includes(addon.value) && (
                                  <Icon name="Check" className="text-white" size={16} />
                                )}
                              </div>
                              <span className="font-semibold">{addon.label}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{addon.price}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 border-2 border-primary/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-semibold">Примерная стоимость:</span>
                    <div className="text-right">
                      <div className="text-4xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {calculatorData.area ? calculatePrice().toLocaleString() : '0'} ₽
                      </div>
                      {calculatorData.area && (
                        <div className="text-sm text-muted-foreground mt-1">
                          ≈ {Math.round(calculatePrice() / parseFloat(calculatorData.area))} ₽/м²
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    * Точная стоимость рассчитывается после бесплатного выезда замерщика
                  </p>
                </div>

                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-2xl text-lg py-6 h-auto font-bold"
                  onClick={() => {
                    setShowCalculator(false);
                    document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Icon name="Send" className="mr-2" size={22} />
                  Оставить заявку
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full mb-6">
              <Icon name="Layers" size={20} />
              <span className="font-semibold">Технология работы</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Как мы работаем
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Проверенная технология в 5 этапов — от консультации до гарантийного обслуживания
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  number: "01",
                  icon: "Phone",
                  title: "Консультация и выезд замерщика",
                  description: "Бесплатный выезд специалиста на объект. Осмотр дома, консультация по материалам и технологиям. Составление предварительной сметы.",
                  time: "1-2 дня"
                },
                {
                  number: "02",
                  icon: "FileText",
                  title: "Составление договора",
                  description: "Фиксированная цена в договоре, детальная смета работ. Прозрачные условия оплаты и график выполнения работ.",
                  time: "1 день"
                },
                {
                  number: "03",
                  icon: "Hammer",
                  title: "Подготовка поверхностей",
                  description: "Шлифовка стен профессиональным оборудованием. Удаление старого покрытия, очистка от пыли и загрязнений. Обработка антисептиками.",
                  time: "3-7 дней"
                },
                {
                  number: "04",
                  icon: "Paintbrush",
                  title: "Основные работы",
                  description: "Нанесение грунта и защитных составов. Покраска в 2-3 слоя с соблюдением технологии. Герметизация швов, осада проёмов.",
                  time: "5-10 дней"
                },
                {
                  number: "05",
                  icon: "CheckCircle",
                  title: "Сдача и гарантия",
                  description: "Подписание акта выполненных работ. Выдача гарантийного талона до 10 лет. Консультации по уходу за покрытием.",
                  time: "1 день"
                }
              ].map((step, index) => (
                <Card key={index} className="relative overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="text-7xl font-black text-primary/10 absolute -top-4 -left-2">
                            {step.number}
                          </div>
                          <div className="relative w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                            <Icon name={step.icon} className="text-white" size={32} />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h3 className="text-2xl font-bold">{step.title}</h3>
                          <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full whitespace-nowrap">
                            <Icon name="Clock" size={16} className="text-primary" />
                            <span className="text-sm font-semibold text-primary">{step.time}</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed text-base">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-secondary/30 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full mb-6">
              <Icon name="Palette" size={20} />
              <span className="font-semibold">Материалы</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Работаем с лучшими европейскими брендами
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Используем только сертифицированные материалы с доказанной долговечностью
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: "Shield",
                title: "Немецкие краски",
                brand: "Remmers, Zobel",
                features: ["Защита до 15 лет", "Экологичность", "UV-фильтры"],
                badge: "Премиум"
              },
              {
                icon: "Droplet",
                title: "Герметики для швов",
                brand: "Remmers Acryl",
                features: ["Эластичность", "Морозостойкость", "Паропроницаемость"],
                badge: "Проверено"
              },
              {
                icon: "Sparkles",
                title: "Антисептики",
                brand: "Neomid, Teknos",
                features: ["Защита от грибка", "Огнебиозащита", "Глубокое проникновение"],
                badge: "Эффективно"
              }
            ].map((material, index) => (
              <Card key={index} className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2">
                <div className="absolute top-4 right-4">
                  <div className="bg-accent text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    {material.badge}
                  </div>
                </div>

                <CardContent className="p-8 space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                    <Icon name={material.icon} className="text-white" size={36} />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-2">{material.title}</h3>
                    <p className="text-primary font-semibold">{material.brand}</p>
                  </div>

                  <div className="space-y-3">
                    {material.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="bg-primary/10 p-1.5 rounded-full">
                          <Icon name="Check" className="text-primary" size={14} />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="inline-block bg-primary/5 border-2 border-primary/20 p-6">
              <div className="flex items-center gap-4">
                <Icon name="Award" className="text-primary" size={40} />
                <div className="text-left">
                  <div className="font-bold text-lg mb-1">Все материалы сертифицированы</div>
                  <div className="text-sm text-muted-foreground">Предоставляем документы и гарантию качества</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary via-accent to-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-white/20 text-white px-6 py-3 rounded-full mb-6 backdrop-blur-sm">
                <Icon name="Sparkles" size={20} />
                <span className="font-semibold">Бесплатная консультация</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Получите расчёт стоимости за 15 минут
              </h2>
              <p className="text-xl text-white/90">
                Оставьте заявку и получите бесплатный выезд специалиста для осмотра объекта
              </p>
            </div>

            <Card className="p-8 md:p-12 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold flex items-center gap-2">
                      <Icon name="User" size={16} className="text-primary" />
                      Ваше имя
                    </label>
                    <Input
                      placeholder="Иван Петров"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="h-12 text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold flex items-center gap-2">
                      <Icon name="Phone" size={16} className="text-primary" />
                      Телефон
                    </label>
                    <Input
                      type="tel"
                      placeholder="+7 (999) 123-45-67"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="h-12 text-base"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <Icon name="MessageSquare" size={16} className="text-primary" />
                    Комментарий
                  </label>
                  <Textarea
                    placeholder="Опишите вашу задачу: площадь дома, виды работ, сроки..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="min-h-[120px] text-base"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full sm:w-auto bg-primary hover:bg-accent text-lg px-12 py-6 h-auto shadow-lg"
                  >
                    <Icon name="Send" className="mr-2" size={20} />
                    Получить расчёт
                  </Button>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Icon name="Shield" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Мы не передаём ваши данные третьим лицам</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">15 мин</div>
                    <div className="text-sm text-muted-foreground">Время ответа</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">Бесплатно</div>
                    <div className="text-sm text-muted-foreground">Выезд и замер</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">3 года</div>
                    <div className="text-sm text-muted-foreground">Гарантия</div>
                  </div>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <section id="why-us" className="py-24 bg-gradient-to-br from-white via-secondary/30 to-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-8 py-3 rounded-full mb-8 shadow-lg">
              <Icon name="Star" size={22} />
              <span className="font-bold text-base">{whyUsSection.badge}</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              {whyUsSection.title}
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              {whyUsSection.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {whyUs.map((item, index) => (
              <Card 
                key={index} 
                className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 hover:border-primary bg-white/80 backdrop-blur-sm"
              >
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full group-hover:scale-150 transition-transform duration-700" />
                <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full group-hover:scale-125 transition-transform duration-700" />
                
                <CardContent className="relative p-10 space-y-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary via-primary to-accent rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <Icon name={item.icon} className="text-white" size={40} />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      {item.highlight}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-5 border-t-2 border-primary/20 group-hover:border-primary/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary/20 transition-colors">
                        <Icon name="CheckCircle" className="text-primary" size={18} />
                      </div>
                      <span className="font-bold text-primary text-sm">Гарантировано</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 bg-gradient-to-br from-primary/5 to-transparent border-2 border-primary/20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Icon name="TrendingUp" className="text-primary" size={32} />
              </div>
              <div className="text-4xl font-bold text-primary mb-2">200+</div>
              <div className="text-muted-foreground font-medium">Завершённых проектов за 2024 год</div>
            </Card>

            <Card className="text-center p-8 bg-gradient-to-br from-accent/5 to-transparent border-2 border-accent/20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                <Icon name="Users" className="text-accent" size={32} />
              </div>
              <div className="text-4xl font-bold text-accent mb-2">98%</div>
              <div className="text-muted-foreground font-medium">Клиентов рекомендуют нас друзьям</div>
            </Card>

            <Card className="text-center p-8 bg-gradient-to-br from-primary/5 to-transparent border-2 border-primary/20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Icon name="Award" className="text-primary" size={32} />
              </div>
              <div className="text-4xl font-bold text-primary mb-2">10 лет</div>
              <div className="text-muted-foreground font-medium">Гарантия на покрасочные работы</div>
            </Card>
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

      <section className="py-20 bg-gradient-to-b from-white to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full mb-6">
              <Icon name="MessageSquare" size={20} />
              <span className="font-semibold">Отзывы клиентов</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Что говорят наши клиенты
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Более 500 довольных владельцев деревянных домов рекомендуют нас
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Михаил Соколов",
                location: "Московская область",
                rating: 5,
                text: "Отличная работа! Покрасили дом из бруса 200м². Ребята работали быстро и аккуратно. Цвет получился именно таким, каким мы хотели. Прошло уже 2 года — покрытие как новое.",
                date: "Октябрь 2023"
              },
              {
                name: "Елена Морозова",
                location: "Подмосковье",
                rating: 5,
                text: "Делали теплый шов и покраску. Очень довольны результатом! В доме стало заметно теплее, сквозняков нет. Мастера профессионалы своего дела, все объяснили и показали.",
                date: "Сентябрь 2023"
              },
              {
                name: "Андрей Волков",
                location: "Москва",
                rating: 5,
                text: "Заказывал комплексную отделку сруба. От шлифовки до финишной покраски. Работы выполнили в срок, договор без скрытых доплат. Качество на высоте, рекомендую!",
                date: "Август 2023"
              }
            ].map((review, index) => (
              <Card key={index} className="hover:shadow-2xl transition-all duration-300 border-2">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" className="text-yellow-500 fill-yellow-500" size={20} />
                    ))}
                  </div>

                  <p className="text-muted-foreground leading-relaxed italic">
                    "{review.text}"
                  </p>

                  <div className="pt-4 border-t">
                    <div className="font-bold text-lg">{review.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                      <Icon name="MapPin" size={14} />
                      {review.location}
                    </div>
                    <div className="text-xs text-primary font-semibold mt-2">
                      {review.date}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" variant="outline" className="border-2 border-primary">
              <Icon name="ExternalLink" className="mr-2" size={20} />
              Все отзывы на Яндекс.Картах
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full mb-6">
              <Icon name="HelpCircle" size={20} />
              <span className="font-semibold">Частые вопросы</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ответы на популярные вопросы
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                question: "Сколько стоит покраска деревянного дома?",
                answer: "Стоимость зависит от площади, состояния поверхности и выбранных материалов. В среднем покраска стоит от 450 ₽/м². Шлифовка — от 200 ₽/м². Точную цену рассчитаем после бесплатного выезда замерщика."
              },
              {
                question: "Как долго держится покрытие?",
                answer: "При использовании качественных немецких красок (Remmers, Zobel) покрытие служит 10-15 лет. Мы даём официальную гарантию до 10 лет на все виды работ."
              },
              {
                question: "Можно ли красить дом зимой?",
                answer: "Покраску рекомендуем проводить при температуре от +5°C до +25°C. Оптимальное время — весна и осень. Зимой возможна только внутренняя отделка в отапливаемых помещениях."
              },
              {
                question: "Как долго длятся работы?",
                answer: "Сроки зависят от объёма. Покраска дома 150-200 м² занимает 7-14 дней. Шлифовка + покраска — 10-20 дней. Точные сроки указываем в договоре."
              },
              {
                question: "Нужно ли готовить дом перед покраской?",
                answer: "Всю подготовку делаем мы: шлифовку, очистку, обработку антисептиками. От вас требуется только обеспечить доступ к объекту и электричество."
              }
            ].map((faq, index) => (
              <Card key={index} className="hover:shadow-lg transition-all border-2">
                <CardContent className="p-8">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="MessageCircle" className="text-primary" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="inline-block bg-primary/5 border-2 border-primary/20 p-6">
              <div className="flex items-center gap-4">
                <Icon name="Phone" className="text-primary" size={40} />
                <div className="text-left">
                  <div className="font-bold text-lg mb-1">Не нашли ответ на вопрос?</div>
                  <div className="text-sm text-muted-foreground">Позвоните нам: <span className="text-primary font-bold">+7 (495) 123-45-67</span></div>
                </div>
              </div>
            </Card>
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