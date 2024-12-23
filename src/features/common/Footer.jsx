
function Footer() {
  return (
    <>
      <div className=" bg-gray-900">
        <div className="max-w-2xl mx-auto text-white py-10">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-3"> Happy Shopping </h3>
            <p> Shop smart. Anytime, anywhere.</p>
            
          </div>
          <div className="mt-16 text-sm text-gray-400">
           
            <div className="order-1 md:order-2">
            <p className="order-2 md:order-1 mt-8 md:mt-0 text-center">
              {" "}
              Made by <a target="_blank" href="https://github.com/cakesandcarrots"className="font-bold cursor-pointer">Akash Naik</a>
            </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
