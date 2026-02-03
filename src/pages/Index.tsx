import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<Array<{url: string, prompt: string}>>([]);
  const { toast } = useToast();

  const templates = [
    {
      icon: "ShoppingBag",
      title: "Товар в руках",
      prompt: "Человек держит товар в руках, современный интерьер, естественное освещение, профессиональная фотография"
    },
    {
      icon: "Sparkles",
      title: "До/После",
      prompt: "Разделенный экран до и после использования продукта, драматическая разница, впечатляющий результат"
    },
    {
      icon: "Heart",
      title: "Эмоция счастья",
      prompt: "Счастливый человек наслаждается продуктом, искренние эмоции, lifestyle фотография, теплые цвета"
    },
    {
      icon: "Zap",
      title: "Продукт в действии",
      prompt: "Продукт в использовании, динамичный кадр, энергия и движение, коммерческая фотография"
    },
    {
      icon: "Target",
      title: "Фокус на деталях",
      prompt: "Крупный план деталей продукта, макросъемка, премиальное качество, элегантная композиция"
    },
    {
      icon: "TrendingUp",
      title: "Успех и результат",
      prompt: "История успеха с продуктом, визуализация достижений, мотивационная атмосфера"
    },
    {
      icon: "Users",
      title: "Люди и продукт",
      prompt: "Группа довольных людей с продуктом, социальное взаимодействие, позитивная атмосфера"
    },
    {
      icon: "Gift",
      title: "Подарок/Упаковка",
      prompt: "Красивая упаковка продукта, подарочный вид, праздничная атмосфера, привлекательная презентация"
    },
    {
      icon: "Star",
      title: "Премиум качество",
      prompt: "Продукт на роскошном фоне, премиальная презентация, элитное качество, золотые акценты"
    }
  ];

  const aspectRatios = [
    { label: "Квадрат 1:1", value: "1:1", icon: "Square", desc: "Для постов" },
    { label: "Сторис 9:16", value: "9:16", icon: "Smartphone", desc: "Вертикально" },
    { label: "Баннер 16:9", value: "16:9", icon: "Monitor", desc: "Горизонтально" }
  ];

  const [selectedRatio, setSelectedRatio] = useState("1:1");

  const generateImage = async (customPrompt?: string) => {
    const finalPrompt = customPrompt || prompt;
    if (!finalPrompt.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите описание креатива",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/88694b07-41e0-44c1-be3d-672532f61f66', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: finalPrompt,
          aspectRatio: selectedRatio
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Generation failed');
      }

      const data = await response.json();
      setGeneratedImages(prev => [...prev, { url: data.imageUrl, prompt: finalPrompt }]);
      
      toast({
        title: "✨ Готово!",
        description: "Креатив для Яндекс.Директ сгенерирован"
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Не удалось сгенерировать изображение",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = async (url: string, index: number) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `directkit-creative-${index + 1}.jpg`;
      link.click();
      URL.revokeObjectURL(link.href);
      
      toast({
        title: "Скачано!",
        description: "Креатив сохранен на устройство"
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось скачать изображение",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-red-50">
      <header className="border-b bg-white/90 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-yellow-500 rounded-2xl flex items-center justify-center shadow-xl">
                <Icon name="Sparkles" className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-black text-gray-900">DirectKit</h1>
                <p className="text-sm text-red-600 font-bold">Креативы для Яндекс.Директ</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-5 py-2.5 rounded-full text-sm font-black shadow-lg">
                <Icon name="Zap" className="inline mr-1" size={16} />
                БЕСПЛАТНО
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-6xl font-black text-gray-900 mb-4">
              Генератор креативов для Директа
            </h2>
            <p className="text-2xl text-gray-600 mb-6">
              Создавайте рекламные изображения через Gemini 2.5 Flash за секунды
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Icon name="Zap" size={18} className="text-yellow-500" />
                <span>Мгновенная генерация</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Shield" size={18} className="text-green-500" />
                <span>Без ограничений</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Palette" size={18} className="text-purple-500" />
                <span>9 готовых шаблонов</span>
              </div>
            </div>
          </div>

          <Card className="border-4 border-red-100 shadow-2xl mb-16">
            <CardContent className="p-10">
              <div className="space-y-8">
                <div>
                  <label className="text-lg font-black text-gray-900 mb-4 block flex items-center gap-2">
                    <Icon name="Pencil" size={20} className="text-red-600" />
                    Опишите креатив для рекламы
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Например: Счастливая девушка с кофе в руках на фоне окна, утренний солнечный свет, современная квартира, теплая атмосфера"
                    rows={4}
                    className="w-full px-6 py-5 border-3 border-gray-200 rounded-2xl focus:border-red-500 outline-none text-lg resize-none"
                  />
                </div>

                <div>
                  <label className="text-lg font-black text-gray-900 mb-4 block flex items-center gap-2">
                    <Icon name="Crop" size={20} className="text-red-600" />
                    Формат изображения
                  </label>
                  <div className="grid grid-cols-3 gap-5">
                    {aspectRatios.map((ratio) => (
                      <button
                        key={ratio.value}
                        onClick={() => setSelectedRatio(ratio.value)}
                        className={`p-6 border-3 rounded-2xl transition-all ${
                          selectedRatio === ratio.value
                            ? 'border-red-600 bg-red-50 shadow-lg scale-105'
                            : 'border-gray-200 hover:border-red-300 hover:bg-red-50/50'
                        }`}
                      >
                        <Icon name={ratio.icon} className="mx-auto mb-3 text-red-600" size={32} />
                        <div className="text-base font-black text-gray-900 mb-1">{ratio.label}</div>
                        <div className="text-xs text-gray-500">{ratio.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => generateImage()}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 text-white text-xl py-8 font-black shadow-2xl"
                >
                  {loading ? (
                    <>
                      <Icon name="Loader2" className="mr-3 animate-spin" size={24} />
                      Генерируем креатив...
                    </>
                  ) : (
                    <>
                      <Icon name="Sparkles" className="mr-3" size={24} />
                      Сгенерировать креатив для Директа
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-black text-gray-900">Быстрые шаблоны</h3>
              <p className="text-gray-500">Нажмите на шаблон для генерации</p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {templates.map((template, index) => (
                <Card
                  key={index}
                  className="border-3 hover:border-red-500 transition-all cursor-pointer group hover:shadow-xl"
                  onClick={() => {
                    setPrompt(template.prompt);
                    generateImage(template.prompt);
                  }}
                >
                  <CardContent className="p-7">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-yellow-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Icon name={template.icon} className="text-red-600" size={28} />
                      </div>
                      <div>
                        <h4 className="font-black text-gray-900 mb-2 text-lg">{template.title}</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{template.prompt}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {generatedImages.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-black text-gray-900">Ваши креативы</h3>
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold">
                  {generatedImages.length} {generatedImages.length === 1 ? 'креатив' : 'креативов'}
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {generatedImages.map((image, index) => (
                  <Card key={index} className="overflow-hidden border-3 border-gray-200 hover:border-red-500 transition-all hover:shadow-2xl group">
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      <img
                        src={image.url}
                        alt={`Креатив ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                        <p className="text-white text-sm leading-relaxed">{image.prompt}</p>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <div className="flex gap-3">
                        <Button
                          onClick={() => downloadImage(image.url, index)}
                          className="flex-1 bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 font-bold"
                        >
                          <Icon name="Download" className="mr-2" size={18} />
                          Скачать
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setPrompt(image.prompt)}
                          className="border-3 border-red-600 text-red-600 hover:bg-red-50 font-bold"
                        >
                          <Icon name="Copy" size={18} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <footer className="py-12 bg-gradient-to-r from-red-600 to-yellow-500 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Icon name="Sparkles" size={32} />
              <h3 className="text-3xl font-black">DirectKit</h3>
            </div>
            <p className="text-lg opacity-90 mb-6">Генератор креативов для Яндекс.Директ на базе Gemini 2.5 Flash</p>
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Icon name="Zap" size={16} />
                <span>Мгновенная генерация</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Gift" size={16} />
                <span>Бесплатно</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Globe" size={16} />
                <span>Работает везде</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
