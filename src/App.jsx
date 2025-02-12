import { AnimatedShinyTextDemo } from './components/AnimatedShinyTextDemo';
import DarkMode from './components/DarkMode';
import Help_Resources from './components/Help_Resources';
import { AuroraText } from './components/magicui/aurora-text';
import ToggleSidebar from './components/ToggleSidebar';
import { Separator } from './components/ui/separator';
import './index.css';

const App = () => {

  return (
    <>
      <div className='dark:bg-gray-900 bg-gray-100 flex flex-col justify-start items-start gap-8 py-3 px-5'>
        {/* headline */}
        <div className='flex flex-col justify-center items-center gap-3 w-full'>
          <div className='flex flex-row justify-center items-center gap-3 '>
            <img src="/icons/brain-bulb.svg" alt="" width={30} height={30} />
            <h1 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl font-montserrat text-center">
              LeetCode <AuroraText>Genius</AuroraText>
            </h1>
          </div>
          {/* description */}
          <AnimatedShinyTextDemo />
        </div>
        {/* <ModeToggleSwitch /> */}
        <DarkMode />
        <Separator />
        {/* <Toggle Sidebar /> */}
        <ToggleSidebar />
        <Separator />

        {/* help resources */}
        <Help_Resources />

      </div>
    </>
  );
}

export default App;
