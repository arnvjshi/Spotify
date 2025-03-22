"use client"

import { useState, useEffect } from "react"
import { Check, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export function ThemeCustomizer() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [primaryColor, setPrimaryColor] = useState("green")
  const [radius, setRadius] = useState([0.5])
  const [fontSize, setFontSize] = useState([1])

  // Theme colors
  const colors = [
    { name: "Slate", value: "slate", bg: "bg-slate-500" },
    { name: "Red", value: "red", bg: "bg-red-500" },
    { name: "Orange", value: "orange", bg: "bg-orange-500" },
    { name: "Green", value: "green", bg: "bg-green-500" },
    { name: "Blue", value: "blue", bg: "bg-blue-500" },
    { name: "Purple", value: "purple", bg: "bg-purple-500" },
    { name: "Pink", value: "pink", bg: "bg-pink-500" },
    { name: "Cyan", value: "cyan", bg: "bg-cyan-500" },
  ]

  // Apply custom CSS variables
  useEffect(() => {
    if (!mounted) {
      setMounted(true)
      return
    }

    document.documentElement.style.setProperty("--radius", `${radius[0]}rem`)
    document.documentElement.style.setProperty("--font-size-factor", fontSize[0])

    // This is a simplified example - in a real app, you'd use a more sophisticated
    // approach to change the primary color, like CSS variables or a theme provider
    const root = document.documentElement
    root.classList.forEach((className) => {
      if (className.startsWith("theme-")) {
        root.classList.remove(className)
      }
    })
    root.classList.add(`theme-${primaryColor}`)
  }, [primaryColor, radius, fontSize, mounted])

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Theme</h2>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Label>Mode</Label>
            <div className="flex items-center gap-2">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setTheme("light")}
              >
                <Sun className="h-4 w-4" />
                <span className="sr-only">Light</span>
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setTheme("dark")}
              >
                <Moon className="h-4 w-4" />
                <span className="sr-only">Dark</span>
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Primary Color</Label>
            <div className="grid grid-cols-4 gap-2">
              {colors.map((color) => (
                <Button
                  key={color.value}
                  variant="outline"
                  size="sm"
                  className={`h-8 justify-start gap-2 ${primaryColor === color.value ? "border-2 border-primary" : ""}`}
                  onClick={() => setPrimaryColor(color.value)}
                >
                  <span className={`h-4 w-4 rounded-full ${color.bg}`} />
                  <span className="text-xs">{color.name}</span>
                  {primaryColor === color.value && <Check className="h-3 w-3 ml-auto" />}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Customization</h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="radius">Border Radius</Label>
              <span className="text-sm text-muted-foreground">{radius[0].toFixed(1)}rem</span>
            </div>
            <Slider id="radius" min={0} max={2} step={0.1} value={radius} onValueChange={setRadius} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="fontSize">Font Size</Label>
              <span className="text-sm text-muted-foreground">{fontSize[0].toFixed(1)}x</span>
            </div>
            <Slider id="fontSize" min={0.8} max={1.2} step={0.05} value={fontSize} onValueChange={setFontSize} />
          </div>

          <div className="pt-4">
            <h3 className="text-sm font-medium mb-3">Preview</h3>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button>Primary Button</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <div className={`h-5 w-5 rounded-full bg-primary`} />
                <span>Primary</span>
                <div className={`h-5 w-5 rounded-full bg-secondary`} />
                <span>Secondary</span>
                <div className={`h-5 w-5 rounded-full bg-accent`} />
                <span>Accent</span>
                <div className={`h-5 w-5 rounded-full bg-muted`} />
                <span>Muted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

