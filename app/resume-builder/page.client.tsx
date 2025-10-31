"use client";

import { Provider } from "react-redux";
import { store } from "@/app/lib/redux/store";
import { ResumeForm } from "@/components/ResumeForm";
import { Resume } from "@/components/Resume";

export default function ClientPage() {
  return (
    <Provider store={store}>
      <main className="bg-[#f1eee1] min-h-screen w-full flex justify-center items-center  overflow-hidden py-16 mt-10 ">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="w-full p-6">
            <ResumeForm />
          </div>
          <div className="w-full p-6">
            <Resume />
          </div>
        </div>
      </main>
    </Provider>
  );
}


