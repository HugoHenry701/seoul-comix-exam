'use client';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

import { STORE_CATEGORY, textByStoreCategory } from '@/app/_configs/categories';

export default function CategoryTabs({
  setCrrCategory,
}: {
  setCrrCategory: (category: string) => void;
}) {
  function makeEnum(enumObject: any) {
    var all = [];
    for (var key in enumObject) {
      all.push(enumObject[key]);
    }
    return all;
  }
  return (
    <div className="p-2 px-4 gap-2 border rounded-xl my-4 shadow-md flex flex-row">
      <div className=" w-full overflow-x-scroll no-scrollbar ">
        <TabGroup>
          <TabList className="flex gap-4">
            {makeEnum(STORE_CATEGORY).map((name, index) => (
              <Tab
                key={index}
                className="rounded-full h-full break-keep whitespace-nowrap text-nowrap py-1 px-3 text-sm/6 font-semibold text-black focus:outline-none data-[selected]:bg-black/10 data-[hover]:bg-black/5 data-[selected]:data-[hover]:bg-black/10 data-[focus]:outline-1 data-[focus]:outline-black"
                onClick={() => {
                  setCrrCategory(name);
                }}
              >
                {textByStoreCategory[name as keyof typeof STORE_CATEGORY]}
              </Tab>
            ))}
          </TabList>
        </TabGroup>
      </div>
    </div>
  );
}
