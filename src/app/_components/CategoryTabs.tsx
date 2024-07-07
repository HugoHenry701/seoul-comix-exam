'use client';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

import { STORE_CATEGORY, textByStoreCategory } from '@/app/_configs/categories';

export default function CategoryTabs() {
  function makeEnum(enumObject: any) {
    var all = [];
    for (var key in enumObject) {
      all.push(enumObject[key]);
    }
    return all;
  }
  return (
    <div className=" w-full overflow-x-scroll no-scrollbar ">
      <TabGroup>
        <TabList className="flex gap-4">
          {makeEnum(STORE_CATEGORY).map((name, index) => (
            <Tab
              key={index}
              className="rounded-full h-full break-keep whitespace-nowrap text-nowrap py-1 px-3 text-sm/6 font-semibold text-black focus:outline-none data-[selected]:bg-black/10 data-[hover]:bg-black/5 data-[selected]:data-[hover]:bg-black/10 data-[focus]:outline-1 data-[focus]:outline-black"
            >
              {textByStoreCategory[name as keyof typeof STORE_CATEGORY]}
            </Tab>
          ))}
        </TabList>
        {/* <TabPanels className="mt-3">
          {categories.map(({ name, posts }) => (
            <TabPanel key={name} className="rounded-xl bg-white/5 p-3">
              <ul>
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="relative rounded-md p-3 text-sm/6 transition hover:bg-white/5"
                  >
                    <a href="#" className="font-semibold text-white">
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                    <ul className="flex gap-2 text-white/50" aria-hidden="true">
                      <li>{post.date}</li>
                      <li aria-hidden="true">&middot;</li>
                      <li>{post.commentCount} comments</li>
                      <li aria-hidden="true">&middot;</li>
                      <li>{post.shareCount} shares</li>
                    </ul>
                  </li>
                ))}
              </ul>
            </TabPanel>
          ))}
        </TabPanels> */}
      </TabGroup>
    </div>
  );
}
