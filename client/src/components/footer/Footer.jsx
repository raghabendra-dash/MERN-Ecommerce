import logoMain from "../../assets/images/logo-main.png";

const Footer = () => (
  <footer className="m-2 rounded-lg bg-black shadow sm:m-4">
    <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
      <div className="flex flex-col items-center sm:flex-row sm:justify-between">
        <a
          href="./"
          className="mb-4 flex items-center space-x-3 rtl:space-x-reverse sm:mb-0"
        >
          <img src={logoMain} className="w-[200px]" alt="BuzzBuy Logo" />
        </a>
        <ul className="mb-6 flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:mb-0">
          <li>
            <a
              href="./user/dashboard/profile"
              className="me-4 hover:underline md:me-6"
            >
              My Profile
            </a>
          </li>
          <li>
            <a href="#" className="me-4 hover:underline md:me-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="me-4 hover:underline md:me-6">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
      <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
      <span className="block text-center text-sm text-gray-500 dark:text-gray-400">
        © 2023 - {new Date().getFullYear()}{" "}
        <a href="./" className="hover:underline">
          BuzzBuy
        </a>
        . <br />
        All Rights Reserved.
      </span>
    </div>
  </footer>
);

export default Footer;
