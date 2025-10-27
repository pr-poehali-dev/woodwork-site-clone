import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import { Link } from "react-router-dom";

const SandingService = () => {
  const [showCalculator, setShowCalculator] = useState(false);

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">Arte Madera</Link>
          <div className="hidden md:flex gap-8 items-center">
            <Link to="/#services" className="hover:text-primary transition-colors">Услуги</Link>
            <Link to="/#portfolio" className="hover:text-primary transition-colors">Проекты</Link>
            <Link to="/#contacts" className="hover:text-primary transition-colors">Контакты</Link>
            <Button className="bg-primary hover:bg-accent">
              <Icon name="Phone" className="mr-2" size={18} />
              +7 (495) 123-45-67
            </Button>
          </div>
        </nav>
      </header>

      <section className="pt-32 pb-12 bg-gradient-to-b from-secondary/30 to-white">
        <div className="container mx-auto px-4">
          <Link to="/#services" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6">
            <Icon name="ArrowLeft" size={20} />
            Назад к услугам
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full mb-6">
                <Icon name="CircleSlash" size={20} />
                <span className="font-semibold">Профессиональная шлифовка</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Шлифовка бруса и бревна
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Профессиональная шлифовка деревянных поверхностей для идеально гладкого результата. 
                Подготовка к покраске, восстановление внешнего вида древесины, выравнивание текстуры.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-accent hover:shadow-xl text-lg px-10 py-7 h-auto"
                  onClick={() => setShowCalculator(true)}
                >
                  <Icon name="Calculator" className="mr-2" size={24} />
                  Рассчитать стоимость
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-10 py-7 h-auto border-2"
                >
                  <Icon name="Phone" className="mr-2" size={24} />
                  Получить консультацию
                </Button>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px]">
              <img
                src="https://cdn.poehali.dev/projects/1e675e92-c5ae-402b-928e-d196389e8223/files/8e7aabf4-bead-4e3b-ba0c-f66c92a11dbc.jpg"
                alt="Шлифовка деревянного дома"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="Clock" className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-2">от 200 ₽/м²</h3>
                <p className="text-muted-foreground">Доступная цена за качественную работу</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="Zap" className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Быстро</h3>
                <p className="text-muted-foreground">Средний дом за 3-5 дней</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="Star" className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Без пыли</h3>
                <p className="text-muted-foreground">Профессиональное оборудование с пылесосом</p>
              </CardContent>
            </Card>
          </div>

          <div className="mb-20">
            <h2 className="text-4xl font-bold mb-8">Виды шлифовки</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: "Home", title: "Шлифовка сруба", desc: "Обработка оцилиндрованного бревна с сохранением естественной текстуры дерева. Удаление синевы и загрязнений." },
                { icon: "Box", title: "Шлифовка бруса", desc: "Выравнивание поверхности профилированного и клееного бруса. Подготовка под покраску или масло." },
                { icon: "Layers", title: "Шлифовка фасада", desc: "Комплексная обработка наружных стен дома. Восстановление после потемнения и старения древесины." },
                { icon: "FileText", title: "Шлифовка под покраску", desc: "Идеальная подготовка поверхности для нанесения лакокрасочных материалов. Гарантия адгезии." }
              ].map((item, idx) => (
                <Card key={idx} className="border-0 shadow-md hover:shadow-xl transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon name={item.icon} className="text-primary" size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-4xl font-bold mb-8">Почему важна шлифовка</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: "Shield", title: "Защита древесины", desc: "Удаление повреждённого слоя и подготовка к нанесению защитных составов" },
                { icon: "Sparkles", title: "Эстетика", desc: "Возвращение первозданного вида дерева, выявление естественной текстуры" },
                { icon: "TrendingUp", title: "Долговечность", desc: "Правильная шлифовка продлевает срок службы покрытия в 2-3 раза" }
              ].map((item, idx) => (
                <Card key={idx} className="border-2 border-primary/20 text-center">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon name={item.icon} className="text-primary" size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Нужна шлифовка?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Закажите бесплатный выезд мастера для оценки объёма работ и консультации
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-accent hover:shadow-xl text-lg px-10 py-7 h-auto"
                onClick={() => setShowCalculator(true)}
              >
                <Icon name="Calculator" className="mr-2" size={24} />
                Рассчитать стоимость
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-10 py-7 h-auto border-2"
              >
                <Icon name="Phone" className="mr-2" size={24} />
                Позвонить нам
              </Button>
            </div>
          </div>
        </div>
      </section>

      {showCalculator && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowCalculator(false)}>
          <Card className="max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Калькулятор стоимости</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowCalculator(false)}>
                  <Icon name="X" size={24} />
                </Button>
              </div>
              <p className="text-muted-foreground mb-6">
                Для точного расчёта стоимости шлифовки, пожалуйста, свяжитесь с нами по телефону или оставьте заявку.
              </p>
              <Button className="w-full bg-gradient-to-r from-primary to-accent">
                <Icon name="Phone" className="mr-2" />
                Получить консультацию
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SandingService;
