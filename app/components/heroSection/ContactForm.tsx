import { MouseEvent, useEffect, useState } from "react";
import useProjectStore from "../stores/useProject";

// scoll percentage function
function getScrollPercentage() {
  // Total document height
  const documentHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );

  // Viewport height
  const viewportHeight = window.innerHeight;

  // Maximum scrollable height
  const scrollableHeight = documentHeight - viewportHeight;

  // Current scroll position
  const currentScroll = window.scrollY;

  // Scroll percentage
  const scrollPercentage = (currentScroll / scrollableHeight) * 100;

  return scrollPercentage;
}

// contact me
const ContactForm = () => {
  const [visible, setVisible] = useState(false);
  const [email, setemail] = useState("");
  const [name, setName] = useState("");
  const [msg, setmsg] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [aftermsg, setaftermsg] = useState("Message sent.");
  const [loading, setLoading] = useState(false);
  const delayed = useProjectStore((state) => state.visible);
  const isMobile = window.innerWidth >= 768;
  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSuccess(false);
    if (!name || !email || !msg) {
      setError(true);
      setaftermsg("Please input all details.");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch("/api/contact", {
        method: "post",
        body: JSON.stringify({ name, email, message: msg }),
      });

      if (!response.ok) {
        throw new Error(`response status: ${response.status}`);
      }
      const responseData = await response.json();

      setError(false);
      setSuccess(true);
      setaftermsg("Message sent.");
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(true);
      setaftermsg("Error, please try resubmitting the form.");
      setLoading(false);
    }

    setemail("");
    setName("");
    setmsg("");
    setLoading(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      let scrollP = getScrollPercentage();
      if (scrollP < (isMobile ? 79 : 92)) {
        setVisible(false);
      } else if (scrollP > (isMobile ? 79 : 92)) {
        setVisible(true);
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  if (!visible || delayed) {
    return <></>;
  }
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-sm min-w-[440px]">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Let's Connect
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          {" "}
          I’m excited to hear about your innovative projects, ideas, or any
          questions you might have. Drop me a message, and let’s start the
          conversation!
        </p>
        <form action="#" className="space-y-8">
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              id="subject"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 dark:shadow-sm-light"
              placeholder="Enter your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 dark:shadow-sm-light"
              placeholder="email@example.com"
              required
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Your message
            </label>
            <textarea
              id="message"
              rows={6}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
              placeholder="Leave a comment..."
              value={msg}
              onChange={(e) => setmsg(e.target.value)}
            ></textarea>
          </div>
          <div className="flex gap-2 ustify-center items-center">
            <button
              type="submit"
              className="inline-flex justify-center items-center  bg-violet-600 py-3 px-5 rounded-lg cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#7c3aed] before:to-[#6b21a8] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-lg hover:before:left-0 text-[#fff]"
              onClick={(e) => handleSubmit(e)}
            >
              {loading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-violet-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Send message"
              )}
            </button>
            {error && <div className="text-red-500">{aftermsg}</div>}
            {success && <div className="text-green-500">{aftermsg}</div>}
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
