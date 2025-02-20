import { PanelRightClose, PanelRightOpen } from 'lucide-react';
import { useState } from 'react';

export default function ToggleSidebar() {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <div className="flex flex-row justify-between items-center w-full">
        <div className='flex flex-row justify-center items-center gap-4'>
          <label htmlFor="AcceptConditions" className='font-montserrat font-medium'>Toggle Sidebar</label>
          {toggle ? <PanelRightClose /> : < PanelRightOpen />}
        </div>
        <label
          htmlFor="AcceptConditions"
          className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-green-500"
        >
          <input
            type="checkbox"
            id="AcceptConditions"
            onChange={async () => {
              setToggle(!toggle);
              await browser.sidebarAction.toggle();
            }}
            className="peer sr-only [&:checked_+_span_svg[data-checked-icon]]:block [&:checked_+_span_svg[data-unchecked-icon]]:hidden"
          />

          <span
            className="absolute inset-y-0 start-0 z-10 m-1 inline-flex size-6 items-center justify-center rounded-full bg-white text-gray-400 transition-all peer-checked:start-6 peer-checked:text-green-600"
          >
            <svg
              data-checked-icon
              xmlns="http://www.w3.org/2000/svg"
              className="hidden size-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>

            <svg
              data-unchecked-icon
              xmlns="http://www.w3.org/2000/svg"
              className="size-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </label>
      </div>

    </>
  )
}
