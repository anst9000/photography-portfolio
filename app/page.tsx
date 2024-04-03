"use client"

import { Tab } from "@headlessui/react"
import Link from "next/link"

const tabs = [
  {
    key: "all",
    display: "All",
  },
  {
    key: "oceans",
    display: "Oceans",
  },
  {
    key: "forests",
    display: "Forests",
  },
]

export default function Home() {
  return (
    <div className="flex flex-col h-full bg-[url('/photography-bg.jpg')] bg-top bg-cover">
      <header className="flex justify-between items-center h-20 px-6">
        <div className="text-center">Photography Portfolio</div>
        <Link
          href="#"
          className="rounded-3xl bg-white text-stone-700 px-3 py-2 hover:bg-opacity-90"
        >
          Get in touch
        </Link>
      </header>

      <main className="grow">
        <div className="flex flex-col items-center h-full">
          <Tab.Group>
            <Tab.List className="flex items-center gap-12">
              {tabs.map((tab) => (
                <Tab key={tab.key}>
                  {({ selected }) => (
                    <span
                      className={selected ? "text-white" : "text-stone-600"}
                    >
                      {tab.display}
                    </span>
                  )}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="h-full bg-stone-900 bg-opacity-80 max-w-[900px] w-full p-2 sm:p-4 my-6">
              <Tab.Panel className="">All Photos</Tab.Panel>
              <Tab.Panel>Oceans</Tab.Panel>
              <Tab.Panel>Forests</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </main>

      <footer className="h-12 flex justify-center items-center">
        <p>Photography Portfolio</p>
      </footer>
    </div>
  )
}
