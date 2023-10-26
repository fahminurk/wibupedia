const Footer = () => {
  return (
    <div className="w-full text-xs bg-black text-white flex mt-2 justify-center p-3 flex-col border-t-2 border-white ">
      <div className="flex flex-wrap justify-center gap-2">
        <p> Designed and developed with ❤️ by</p>
        <a
          className="hover:underline text-rose-600"
          href="https://fahminurkamil.vercel.app/"
          target="_blank"
        >
          @fahminurk
        </a>
      </div>
      <div className="flex justify-center">
        <p>Powered by Jikan.moe</p>
      </div>
    </div>
  );
};

export default Footer;
