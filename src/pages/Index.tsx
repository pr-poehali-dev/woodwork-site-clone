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
      setGeneratedImages(prev => [...prev, { 
        url: data.imageUrl, 
        prompt: finalPrompt,
        format: { width: selectedFormat.width, height: selectedFormat.height }
      }]);
      
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
        const gradient = ctx.createLinearGradient(0, canvas.height / 2, 0, canvas.height);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.85)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.textAlign = layout.textAlign;
        const padding = layout.padding;
        const xCenter = layout.textAlign === 'center' ? canvas.width / 2 : padding;
        let yPosition = canvas.height - padding;

        if (showButton && editButtonText) {
          const buttonWidth = canvas.width * layout.buttonWidth;
          const buttonHeight = Math.max(canvas.height * 0.08, 30);
          const buttonX = layout.textAlign === 'center' ? (canvas.width - buttonWidth) / 2 : padding;
          const buttonY = canvas.height - padding - buttonHeight;

          ctx.fillStyle = '#10b981';
          ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
          ctx.shadowBlur = 10;
          ctx.shadowOffsetY = 4;
          roundRect(ctx, buttonX, buttonY, buttonWidth, buttonHeight, 12);
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.font = `bold ${Math.floor(buttonHeight * 0.4)}px Arial`;
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.fillText(editButtonText, buttonX + buttonWidth / 2, buttonY + buttonHeight / 2 + Math.floor(buttonHeight * 0.15));
          
          ctx.textAlign = layout.textAlign;
          yPosition = buttonY - 20;
        }

        if (showDescription && editDescription) {
          ctx.font = `${Math.floor(canvas.height * layout.descSize)}px Arial`;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          const descLines = wrapText(ctx, editDescription, canvas.width - padding * 2);
          descLines.reverse().forEach(line => {
            ctx.fillText(line, xCenter, yPosition);
            yPosition -= Math.floor(canvas.height * (layout.descSize + 0.01));
          });
          yPosition -= 15;
        }

        if (showTitle && editTitle) {
          ctx.font = `bold ${Math.floor(canvas.height * layout.titleSize)}px Arial`;
          ctx.fillStyle = '#ffffff';
          const titleLines = wrapText(ctx, editTitle, canvas.width - padding * 2);
          titleLines.reverse().forEach(line => {
            ctx.fillText(line, xCenter, yPosition);
            yPosition -= Math.floor(canvas.height * (layout.titleSize + 0.01));
          });
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

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-gray-900 mb-4">Превью</h4>
                  <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden">
                    <img
                      src={generatedImages[editingIndex].url}
                      alt="Превью"
                      className="w-full h-full object-cover"
                    />
                    {editOverlayEnabled && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col items-center justify-end p-8 text-center">
                        {showTitle && editTitle && (
                          <h3 className="text-white font-black text-2xl mb-2">{editTitle}</h3>
                        )}
                        {showDescription && editDescription && (
                          <p className="text-white/90 text-sm mb-4">{editDescription}</p>
                        )}
                        {showButton && editButtonText && (
                          <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg">
                            {editButtonText}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                    <input
                      type="checkbox"
                      checked={editOverlayEnabled}
                      onChange={(e) => setEditOverlayEnabled(e.target.checked)}
                      className="w-5 h-5 accent-green-600"
                    />
                    <label className="font-bold text-gray-900">Включить затемнение</label>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="font-bold text-gray-900">Заголовок</label>
                      <input
                        type="checkbox"
                        checked={showTitle}
                        onChange={(e) => setShowTitle(e.target.checked)}
                        className="w-4 h-4 accent-green-600"
                      />
                    </div>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      disabled={!showTitle}
                      placeholder="Введите заголовок"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="font-bold text-gray-900">Описание</label>
                      <input
                        type="checkbox"
                        checked={showDescription}
                        onChange={(e) => setShowDescription(e.target.checked)}
                        className="w-4 h-4 accent-green-600"
                      />
                    </div>
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      disabled={!showDescription}
                      placeholder="Введите описание"
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none resize-none disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="font-bold text-gray-900">Кнопка</label>
                      <input
                        type="checkbox"
                        checked={showButton}
                        onChange={(e) => setShowButton(e.target.checked)}
                        className="w-4 h-4 accent-green-600"
                      />
                    </div>
                    <input
                      type="text"
                      value={editButtonText}
                      onChange={(e) => setEditButtonText(e.target.value)}
                      disabled={!showButton}
                      placeholder="Текст на кнопке (например: Заказать)"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none disabled:bg-gray-100"
                    />
                  </div>

                  <Button
                    onClick={regenerateWithOverlay}
                    disabled={regenerating}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-lg py-6 font-black"
                  >
                    {regenerating ? (
                      <>
                        <Icon name="Loader2" className="mr-2 animate-spin" size={20} />
                        Применяем изменения...
                      </>
                    ) : (
                      <>
                        <Icon name="Sparkles" className="mr-2" size={20} />
                        Применить и сохранить
                      </>
                    )}
                  </Button>
                </div>
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