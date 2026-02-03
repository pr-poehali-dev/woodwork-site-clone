import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<Array<{url: string, prompt: string, format: {width: number, height: number}}>>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editOverlayEnabled, setEditOverlayEnabled] = useState(true);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editButtonText, setEditButtonText] = useState("");
  const [showTitle, setShowTitle] = useState(true);
  const [showDescription, setShowDescription] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const [regenerating, setRegenerating] = useState(false);
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

  const directFormats = [
    { label: "240×400", width: 240, height: 400, category: "Вертикальные" },
    { label: "300×250", width: 300, height: 250, category: "Средние" },
    { label: "300×500", width: 300, height: 500, category: "Вертикальные" },
    { label: "300×600", width: 300, height: 600, category: "Вертикальные" },
    { label: "320×50", width: 320, height: 50, category: "Мобильные баннеры" },
    { label: "320×100", width: 320, height: 100, category: "Мобильные баннеры" },
    { label: "320×480", width: 320, height: 480, category: "Мобильные" },
    { label: "336×280", width: 336, height: 280, category: "Средние" },
    { label: "480×320", width: 480, height: 320, category: "Горизонтальные" },
    { label: "728×90", width: 728, height: 90, category: "Баннеры" },
    { label: "160×600", width: 160, height: 600, category: "Небоскрёбы" },
    { label: "240×600", width: 240, height: 600, category: "Небоскрёбы" },
    { label: "970×250", width: 970, height: 250, category: "Широкие" },
    { label: "1000×120", width: 1000, height: 120, category: "Широкие баннеры" }
  ];

  const [selectedFormat, setSelectedFormat] = useState(directFormats[0]);

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
          width: selectedFormat.width,
          height: selectedFormat.height
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Generation failed');
      }

      const data = await response.json();
      
      const resizedUrl = await resizeImageToFormat(data.imageUrl, selectedFormat.width, selectedFormat.height);
      
      setGeneratedImages(prev => [...prev, { 
        url: resizedUrl, 
        prompt: finalPrompt,
        format: { width: selectedFormat.width, height: selectedFormat.height }
      }]);
      
      toast({
        title: "✨ Готово!",
        description: `Креатив ${selectedFormat.width}×${selectedFormat.height} готов`
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

  const resizeImageToFormat = async (imageUrl: string, targetWidth: number, targetHeight: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Canvas not supported'));
          return;
        }

        const sourceAspect = img.width / img.height;
        const targetAspect = targetWidth / targetHeight;

        let sx = 0, sy = 0, sWidth = img.width, sHeight = img.height;

        if (sourceAspect > targetAspect) {
          sWidth = img.height * targetAspect;
          sx = (img.width - sWidth) / 2;
        } else {
          sHeight = img.width / targetAspect;
          sy = (img.height - sHeight) / 2;
        }

        ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, targetWidth, targetHeight);

        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Failed to create blob'));
            return;
          }
          resolve(URL.createObjectURL(blob));
        }, 'image/jpeg', 0.95);
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = imageUrl;
    });
  };

  const downloadImage = async (url: string, index: number) => {
    try {
      const link = document.createElement('a');
      link.href = url;
      link.download = `directkit-creative-${index + 1}.jpg`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
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

  const getSmartLayout = (width: number, height: number) => {
    const aspectRatio = width / height;
    const isVertical = aspectRatio < 0.8;
    const isHorizontal = aspectRatio > 1.5;
    const isSkyscraper = height > width * 2;
    const isSmallBanner = height < 150;

    if (isSkyscraper) {
      return { textAlign: 'center' as const, padding: 30, titleSize: 0.08, descSize: 0.045, buttonWidth: 0.7, buttonY: 0.75 };
    } else if (isVertical) {
      return { textAlign: 'center' as const, padding: 35, titleSize: 0.065, descSize: 0.04, buttonWidth: 0.75, buttonY: 0.78 };
    } else if (isSmallBanner) {
      return { textAlign: 'left' as const, padding: 20, titleSize: 0.25, descSize: 0.15, buttonWidth: 0.25, buttonY: 0.5 };
    } else if (isHorizontal) {
      return { textAlign: 'left' as const, padding: 40, titleSize: 0.12, descSize: 0.065, buttonWidth: 0.3, buttonY: 0.6 };
    } else {
      return { textAlign: 'center' as const, padding: 40, titleSize: 0.07, descSize: 0.045, buttonWidth: 0.6, buttonY: 0.75 };
    }
  };

  const regenerateWithOverlay = async () => {
    if (editingIndex === null) return;
    
    setRegenerating(true);
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas not supported');

      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = generatedImages[editingIndex].url;
      });

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const layout = getSmartLayout(canvas.width, canvas.height);

      if (editOverlayEnabled) {
        const gradient = ctx.createLinearGradient(0, canvas.height * 0.4, 0, canvas.height);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(0.4, 'rgba(0, 0, 0, 0.5)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.92)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const padding = Math.max(canvas.width * 0.08, 30);
        let yPosition = canvas.height - padding;

        if (showButton && editButtonText) {
          const buttonWidth = Math.floor(canvas.width * 0.55);
          const buttonHeight = Math.floor(canvas.height * 0.12);
          const buttonX = (canvas.width - buttonWidth) / 2;
          const buttonY = yPosition - buttonHeight;

          ctx.fillStyle = '#16a34a';
          ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
          ctx.shadowBlur = 20;
          ctx.shadowOffsetY = 6;
          roundRect(ctx, buttonX, buttonY, buttonWidth, buttonHeight, Math.floor(buttonHeight * 0.25));
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.font = `900 ${Math.floor(buttonHeight * 0.38)}px Arial, sans-serif`;
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(editButtonText.toUpperCase(), canvas.width / 2, buttonY + buttonHeight / 2);
          
          yPosition = buttonY - Math.floor(canvas.height * 0.08);
        }

        if (showDescription && editDescription) {
          ctx.font = `600 ${Math.floor(canvas.height * 0.055)}px Arial, sans-serif`;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'alphabetic';
          ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
          ctx.shadowBlur = 12;
          
          const descLines = wrapText(ctx, editDescription, canvas.width - padding * 2.5);
          const lineHeight = Math.floor(canvas.height * 0.065);
          
          descLines.reverse().forEach(line => {
            ctx.fillText(line, canvas.width / 2, yPosition);
            yPosition -= lineHeight;
          });
          
          yPosition -= Math.floor(canvas.height * 0.05);
          ctx.shadowBlur = 0;
        }

        if (showTitle && editTitle) {
          ctx.font = `900 ${Math.floor(canvas.height * 0.095)}px Arial, sans-serif`;
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'alphabetic';
          ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
          ctx.shadowBlur = 18;
          
          const titleLines = wrapText(ctx, editTitle, canvas.width - padding * 2);
          const titleLineHeight = Math.floor(canvas.height * 0.11);
          
          titleLines.reverse().forEach(line => {
            ctx.fillText(line, canvas.width / 2, yPosition);
            yPosition -= titleLineHeight;
          });
          
          ctx.shadowBlur = 0;
        }
      }

      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        setGeneratedImages(prev => prev.map((img, idx) => 
          idx === editingIndex ? { ...img, url } : img
        ));
        setEditingIndex(null);
        toast({ title: "Готово!", description: "Креатив обновлён" });
      }, 'image/jpeg', 0.95);

    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось обработать изображение",
        variant: "destructive"
      });
    } finally {
      setRegenerating(false);
    }
  };

  const roundRect = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const testLine = currentLine + ' ' + words[i];
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth) {
        lines.push(currentLine);
        currentLine = words[i];
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine);
    return lines;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <header className="border-b bg-white/90 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Icon name="Sparkles" className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-black text-gray-900">DirectKit</h1>
                <p className="text-sm text-green-600 font-bold">Креативы для Яндекс.Директ</p>
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
                <Icon name="Zap" size={18} className="text-green-500" />
                <span>Мгновенная генерация</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Shield" size={18} className="text-green-500" />
                <span>Без ограничений</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Palette" size={18} className="text-green-500" />
                <span>9 готовых шаблонов</span>
              </div>
            </div>
          </div>

          <Card className="border-4 border-green-100 shadow-2xl mb-16">
            <CardContent className="p-10">
              <div className="space-y-8">
                <div>
                  <label className="text-lg font-black text-gray-900 mb-4 block flex items-center gap-2">
                    <Icon name="Pencil" size={20} className="text-green-600" />
                    Опишите креатив для рекламы
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Например: Счастливая девушка с кофе в руках на фоне окна, утренний солнечный свет, современная квартира, теплая атмосфера"
                    rows={4}
                    className="w-full px-6 py-5 border-3 border-gray-200 rounded-2xl focus:border-green-500 outline-none text-lg resize-none"
                  />
                </div>

                <div>
                  <label className="text-lg font-black text-gray-900 mb-4 block flex items-center gap-2">
                    <Icon name="Crop" size={20} className="text-green-600" />
                    Формат РСЯ (все размеры Директа)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                    {directFormats.map((format) => (
                      <button
                        key={format.label}
                        onClick={() => setSelectedFormat(format)}
                        className={`p-4 border-2 rounded-xl transition-all text-center ${
                          selectedFormat.label === format.label
                            ? 'border-green-600 bg-green-50 shadow-lg'
                            : 'border-gray-200 hover:border-green-300 hover:bg-green-50/50'
                        }`}
                      >
                        <div className="text-sm font-black text-gray-900">{format.label}</div>
                        <div className="text-xs text-gray-500 mt-1">{format.category}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => generateImage()}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-xl py-8 font-black shadow-2xl"
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
                  className="border-3 hover:border-green-500 transition-all cursor-pointer group hover:shadow-xl"
                  onClick={() => {
                    setPrompt(template.prompt);
                    generateImage(template.prompt);
                  }}
                >
                  <CardContent className="p-7">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Icon name={template.icon} className="text-green-600" size={28} />
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
                  <Card key={index} className="overflow-hidden border-3 border-gray-200 hover:border-green-500 transition-all hover:shadow-2xl group">
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
                          onClick={() => {
                            setEditingIndex(index);
                            setEditTitle("");
                            setEditDescription("");
                            setEditButtonText("");
                            setShowTitle(true);
                            setShowDescription(true);
                            setShowButton(true);
                            setEditOverlayEnabled(true);
                          }}
                          className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 font-bold"
                        >
                          <Icon name="Edit" className="mr-2" size={18} />
                          Редактировать
                        </Button>
                        <Button
                          onClick={() => downloadImage(image.url, index)}
                          variant="outline"
                          className="border-3 border-green-600 text-green-600 hover:bg-green-50 font-bold"
                        >
                          <Icon name="Download" size={18} />
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

      {editingIndex !== null && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-gray-900">Редактор креатива</h3>
                <Button
                  variant="ghost"
                  onClick={() => setEditingIndex(null)}
                  className="text-gray-500 hover:text-gray-900"
                >
                  <Icon name="X" size={24} />
                </Button>
              </div>

              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-black text-gray-900 mb-4 text-xl">Превью</h4>
                    <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-200">
                      <img
                        src={generatedImages[editingIndex].url}
                        alt="Превью"
                        className="w-full h-full object-cover"
                      />
                      {editOverlayEnabled && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col items-center justify-end pb-12 px-8 text-center">
                          <div className="space-y-4 w-full max-w-lg">
                            {showTitle && editTitle && (
                              <h3 className="text-white font-black text-4xl drop-shadow-2xl leading-tight tracking-tight">{editTitle}</h3>
                            )}
                            {showDescription && editDescription && (
                              <p className="text-white/95 text-lg font-semibold drop-shadow-lg leading-relaxed">{editDescription}</p>
                            )}
                            {showButton && editButtonText && (
                              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-black shadow-2xl text-lg mt-4 transition-all transform hover:scale-105">
                                {editButtonText}
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-3 border-green-200 shadow-lg">
                      <input
                        type="checkbox"
                        checked={editOverlayEnabled}
                        onChange={(e) => setEditOverlayEnabled(e.target.checked)}
                        className="w-7 h-7 accent-green-600 cursor-pointer"
                        id="overlay-toggle"
                      />
                      <label htmlFor="overlay-toggle" className="font-black text-gray-900 text-lg cursor-pointer flex items-center gap-2">
                        <Icon name="Check" size={22} className="text-green-600" />
                        Включить затемнение
                      </label>
                    </div>

                    <div className="space-y-3 p-5 bg-white rounded-2xl border-2 border-gray-200">
                      <div className="flex items-center justify-between">
                        <label className="font-black text-gray-900 text-lg">Заголовок</label>
                        <input
                          type="checkbox"
                          checked={showTitle}
                          onChange={(e) => setShowTitle(e.target.checked)}
                          className="w-6 h-6 accent-green-600 cursor-pointer"
                          id="title-toggle"
                        />
                      </div>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        disabled={!showTitle}
                        placeholder="Введите заголовок"
                        className="w-full px-5 py-4 border-3 border-gray-300 rounded-xl focus:border-green-500 outline-none disabled:bg-gray-100 disabled:opacity-50 text-base font-semibold transition-all"
                      />
                    </div>

                    <div className="space-y-3 p-5 bg-white rounded-2xl border-2 border-gray-200">
                      <div className="flex items-center justify-between">
                        <label className="font-black text-gray-900 text-lg">Описание</label>
                        <input
                          type="checkbox"
                          checked={showDescription}
                          onChange={(e) => setShowDescription(e.target.checked)}
                          className="w-6 h-6 accent-green-600 cursor-pointer"
                          id="desc-toggle"
                        />
                      </div>
                      <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        disabled={!showDescription}
                        placeholder="Введите описание"
                        rows={5}
                        className="w-full px-5 py-4 border-3 border-gray-300 rounded-xl focus:border-green-500 outline-none resize-none disabled:bg-gray-100 disabled:opacity-50 text-base font-medium transition-all"
                      />
                    </div>

                    <div className="space-y-3 p-5 bg-white rounded-2xl border-2 border-gray-200">
                      <div className="flex items-center justify-between">
                        <label className="font-black text-gray-900 text-lg">Кнопка</label>
                        <input
                          type="checkbox"
                          checked={showButton}
                          onChange={(e) => setShowButton(e.target.checked)}
                          className="w-6 h-6 accent-green-600 cursor-pointer"
                          id="button-toggle"
                        />
                      </div>
                      <input
                        type="text"
                        value={editButtonText}
                        onChange={(e) => setEditButtonText(e.target.value)}
                        disabled={!showButton}
                        placeholder="Текст на кнопке (например: Заказать)"
                        className="w-full px-5 py-4 border-3 border-gray-300 rounded-xl focus:border-green-500 outline-none disabled:bg-gray-100 disabled:opacity-50 text-base font-semibold transition-all"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  onClick={regenerateWithOverlay}
                  disabled={regenerating}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-xl py-8 font-black shadow-2xl rounded-2xl transition-all"
                >
                  {regenerating ? (
                    <>
                      <Icon name="Loader2" className="mr-3 animate-spin" size={24} />
                      Применяем изменения...
                    </>
                  ) : (
                    <>
                      <Icon name="Sparkles" className="mr-3" size={24} />
                      Применить и сохранить
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <footer className="py-12 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
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