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

  const aspectRatios = [
    { label: "1:1", value: "1:1", icon: "Square" },
    { label: "9:16", value: "9:16", icon: "Smartphone" },
    { label: "16:9", value: "16:9", icon: "Monitor" }
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

      if (!response.ok) throw new Error('Generation failed');

      const data = await response.json();
      setGeneratedImages(prev => [...prev, { url: data.imageUrl, prompt: finalPrompt }]);
      
      toast({
        title: "Готово!",
        description: "Креатив сгенерирован"
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось сгенерировать изображение",
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <header className="border-b bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Icon name="Sparkles" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-900">DirectKit</h1>
                <p className="text-xs text-purple-600 font-medium">Креативы за секунды</p>
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

          <Card className="border-2 border-purple-200 shadow-2xl mb-12">
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
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 outline-none text-lg"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-700 mb-3 block">
                    Формат
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {aspectRatios.map((ratio) => (
                      <button
                        key={ratio.value}
                        onClick={() => setSelectedRatio(ratio.value)}
                        className={`p-4 border-2 rounded-2xl transition-all ${
                          selectedRatio === ratio.value
                            ? 'border-purple-600 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <Icon name={ratio.icon} className="mx-auto mb-2 text-purple-600" size={24} />
                        <div className="text-sm font-bold">{ratio.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => generateImage()}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-6"
                >
                  {loading ? (
                    <>
                      <Icon name="Loader2" className="mr-2 animate-spin" size={20} />
                      Генерируем...
                    </>
                  ) : (
                    <>
                      <Icon name="Sparkles" className="mr-2" size={20} />
                      Сгенерировать креатив
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
                  className="border-2 hover:border-purple-500 transition-all cursor-pointer group"
                  onClick={() => {
                    setPrompt(template.prompt);
                    generateImage(template.prompt);
                  }}
                >
                  <CardContent className="p-6">
                    <Icon name={template.icon} className="text-purple-600 mb-3 group-hover:scale-110 transition-transform" size={32} />
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
                          className="flex-1 bg-purple-600 hover:bg-purple-700"
                        >
                          <Icon name="Download" className="mr-2" size={16} />
                          Скачать
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setPrompt(image.prompt)}
                          className="border-2 border-purple-600 text-purple-600"
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