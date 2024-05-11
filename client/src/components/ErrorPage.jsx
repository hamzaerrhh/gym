const ErrorPage = () => {
  return (
    <div className=" fixed overflow-hidden h-screen">
  
      <img
        src="https://res.cloudinary.com/djq8hnmt9/image/upload/f_auto,q_auto/v1/public/ysdd1ypptspznhcpqihj"
        className="absolute h-full w-full object-cover"
      />
      
      <div className="inset-0 bg-black opacity-25 absolute">&nbsp; &nbsp; </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
        &nbsp; &nbsp; &nbsp; &nbsp;{" "}
        <div className="w-full font-mono flex flex-col items-center relative z-10">
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
          <h1 className="font-extrabold text-5xl text-center text-white leading-tight mt-4">
            &nbsp; You are all alone here &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
          </h1>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
          <p className="font-extrabold text-8xl my-44 text-white animate-bounce">
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 404 &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
          </p>
          &nbsp; &nbsp; &nbsp; &nbsp;{" "}
        </div>
        &nbsp; &nbsp;{" "}
      </div>
    </div>
  );
};
export default ErrorPage;
