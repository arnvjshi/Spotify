import { HomeHero } from "@/components/home-hero"
import { RecentlyPlayed } from "@/components/recently-played"
import { ForYou } from "@/components/for-you"
import { MadeForYou } from "@/components/made-for-you"

export default function Home() {
  return (
    <div className="space-y-8 pb-20">
    <meta>Arnav{"You're not supposed to see this "}</meta>
      <HomeHero />
      <RecentlyPlayed />
      <ForYou />
      <MadeForYou />
    </div>
  )
}

