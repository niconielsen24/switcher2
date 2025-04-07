const ICON_SIZE = 40;
const LINKEDIN_URL = "https://www.linkedin.com/in/nicolas-nielsen-4486aa171/";
const GITHUB_URL = "https://github.com/niconielsen24";
const MALDON_URL = "https://maldon.com.ar/blog/projects/el-switcher/";
const FREE_DNS_URL = "https://freedns.afraid.org/";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full border-t-2 border-slate-800">
      <div className="flex flex-row divide-x-2 divide-slate-800">
        {/* Contact Section */}
        <div className="flex flex-col w-1/3 p-4 space-y-4">
          <h2 className="text-slate-800 font-bold text-2xl">Contact Me</h2>
          <div className="flex space-x-4 items-center justify-center">
            {/* LinkedIn Icon */}
            <a href={LINKEDIN_URL} target="_blank" className="group">
              <svg
                viewBox="0 0 128 128"
                height={ICON_SIZE}
                width={ICON_SIZE}
                className="block group-hover:hidden transition-all"
              >
                <path d="M116 3H12a8.91 8.91 0 00-9 8.8v104.42a8.91 8.91 0 009 8.78h104a8.93 8.93 0 009-8.81V11.77A8.93 8.93 0 00116 3zM39.17 107H21.06V48.73h18.11zm-9-66.21a10.5 10.5 0 1110.49-10.5 10.5 10.5 0 01-10.54 10.48zM107 107H88.89V78.65c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15V107H50.53V48.73h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41C103.6 47.28 107 59.35 107 75z"></path>
              </svg>
              <svg
                viewBox="0 0 128 128"
                height={ICON_SIZE}
                width={ICON_SIZE}
                className="hidden group-hover:block transition-all"
              >
                <path
                  fill="#0076b2"
                  d="M116 3H12a8.91 8.91 0 00-9 8.8v104.42a8.91 8.91 0 009 8.78h104a8.93 8.93 0 009-8.81V11.77A8.93 8.93 0 00116 3z"
                ></path>
                <path
                  fill="#fff"
                  d="M21.06 48.73h18.11V107H21.06zm9.06-29a10.5 10.5 0 11-10.5 10.49 10.5 10.5 0 0110.5-10.49M50.53 48.73h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41C103.6 47.28 107 59.35 107 75v32H88.89V78.65c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15V107H50.53z"
                ></path>
              </svg>
            </a>
            {/* GitHub Icon */}
            <a href={GITHUB_URL} target="_blank">
              <svg
                viewBox="0 0 128 128"
                height={ICON_SIZE}
                width={ICON_SIZE}
                className="transition-transform hover:scale-105"
              >
                <g fill="#181616">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"
                  ></path>
                </g>
              </svg>
            </a>
          </div>
        </div>

        {/* Switcher Project */}
        <div className="flex flex-col w-1/3 p-6 space-y-2 items-center">
          <h2 className="text-slate-800 font-bold text-2xl text-center">
            Original Switcher !!
          </h2>
          <a
            href={MALDON_URL}
            target="_blank"
            className="text-black italic text-xl hover:underline"
          >
            Switcher by Maldón
          </a>
        </div>

        {/* Free DNS */}
        <div className="flex flex-col w-1/3 p-6 space-y-2 items-center">
          <h2 className="text-slate-800 font-bold text-2xl text-center">
            Free DNS org.
          </h2>
          <a
            href={FREE_DNS_URL}
            target="_blank"
            className="text-black italic text-xl hover:underline"
          >
            Free DNS
          </a>
        </div>
      </div>
    </footer>
  );
}
