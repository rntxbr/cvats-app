"use client";
import { Provider } from "react-redux";
import { store } from "lib/redux/store";
import { ResumeForm } from "components/ResumeForm";
import { Resume } from "components/Resume";
import { useEffect } from "react";
import { trackBuilderStarted } from "lib/gtag";

export default function Create() {
  // Rastreia quando o usuário acessa o construtor de currículos
  useEffect(() => {
    trackBuilderStarted();
  }, []);

  return (
    <Provider store={store}>
      <main className="relative h-full w-full overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
        <div className="grid grid-cols-3 md:grid-cols-6">
          <div className="col-span-3 border-r-4 border-black bg-white">
            <ResumeForm />
          </div>
          <div className="col-span-3">
            <Resume />
          </div>
        </div>
      </main>
    </Provider>
  );
}
