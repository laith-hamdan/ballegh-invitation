import { useState } from 'react'
import LoadingScreen from './components/LoadingScreen'
import MagicalBackground from './components/MagicalBackground'
import Hero from './components/Hero'
import ProfileSection from './components/ProfileSection'
import SortingHat from './components/SortingHat'
import StorySection from './components/StorySection'
import DiscussionDetails from './components/DiscussionDetails'
import WishList from './components/WishList'
import RSVP from './components/RSVP'
import Countdown from './components/Countdown'
import MusicPlayer from './components/MusicPlayer'
import Footer from './components/Footer'
import CursorEffects from './components/CursorEffects'
import GoldenSnitch from './components/GoldenSnitch'
import Howler from './components/Howler'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative min-h-screen">
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      <CursorEffects />
      <MagicalBackground />

      {/* page content */}
      <div className="relative z-10">
        <Hero start={loaded} />
        <ProfileSection />
        <SortingHat />
        <StorySection />
        <DiscussionDetails />
        <WishList />
        <Countdown />
        <RSVP />
        <Footer />
      </div>

      <MusicPlayer />
      <Howler />
      {loaded && <GoldenSnitch />}
    </div>
  )
}
