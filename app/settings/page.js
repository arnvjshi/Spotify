"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ThemeCustomizer } from "@/components/theme-customizer"

export default function SettingsPage() {
  const [audioQuality, setAudioQuality] = useState("high")
  const [crossfade, setCrossfade] = useState([5])

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <motion.h1
        className="text-3xl font-bold"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Settings
      </motion.h1>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="audio">Audio</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-6">
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Profile</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <div className="text-lg font-medium mt-1">SpotifyUser</div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="text-lg font-medium mt-1">user@example.com</div>
                </div>
              </div>
              <div className="pt-4">
                <Label htmlFor="premium">Premium Status</Label>
                <div className="text-lg font-medium mt-1">Free Plan</div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Privacy</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="private-session">Private Session</Label>
                  <p className="text-sm text-muted-foreground">Hide your listening activity</p>
                </div>
                <Switch id="private-session" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="listening-history">Listening History</Label>
                  <p className="text-sm text-muted-foreground">Save songs you've listened to</p>
                </div>
                <Switch id="listening-history" defaultChecked />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="audio" className="space-y-6">
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Audio Quality</h2>
            <div className="space-y-4">
              <RadioGroup value={audioQuality} onValueChange={setAudioQuality}>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="auto" id="auto" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="auto">Automatic</Label>
                    <p className="text-sm text-muted-foreground">Adjusts quality based on your connection</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="low" id="low" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="low">Low (96 kbps)</Label>
                    <p className="text-sm text-muted-foreground">Uses approximately 40MB per hour</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="normal" id="normal" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="normal">Normal (160 kbps)</Label>
                    <p className="text-sm text-muted-foreground">Uses approximately 70MB per hour</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="high" id="high" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="high">High (320 kbps)</Label>
                    <p className="text-sm text-muted-foreground">Uses approximately 150MB per hour</p>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Playback</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="crossfade">Crossfade</Label>
                  <span className="text-sm text-muted-foreground">{crossfade[0]}s</span>
                </div>
                <Slider id="crossfade" min={0} max={12} step={1} value={crossfade} onValueChange={setCrossfade} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="normalize">Normalize Volume</Label>
                  <p className="text-sm text-muted-foreground">Set the same volume level for all tracks</p>
                </div>
                <Switch id="normalize" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoplay">Autoplay</Label>
                  <p className="text-sm text-muted-foreground">Continue playing similar songs when your music ends</p>
                </div>
                <Switch id="autoplay" defaultChecked />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <ThemeCustomizer />
        </TabsContent>
      </Tabs>
    </div>
  )
}

