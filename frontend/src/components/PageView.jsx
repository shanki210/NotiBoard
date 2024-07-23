/**
 * v0 by Vercel.
 * @see https://v0.dev/t/NKBdGbtcLT5
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function PageView() {
  return (
    <div className="bg-background min-h-screen flex flex-col dark:bg-[#1a1a1a]">
      <header className="bg-muted px-6 py-4 flex justify-between items-center">
        <div />
      </header>
      <div className="flex-1 grid grid-cols-[35%_65%] gap-6 p-6 dark:bg-[#1a1a1a] dark:text-card-foreground">
        <div className="flex flex-col gap-6">
          <div className="bg-[#0077b6] rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 dark:bg-[#0077b6] dark:text-card-foreground">
            <div className="text-4xl font-bold text-primary-foreground dark:text-primary-foreground">25:00</div>
            <div className="text-primary-foreground text-sm font-medium mt-2 dark:text-primary-foreground">
              Pomodoro Timer
            </div>
            <div className="text-primary-foreground text-sm font-medium mt-2 dark:text-primary-foreground">
              Work to do
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Card className="bg-card rounded-lg p-6 flex flex-col items-center justify-center dark:bg-[#2a2a2a] dark:text-card-foreground">
              <div className="w-full flex justify-between items-center mb-4">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <SearchIcon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <Input
                    type="search"
                    placeholder="Search Spotify..."
                    className="w-full pl-10 pr-4 py-2 rounded-md bg-muted text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <Button variant="ghost" size="icon" className="text-primary">
                  <PauseIcon className="w-6 h-6" />
                </Button>
              </div>
              <div className="w-full flex justify-center">
                <img
                  src="/placeholder.svg"
                  alt="Album Cover"
                  width={200}
                  height={200}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="mt-4 text-center">
                <div className="text-2xl font-bold">Song Title</div>
                <div className="text-muted-foreground">Artist Name</div>
              </div>
            </Card>
            <Card className="bg-card rounded-lg p-6 flex flex-col items-center justify-center dark:bg-[#2a2a2a] dark:text-card-foreground">
              <div className="w-full flex justify-between items-center mb-4">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <VideoIcon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <Input
                    type="search"
                    placeholder="Join Google Meet..."
                    className="w-full pl-10 pr-4 py-2 rounded-md bg-muted text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <Button variant="ghost" size="icon" className="text-primary">
                  <VideoIcon className="w-6 h-6" />
                </Button>
              </div>
              <div className="w-full flex justify-center">
                <img
                  src="/placeholder.svg"
                  alt="Google Meet"
                  width={200}
                  height={200}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="mt-4 text-center">
                <div className="text-2xl font-bold">Google Meet</div>
                <div className="text-muted-foreground">Join a meeting</div>
              </div>
            </Card>
          </div>
        </div>
        <div className="bg-card rounded-lg p-6 flex flex-col dark:bg-[#2a2a2a] dark:text-card-foreground">
          <div className="text-right text-3xl font-bold mb-4 dark:text-card-foreground">
            {new Date().toLocaleTimeString()}
          </div>
          <div className="flex flex-col items-center justify-center bg-[#f5f5f5] rounded-lg border border-input p-6 dark:bg-[#2a2a2a] dark:text-card-foreground w-full h-full">
            <h2 className="text-2xl font-bold mb-4 dark:text-card-foreground">Announcement</h2>
            <p className="text-lg text-center dark:text-card-foreground">
              It will be a holiday on 26th August, to celebrate the birthday of THE GREAT Hrishit Pandey.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function PauseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="14" y="4" width="4" height="16" rx="1" />
      <rect x="6" y="4" width="4" height="16" rx="1" />
    </svg>
  )
}


function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function VideoIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  )
}


function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}