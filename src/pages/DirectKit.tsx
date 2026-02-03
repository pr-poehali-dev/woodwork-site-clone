import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

const DirectKit = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<Array<{url: string, prompt: string}>>([]);
  const { toast } = useToast();

  const templates = [
    {
      icon: "ShoppingBag",
      title: "Товар в руках",
      prompt: "Person holding [product] in modern lifestyle setting, natural lighting, professional photography"
    },
    {
      icon: "Sparkles",
      title: "До/После",
      prompt: "Split screen before and after comparison, [product] transformation result, dramatic difference"
    },
    {
      icon: "Heart",
      title: "Эмоция счастья",
      prompt: "Happy person enjoying [product], authentic emotion, lifestyle photography, warm colors"
    },
    {
      icon: "Zap",
      title: "Продукт в действии",
      prompt: "[Product] in action, dynamic shot, energy and movement, professional commercial photography"
    },
    {
      icon: "Target",
      title: "Фокус на деталях",
      prompt: "Close-up detail shot of [product], macro photography, premium quality, elegant composition"
    },
    {
      icon: "TrendingUp",
      title: "Успех и результат",
      prompt: "Success story with [product], achievement visualization, motivational atmosphere"
    }
  ];

  const yandexFormats = [
    { label: "240×400", width: 240, height: 400, category: "Вертикальный" },
    { label: "300×250", width: 300, height: 250, category: "Средний прямоугольник" },
    { label: "300×500", width: 300, height: 500, category: "Половина страницы" },
    { label: "300×600", width: 300, height: 600, category: "Полстраницы" },
    { label: "320×50", width: 320, height: 50, category: "Мобильный баннер" },
    { label: "320×100", width: 320, height: 100, category: "Большой мобильный" },
    { label: "320×480", width: 320, height: 480, category: "Мобильный интерстишл" },
    { label: "336×280", width: 336, height: 280, category: "Большой прямоугольник" },
    { label: "480×320", width: 480, height: 320, category: "Горизонтальный" },
    { label: "728×90", width: 728, height: 90, category: "Лидерборд" },
    { label: "970×250", width: 970, height: 250, category: "Биллборд" },
    { label: "1000×120", width: 1000, height: 120, category: "Панорама" },
    { label: "160×600", width: 160, height: 600, category: "Небоскрёб" },
    { label: "240×600", width: 240, height: 600, category: "Полунебоскрёб" }
  ];

  const [selectedFormats, setSelectedFormats] = useState<number[]>([]);

  const generateImages = async (customPrompt?: string) => {
    const finalPrompt = customPrompt || prompt;
    if (!finalPrompt.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите описание креатива",
        variant: "destructive"
      });
      return;
    }

    if (selectedFormats.length === 0) {
      toast({
        title: "Ошибка",
        description: "Выберите хотя бы один формат",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    const newImages: Array<{url: string, prompt: string}> = [];
    
    try {
      for (const formatIndex of selectedFormats) {
        const format = yandexFormats[formatIndex];
        
        const response = await fetch('https://functions.poehali.dev/88694b07-41e0-44c1-be3d-672532f61f66', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            prompt: finalPrompt,
            width: format.width,
            height: format.height
          })
        });

        if (!response.ok) throw new Error(`Generation failed for ${format.label}`);

        const data = await response.json();
        newImages.push({ url: data.imageUrl, prompt: `${finalPrompt} (${format.label})` });
      }
      
      setGeneratedImages(prev => [...prev, ...newImages]);
      
      toast({
        title: "Готово!",
        description: `Сгенерировано ${newImages.length} креативов`
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось сгенерировать все изображения",
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
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось скачать изображение",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <header className="border-b bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Icon name="Sparkles" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-900">DirectKit</h1>
                <p className="text-xs text-green-600 font-medium">Креативы за секунды</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold">
                <Icon name="Zap" className="inline mr-1" size={14} />
                Бесплатно
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black text-gray-900 mb-4">
              Генерация креативов за секунды
            </h2>
            <p className="text-xl text-gray-600">
              Gemini 2.5 Flash создаёт рекламные изображения мгновенно
            </p>
          </div>

          <Card className="border-2 border-green-200 shadow-2xl mb-12">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-bold text-gray-700 mb-3 block">
                    Опишите креатив
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Например: Счастливая девушка с кофе в руках, утро, солнечный свет"
                    rows={4}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 outline-none text-lg"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-700 mb-3 flex items-center justify-between">
                    <span>Форматы РСЯ (выберите несколько)</span>
                    {selectedFormats.length > 0 && (
                      <button
                        onClick={() => setSelectedFormats([])}
                        className="text-xs text-gray-500 hover:text-gray-700"
                      >
                        Сбросить
                      </button>
                    )}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-96 overflow-y-auto p-2 border-2 border-gray-100 rounded-xl">
                    {yandexFormats.map((format, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedFormats(prev => 
                            prev.includes(index) 
                              ? prev.filter(i => i !== index)
                              : [...prev, index]
                          );
                        }}
                        className={`p-3 border-2 rounded-xl transition-all text-left ${
                          selectedFormats.includes(index)
                            ? 'border-green-600 bg-green-50'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <div className="text-sm font-bold text-gray-900">{format.label}</div>
                        <div className="text-xs text-gray-500 mt-1">{format.category}</div>
                      </button>
                    ))}
                  </div>
                  {selectedFormats.length > 0 && (
                    <p className="text-sm text-gray-600 mt-2">
                      Выбрано форматов: <span className="font-bold text-green-600">{selectedFormats.length}</span>
                    </p>
                  )}
                </div>

                <Button
                  onClick={() => generateImages()}
                  disabled={loading || selectedFormats.length === 0}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-lg py-6"
                >
                  {loading ? (
                    <>
                      <Icon name="Loader2" className="mr-2 animate-spin" size={20} />
                      Генерируем {selectedFormats.length} форматов...
                    </>
                  ) : (
                    <>
                      <Icon name="Sparkles" className="mr-2" size={20} />
                      Сгенерировать {selectedFormats.length > 0 ? `${selectedFormats.length} креативов` : 'креативы'}
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mb-12">
            <h3 className="text-2xl font-black text-gray-900 mb-6">Быстрые шаблоны</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template, index) => (
                <Card
                  key={index}
                  className="border-2 hover:border-green-500 transition-all cursor-pointer group"
                  onClick={() => {
                    setPrompt(template.prompt);
                  }}
                >
                  <CardContent className="p-6">
                    <Icon name={template.icon} className="text-green-600 mb-3 group-hover:scale-110 transition-transform" size={32} />
                    <h4 className="font-bold text-gray-900 mb-2">{template.title}</h4>
                    <p className="text-sm text-gray-600">{template.prompt}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {generatedImages.length > 0 && (
            <div>
              <h3 className="text-2xl font-black text-gray-900 mb-6">Ваши креативы</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {generatedImages.map((image, index) => (
                  <Card key={index} className="overflow-hidden border-2">
                    <div className="relative aspect-square">
                      <img
                        src={image.url}
                        alt={`Креатив ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-4">
                        <p className="text-white text-sm">{image.prompt}</p>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex gap-2">
                        <Button
                          onClick={() => downloadImage(image.url, index)}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          <Icon name="Download" className="mr-2" size={16} />
                          Скачать
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setPrompt(image.prompt)}
                          className="border-2 border-green-600 text-green-600"
                        >
                          <Icon name="Copy" size={16} />
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

      <footer className="py-8 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">DirectKit — генерация креативов на Gemini 2.5 Flash</p>
        </div>
      </footer>
    </div>
  );
};

export default DirectKit;