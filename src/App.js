import "./App.css";
import Header from "./components/Header";
// import TranslateBox from "./component/TranslateBox";
import { useState, useEffect } from "react";

import { SlArrowDown } from "react-icons/sl";
import { BsArrowLeftRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { translateFetch } from "./redux/action/actionTranslate/actionTranslate";
import { languageFetch } from "./redux/action/actionLanguages/actionLanguages";
import { detectFetch } from "./redux/action/actionDetect/actionDetect";

const App = () => {
  const dispatch = useDispatch();
  const translation = useSelector(
    (state) => state.reducerTranslate.translation
  );
  const languages = useSelector((state) => state.reducerLanguages.languages);
  const detection = useSelector((state) => state.reducerDetect.detection);
  const detectionConvertName = languages.map((language) => {
    if (language.language === detection) {
      return language.name;
    }
  });
  const [textToTranslate, setTextToTranslate] = useState("");
  const [sourceLang, setSourceLang] = useState({
    language: "en",
    name: "English",
  });
  const [targetLang, setTargetLang] = useState({
    language: "id",
    name: "Indonesian",
  });
  const [sourceModalOpen, setSourceModalOpen] = useState(false);
  const [targetModalOpen, setTargetModalOpen] = useState(false);
  useEffect(() => {
    dispatch(languageFetch());
  }, []);

  useEffect(() => {
    dispatch(
      translateFetch({
        q: textToTranslate,
        source: sourceLang.language,
        target: targetLang.language,
      })
    );

    dispatch(
      detectFetch({
        q: textToTranslate,
      })
    );
  }, [textToTranslate, sourceLang, targetLang]);

  const revert = () => {
    setSourceLang({ ...targetLang });
    setTargetLang({ ...sourceLang });
  };

  return (
    <>
      <Header />
      <div className="flex sm:flex-row flex-col gap-4 sm:p-8 p-4">
        <div className="border border-[#F1BC19] rounded-lg sm:w-1/2 w-full p-1 bg-white">
          <div className="relative flex items-center justify-between border-b px-2 py-1">
            <span
              className="flex items-center justify-center gap-2 cursor-pointer hover:text-[#F1BC19] transition"
              onClick={() => setSourceModalOpen(!sourceModalOpen)}
            >
              {sourceLang.name}
              <SlArrowDown />
            </span>

            <BsArrowLeftRight
              className="cursor-pointer hover:text-[#F1BC19] transition"
              onClick={() => revert()}
            />

            <ul
              className={`${
                sourceModalOpen ? "grid" : "hidden"
              } absolute top-full left-0 w-full bg-white grid-cols-3 items-center z-10`}
            >
              {languages.map((language, index) => (
                <li
                  className="list-none px-2 py-1 cursor-pointer hover:text-[#F1BC19] text-xs"
                  key={index}
                  onClick={() => {
                    if (language.language === targetLang.language) {
                      revert();
                    }
                    setSourceLang(language);

                    setSourceModalOpen(false);
                  }}
                >
                  {language.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="px-2 py-1">
            {translation && sourceLang.language !== detection ? (
              <p className="text-xs">
                Translate from{" "}
                <button
                  type="button"
                  className="unset text-[#00f]"
                  onClick={() => {
                    if (detection === targetLang.language) {
                      revert();
                    }
                    setSourceLang({
                      language: detection,
                      name: detectionConvertName,
                    });
                  }}
                >
                  {detectionConvertName}
                </button>
                ?
              </p>
            ) : (
              <></>
            )}
            <textarea
              placeholder={"Type the text to translate"}
              className="bg-white resize-none w-full min-h-[200px] focus:outline-0 font-semibold text-xl placeholder:font-normal"
              disabled={false}
              value={textToTranslate}
              onChange={(e) => setTextToTranslate(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="border rounded-lg sm:w-1/2 w-full p-1 bg-white">
          <div className="relative flex items-center justify-between border-b px-2 py-1">
            <span
              className="flex items-center justify-center gap-2 cursor-pointer hover:text-[#F1BC19] transition"
              onClick={() => setTargetModalOpen(!targetModalOpen)}
            >
              {targetLang.name}
              <SlArrowDown />
            </span>
            <ul
              className={`${
                targetModalOpen ? "grid" : "hidden"
              } absolute top-full left-0 w-full bg-white grid-cols-3 items-center z-10`}
            >
              {languages.map((language, index) => (
                <li
                  className="list-none px-2 py-1 cursor-pointer hover:text-[#F1BC19] text-xs"
                  key={index}
                  onClick={() => {
                    if (language.language === sourceLang.language) {
                      revert();
                    }
                    setTargetLang(language);

                    setTargetModalOpen(false);
                  }}
                >
                  {language.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <textarea
              placeholder=""
              className="bg-white resize-none w-full min-h-[200px] focus:outline-0 px-2 py-1 font-semibold text-xl placeholder:font-normal"
              disabled={true}
              value={textToTranslate ? translation : ""}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
